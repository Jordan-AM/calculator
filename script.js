const screen = document.querySelector(".cal-screen");
const numberRow = document.querySelector(".cal-buttons");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

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
  return b === 0 ? "A number cannot be divided by 0." : a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") return add(a, b);
  if (operator === "−") return subtract(a, b);
  if (operator === "×") return multiply(a, b);
  if (operator === "÷") return divide(a, b);

  return null;
}

function roundResult(number) {
  if (typeof number === "string") return number; // for divide by 0
  return Math.round(number * 1000) / 1000;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;

  const parts = screen.textContent.split(currentOperator);
  secondNumber = parts[1] || "";

  const result = operate(currentOperator, firstNumber, secondNumber);
  screen.textContent = roundResult(result);
  firstNumber = screen.textContent;
  currentOperator = null;
  shouldResetScreen = true;
}

function clearCalculator() {
  screen.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetScreen = false;
}

function deleteLast() {
  screen.textContent = screen.textContent.slice(0, -1) || "0";
}

function appendDecimal() {
  if (shouldResetScreen) {
    screen.textContent = "0";
    shouldResetScreen = false;
  }
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

function handleButtonPress(event) {
  const buttonPressed = event.target.textContent;

  //number input
  if (isNumber(buttonPressed)) {
    if (screen.textContent === "0" || shouldResetScreen) {
      screen.textContent = buttonPressed;
      shouldResetScreen = false;
    } else {
      screen.textContent += buttonPressed;
    }

    // update secondNumber if operator is active
    if (currentOperator !== null) {
      const parts = screen.textContent.split(currentOperator);
      secondNumber = parts[1] || "";
    }

    return;
  }

  // operator input
  if (isOperator(buttonPressed)) {
    const lastChar = screen.textContent.slice(-1);

    // replace operator if pressed twice
    if (isOperator(lastChar)) {
      screen.textContent = screen.textContent.slice(0, -1) + buttonPressed;
      currentOperator = buttonPressed;
      return;
    }

    // evaluate if there's a complete expression
    if (currentOperator !== null) {
      const parts = screen.textContent.split(currentOperator);
      secondNumber = parts[1] || "";

      if (secondNumber !== "") {
        evaluate();
      }
    }

    firstNumber = screen.textContent;
    currentOperator = buttonPressed;
    screen.textContent = firstNumber + currentOperator;
    shouldResetScreen = false;
    return;
  }

  if (buttonPressed === "=") {
    evaluate();
    return;
  }

  if (buttonPressed === "C") {
    clearCalculator();
    return;
  }

  if (buttonPressed === "←") {
    deleteLast();
    return;
  }

  if (buttonPressed === ".") {
    appendDecimal();
    return;
  }
}


numberRow.addEventListener("click", (event) => handleButtonPress(event));

document.addEventListener("keydown", (e) => {
  const keyMap = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
    Enter: "=",
    Backspace: "←",
    Escape: "C",
    ".": ".",
  };

  const mappedKey = keyMap[e.key] || e.key;

  if (
    isNumber(mappedKey) ||
    isOperator(mappedKey) ||
    ["=", "←", "C", "."].includes(mappedKey)
  ) {
    handleButtonPress({ target: { textContent: mappedKey } });
  }
});
