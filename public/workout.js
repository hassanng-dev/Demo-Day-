 
let exercises = document.querySelectorAll('button')
exercises.forEach(exercises => exercises.addEventListener('click', getWorkout))


 const workouts = {
  method: 'GET',
  headers: {
    'X-API-Key': 'lfkaU7sWaSL6HEilNe7D2A==4U0LwT5YEK6ThsmI',
    
  }
};
function getWorkout() {
 
    let getWorkout = this.innerHTML
    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${getWorkout}`, workouts)
    
    .then(response => response.json())
	  .then(res => {
   
    console.log(res)
    
    
      document.querySelector('.sectionOneName').innerText = res[0].name
      document.querySelector('.sectionOneMuscle').innerText = res[0].muscle
      document.querySelector('.sectionOneDifficulty').innerText = res[0].dfficulty
      document.querySelector('.sectionOneInstructions').innerText = res[0].instructions

      document.querySelector('.sectionTwoName').innerText = res[1].name
      document.querySelector('.sectionTwoMuscle').innerText =res[1].muscle
      document.querySelector('.sectionTwoDifficulty').innerText = res[1].difficulty
      document.querySelector('.sectionTwoInstructions').innerText = res[1].instructions

      document.querySelector('.sectionThreeName').innerText = res[2].name
      document.querySelector('.sectionThreeMuscle').innerText =res[2].muscle
      document.querySelector('.sectionThreeDifficulty').innerText = res[2].difficulty
      document.querySelector('.sectionThreeInstructions').innerText = res[2].instructions

      document.querySelector('.sectionFourName').innerText = res[3].name
      document.querySelector('.sectionFourMuscle').innerText =res[3].muscle
      document.querySelector('.sectionFourDifficulty').innerText = res[3].difficulty
      document.querySelector('.sectionFourInstructions').innerText = res[4].instructions

      document.querySelector('.sectionFiveName').innerText = res[4].name
      document.querySelector('.sectionFiveMuscle').innerText =res[4].muscle
      document.querySelector('.sectionFiveDifficulty').innerText = res[4].difficulty
      document.querySelector('.sectionFiveInstructions').innerText = res[4].instructions

      document.querySelector('.sectionSixName').innerText = res[5].name
      document.querySelector('.sectionSixMuscle').innerText =res[5].muscle
      document.querySelector('.sectionSixDifficulty').innerText = res[5].difficulty
      document.querySelector('.sectionSixInstructions').innerText = res[5].instructions
  })
  .catch(err => console.error(err));
    
}