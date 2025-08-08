const screenText = document.querySelector(".cal-screen");
const numberRow = document.querySelector(".cal-buttons");

function isNumber(target) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return numbers.includes(target);
}

function addNumberToScreen(event) {
  const target = event.target;

  if (isNumber(target.textContent) && screenText.textContent == "0") {
    screenText.textContent = "";
    screenText.textContent += target.textContent;
  } else if (isNumber(target.textContent)) {
    screenText.textContent += target.textContent;
  }
}

numberRow.addEventListener("click", (event) => addNumberToScreen(event));
