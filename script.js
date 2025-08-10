const screenText = document.querySelector(".cal-screen");
const numberRow = document.querySelector(".cal-buttons");

function isNumber(target) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return numbers.includes(target);
}

function handleButtonPress(event) {
  const target = event.target;
  // Add numbers to the screen
  if (isNumber(target.textContent) && screenText.textContent == "0") {
    screenText.textContent = "";
    screenText.textContent += target.textContent;
  } else if (isNumber(target.textContent)) {
    screenText.textContent += target.textContent;
  }
  // Clears the screen
  if (target.textContent === "C") {
    screenText.textContent = "0";
  }
  // Handles backspace
  if (target.textContent === "←" && screenText.textContent.length == 1) {
    screenText.textContent = "0";
  }
  if (target.textContent === "←" && screenText.textContent.length > 1) {
    screenText.textContent = screenText.textContent.slice(
      0,
      screenText.textContent.length - 1
    );
  }
}

numberRow.addEventListener("click", (event) => handleButtonPress(event));
