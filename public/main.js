
var trash = document.getElementsByClassName("fa-trash-o");
var deleteMacro = document.getElementsByClassName("deleteButton");
var saveMacro = document.getElementsByClassName("saveButton");
var check = document.getElementsByClassName("fa-heart");


let totalCalories = 0
let mealName = " "
let totalProtein = 0
let totalCarbs = 0
let totalFats = 0
let counter = 0

//meal tracker begins


Array.from(check).forEach(function(element) {
  
  element.addEventListener('click', function(){
    
    const day = this.parentNode.parentNode.childNodes[1].innerText
    const meal = this.parentNode.parentNode.childNodes[3].innerText
    const name = this.parentNode.parentNode.childNodes[5].innerText
    const calories = this.parentNode.parentNode.childNodes[7].innerText
    const protein = this.parentNode.parentNode.childNodes[9].innerText
    const carbs = this.parentNode.parentNode.childNodes[11].innerText
    const fats = this.parentNode.parentNode.childNodes[13].innerText
    const option = this.parentNode.parentNode.childNodes[15].innerText
    const checkIcon = this.dataset.checkbox === 'true'
    fetch('check', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'day': day,
        'meal': meal,
        'name': name,
        'calories': calories,
        'protein': protein,
        'carbs': carbs,
        'fats': fats,
        'option': option,
        'check' : checkIcon

      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


Array.from(trash).forEach(function(element) {
     
      element.addEventListener('click', function(){
        
        
        const day = this.parentNode.parentNode.childNodes[1].innerText
        const meal = this.parentNode.parentNode.childNodes[3].innerText
        const name = this.parentNode.parentNode.childNodes[5].innerText
        const calories = this.parentNode.parentNode.childNodes[7].innerText
        const protein = this.parentNode.parentNode.childNodes[9].innerText
        const carbs = this.parentNode.parentNode.childNodes[11].innerText
        const fats = this.parentNode.parentNode.childNodes[13].innerText
        const option = this.parentNode.parentNode.childNodes[15].innerText
        
        fetch('info', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'day': day,
            'meal': meal,
            'name': name,
            'calories': calories,
            'protein': protein,
            'carbs': carbs,
            'fats': fats,
            'option': option
            
          })
          
        }).then(function (response) {
          window.location.reload()
        })
      });
});



//This is where estimated calories begin 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0a3efde1b6mshc7be58f23825b4ap190b79jsn44401af5791b',
		'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
	}
};
function getInfo(){
  const foodSearch = document.querySelector('.apiInfo').value
  fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${foodSearch}`, options)
	.then(response => response.json())
	.then(res => {
    
    document.querySelector('.apiCalories').innerText = res.items[0].calories
    document.querySelector('.apiProtein').innerText = res.items[0].protein_g
    document.querySelector('.apiCarbs').innerText = res.items[0].carbohydrates_total_g
    document.querySelector('.apiFats').innerText = res.items[0].fat_total_g
    counter += 1
  })
  .catch(err => console.error(err));
}


function displayMacros () {
  let name = ""
  let cal = 0
  let proteinApi = 0
  let carbsApi = 0
  let fatsApi = 0
  

  if (counter === 1) {
   name = document.querySelector('.apiInfo').value
   apiCalories = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[3].innerText;
   proteinApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[7].innerText;
   carbsApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[11].innerText;
   fatsApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[15].innerText;
  } else {
     name = mealName
     apiCalories = totalCalories;
     proteinApi = totalProtein;
     carbsApi = totalCarbs;
     fatsApi = totalFats;
  }
  //sending data to DB
  fetch('apiInfo', {
    method:"post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      calories: apiCalories,
      protein: proteinApi,
      carbs: carbsApi,
      fats: fatsApi,
    })
     
  })
  .then(function (response) {
    window.location.reload()
  })
  

}
//Function for making a meal 
function createMeal () {
  
  const name = document.querySelector('.apiInfo').value
  let cal = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[3].innerText;
  const proteinApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[7].innerText;
  const carbsApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[11].innerText;
  const fatsApi = this.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[15].innerText;

  
  mealName +=  `${name} `
  totalCalories += parseInt(cal)
  totalProtein += parseInt(proteinApi)
  totalCarbs += parseInt(carbsApi)
  totalFats += parseInt(fatsApi)
 }

 Array.from(deleteMacro).forEach(function(element) {
     
  element.addEventListener('click', function(){
  
    
    const name = document.querySelector('.macroName').innerHTML
    const cal = document.querySelector('.macroCalories').innerHTML.split(' ')[0]
    const proteinApi = document.querySelector('.macroProtein').innerHTML.split(' ')[0]
    const carbsApi = document.querySelector('.macroGrams').innerHTML.split(' ')[0]
    const fatsApi = document.querySelector('.macroFats').innerHTML.split(' ')[0]
    
    fetch('mealplan', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        calories: cal,
        protein: proteinApi,
        carbs: carbsApi,
        fats: fatsApi,
        
      })
      
    }).then(function (response) {
      window.location.reload()
    })
  });
});

 
//Workout function begins
 
 let exercises = document.querySelectorAll('button')
 exercises.forEach(exercises => exercises.addEventListener('click', getWorkout))
 
 
  const workouts = {
   method: 'GET',
   headers: {
     'X-API-Key': 'lfkaU7sWaSL6HEilNe7D2A==4U0LwT5YEK6ThsmI',
     
   }
 };
 function getWorkout() {
    let hash = {
      "Lower Back" :"lower_back",
      "Abdominals" : "abdominals",
      "Biceps": "biceps",
      "Glutes": "glutes",
      "Chest": "chest",
      "Traps": "traps"
    }
     let getWorkout = hash[this.innerHTML]
     fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${getWorkout}`, workouts)
     
     .then(response => response.json())
     .then(res => {
    
     console.log(res)
     
     
       document.querySelector('.sectionOneName').innerText = res[0].name
       document.querySelector('.sectionOneDifficulty').innerText = res[0].dfficulty
       document.querySelector('.sectionOneInstructions').innerText = res[0].instructions
 
       document.querySelector('.sectionTwoName').innerText = res[1].name
       document.querySelector('.sectionTwoDifficulty').innerText = res[1].difficulty
       document.querySelector('.sectionTwoInstructions').innerText = res[1].instructions
 
       document.querySelector('.sectionThreeName').innerText = res[2].name
       document.querySelector('.sectionThreeDifficulty').innerText = res[2].difficulty
       document.querySelector('.sectionThreeInstructions').innerText = res[2].instructions
 
       document.querySelector('.sectionFourName').innerText = res[3].name
       document.querySelector('.sectionFourDifficulty').innerText = res[3].difficulty
       document.querySelector('.sectionFourInstructions').innerText = res[4].instructions
 
       document.querySelector('.sectionFiveName').innerText = res[4].name
       document.querySelector('.sectionFiveDifficulty').innerText = res[4].difficulty
       document.querySelector('.sectionFiveInstructions').innerText = res[4].instructions
 
       document.querySelector('.sectionSixName').innerText = res[5].name
       document.querySelector('.sectionSixDifficulty').innerText = res[5].difficulty
       document.querySelector('.sectionSixInstructions').innerText = res[5].instructions
   })
   .catch(err => console.error(err));
     
 }

document.querySelector('.getInfo').addEventListener('click', getInfo);
document.querySelector('.displayAPI').addEventListener('click', displayMacros);
document.querySelector('.createMeal').addEventListener('click', createMeal);