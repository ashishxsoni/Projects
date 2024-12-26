// in event understand 
    
//run this on browser
const turn = document.querySelectorAll('.button');

const body = document.querySelector('body');

const change = turn.forEach(elm => {
    elm.addEventListener('click', (event) => {
        // Assign event.target to a variable named targetNode
        const curNode = event.target;
        console.log(`You clicked on: ${curNode.id}`); 
        // console.log(event); //check akre niche wale k sath me ise
        // console.log(event.target); // dono me diff samjhe pura lene ki jarurat nahi hai isse hi kam ho jayega
        body.style.backgroundColor=`${curNode.id}`;
        
    });
});