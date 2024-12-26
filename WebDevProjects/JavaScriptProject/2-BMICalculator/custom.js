
const getBMICat = function(bmi) {
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    return category;
}

//kyunki jb user submit button dabyega to wo form submit pr event
// hota hai to uske liye click nhi hm yaha form event select krte hai 

const form = document.querySelector('form');
/* this usecase will give you empty
hm height ko phle hi lenge to yh page load hote hi isme store ho jayega 
kyunki yhi default behaviour hai javascriot ka global me declare hai isiliye
 */

// const height = parseInt(document.querySelector('#height').value)

form.addEventListener('submit', function (e) {
    /* ab yaha hmne submit event liya hai pr ek chij ki jb bhi form submit hota h to 
    wo server or yaha na khi jake submit hota hai filhal abhi ham aisa nhi kar 
    rhe hai to uske liye ham yaha par iske default behaviout ko rok rhe hai 
 */
  e.preventDefault();

  //jba hme yh .value karnege ti hme yh yaha par yh stirng m milgi to uske hmne int me 
//   parse kar lia hai 

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const results = document.querySelector('#results');

  if (height === '' || height < 0 || isNaN(height)) {
    results.innerHTML = `Please give a valid height ${height}`;
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    results.innerHTML = `Please give a valid weight ${weight}`;
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    const bmicat= getBMICat(bmi);
    //show the result
    results.innerHTML = `<span>${bmi}</span><br><span>${bmicat}</span>`;
  }
});



console.log(getBMI(67 ,168));
console.log(getBMICat(getBMI(67 ,168)));
