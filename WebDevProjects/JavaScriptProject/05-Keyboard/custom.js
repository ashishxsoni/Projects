
const insert = document.querySelector("#insert");
let start = true;
const body = document.querySelector('body');
// window.addEventListener("keydown", (event) => { //we can use this also
  // document.addEventListener("keydown", (event) => { //we can use this also
  body.addEventListener("keydown", (event) => {
  const keyName = event.key === " " ? "Space" : event.key;
  const keyCode = event.keyCode;
  const code = event.code;

  // Create the table only once
  if (start) {
    insert.innerHTML += `
      <table class='keyboard'>
        <thead>
          <tr>
            <th>Key</th>
            <th>Key Code</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
    start = false;
  }

  // Get the table body
  const tbody = document.querySelector('.keyboard tbody');
  
  // Create a new row
  const newElm = createElement(keyName, keyCode, code);
  tbody.appendChild(newElm);
});

function createElement(keyName, keyCode, code) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${keyName}</td>
    <td>${keyCode}</td>
    <td>${code}</td>
  `;
  return newRow;
}