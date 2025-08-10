const screen = document.querySelector(".cal-screen");
const numberRow = document.querySelector(".cal-buttons");

function isNumber(buttonPressed) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return numbers.includes(buttonPressed);
}

function isOperator(buttonPressed) {
  const operators = ["+", "−", "×", "÷"];
  return operators.includes(buttonPressed);
}

function convertSymbols(expression) {
  return expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  b === 0 ? "A number cannot be divided by 0." : a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
}

function handleButtonPress(event) {
  const buttonPressed = event.target.textContent;

  // Add numbers to the screen
  if (isNumber(buttonPressed) && screen.textContent === "0") {
    screen.textContent = "";
    screen.textContent += buttonPressed;
  } else if (isNumber(buttonPressed)) {
    screen.textContent += buttonPressed;
  }
  // Clears the screen
  if (buttonPressed === "C") {
    screen.textContent = "0";
  }
  // Handles backspace
  if (buttonPressed === "←" && screen.textContent.length === 1) {
    screen.textContent = "0";
  }
  if (buttonPressed === "←" && screen.textContent.length > 1) {
    screen.textContent = screen.textContent.slice(
      0,
      screen.textContent.length - 1
    );
  }
  // Add operators
  if (isOperator(buttonPressed) && screen.textContent !== "0") {
    const lastChar = screen.textContent.slice(-1);
    if (!isOperator(lastChar)) {
      screen.textContent += buttonPressed;
    }
  }
}

numberRow.addEventListener("click", (event) => handleButtonPress(event));
