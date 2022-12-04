// var trash = document.getElementsByClassName("fa-trash-o");
// var check = document.getElementsByClassName("fa-heart");






// Array.from(trash).forEach(function(element) {
     
//   element.addEventListener('click', function(){
    
//     console.log("clicked")
//     const day = this.parentNode.parentNode.childNodes[1].innerText
//     const meal = this.parentNode.parentNode.childNodes[3].innerText
//     const name = this.parentNode.parentNode.childNodes[5].innerText
//     const calories = this.parentNode.parentNode.childNodes[7].innerText
//     const protein = this.parentNode.parentNode.childNodes[9].innerText
//     const carbs = this.parentNode.parentNode.childNodes[11].innerText
//     const fats = this.parentNode.parentNode.childNodes[13].innerText
//     const option = this.parentNode.parentNode.childNodes[15].innerText
    
//     fetch('info', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'day': day,
//         'meal': meal,
//         'name': name,
//         'calories': calories,
//         'protein': protein,
//         'carbs': carbs,
//         'fats': fats,
//         'option': option
        
//       })
      
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });



// Array.from(check).forEach(function(element) {
//   element.addEventListener('click', function(){
//     console.log("clicked")
//     const day = this.parentNode.parentNode.childNodes[1].innerText
//     const meal = this.parentNode.parentNode.childNodes[3].innerText
//     const name = this.parentNode.parentNode.childNodes[5].innerText
//     const calories = this.parentNode.parentNode.childNodes[7].innerText
//     const protein = this.parentNode.parentNode.childNodes[9].innerText
//     const carbs = this.parentNode.parentNode.childNodes[11].innerText
//     const fats = this.parentNode.parentNode.childNodes[13].innerText
//     const option = this.parentNode.parentNode.childNodes[15].innerText
//     const checkIcon = this.dataset.checkbox === 'true'
//     fetch('check', {
//       method: 'put',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'day': day,
//         'meal': meal,
//         'name': name,
//         'calories': calories,
//         'protein': protein,
//         'carbs': carbs,
//         'fats': fats,
//         'option': option,
//         'check' : checkIcon

//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });