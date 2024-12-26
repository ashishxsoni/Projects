 function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); // Random red (0-255)
    const g = Math.floor(Math.random() * 256); // Random green (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue (0-255)
    return `rgb(${r}, ${g}, ${b})`;
  }

  function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256); // Random red (0-255)
    const g = Math.floor(Math.random() * 256); // Random green (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue (0-255)
    const a = (Math.random()).toFixed(2); // Random alpha (opacity) between 0 and 1
    
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getRandomHexColour() {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  
  const start = document.querySelector('#start');
  const stop = document.querySelector('#stop');
  const body = document.querySelector('body');
  const heading = document.querySelector('h1');
  let intervalId;  // Declare the variable to store interval ID
  
  start.addEventListener('click', (e) => {
    // Start changing background color every second when the 'start' button is pressed
    if (!intervalId) {  // Prevent multiple intervals from being created
        //or
    // if (intervalId==null) {  // Prevent multiple intervals from being created
      intervalId = setInterval(() => {
        // body.style.backgroundColor = getRandomRGB();
        // body.style.backgroundColor = getRandomHexColour();
        body.style.backgroundColor = getRandomRGBA();
        heading.style.color=getRandomRGB();
      }, 1000);
    }
  });
  
  stop.addEventListener('click', (e) => {
    // Stop the interval when the 'stop' button is pressed
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;  // Reset the intervalId to null after stopping
      //  otherwise thiss will not stop if we dont use this 
    }
  });
  