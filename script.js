const errorCode = "error ＞︿＜";
let currInput = null;
let storedInput = null;
let storedOutput = null;
let OPERATION = null;
let displayingLastResult = false; // whether just finished a calculation or not

const storedDisplay = document.querySelector('#storedExpression');
const currDisplay = document.querySelector('#currExpression');
const numberButtons = document.querySelectorAll('.number-btn');
const functionButtons = document.querySelectorAll('.function-btn');
const clearButton = document.querySelector('#clear-btn');
const equalButton = document.querySelector('#equal-btn');
const deleteButton = document.querySelector('#delete-btn');
const colorCards = document.querySelectorAll(".card");
const background = document.querySelector('body')

const colorChange = function (e) {
    background.style.background = "";
    // alert(e.target.id);
    switch (e.target.id) {
        case 'blue-red-color':
            background.style.background = "linear-gradient(to top, #fcddd0 0%, #ace0f9 100%)";
            break;
        case 'warm-color':
            background.style.background = "linear-gradient(to right, #ffeca6 0%, #fcb69f 100%)";
            break;
        case 'pink-color':
            background.style.background = "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
            break;
    }
}
const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

const operate = function (operation, a, b) {
    let ans = 0;
    switch (operation) {
        case 'add':
            ans = add(a, b);
            break;
        case 'subtract':
            ans = subtract(a, b);
            break;
        case 'multiply':
            ans = multiply(a, b);
            break;
        case 'divide':
            if (!Number(b)) {
                errorMessage();
                return errorCode;
            }
            ans = divide(a, b);
            break;
    }
    return Math.round(ans * 10) / 10;
}
function errorMessage() {
    storedOutput = null;
    storedInput = null;
    currInput = errorCode;
    OPERATION = null;
    displayingLastResult = true;
    updateDisplay();
}
function updateDisplay() {
    storedDisplay.textContent = storedOutput;
    currDisplay.textContent = currInput;
}

function logNumber(e) {
    if (displayingLastResult == true) {
        currInput = null;
        displayingLastResult = false;
    }
    currInput ? currInput += e.target.textContent : currInput = e.target.textContent;
    updateDisplay();
}

function logFunction(e) {
    if (!OPERATION && currInput && currInput != errorCode) {
        OPERATION = e.target.id;
        storedInput = Number(currInput);
        storedOutput = `${currInput} ${e.target.textContent}`;
        currInput = null;
        updateDisplay();
    }
    else if (currInput && currInput != errorCode) {
        let ans = operate(OPERATION, storedInput, currInput);
        if (ans == errorCode) return;
        OPERATION = e.target.id;
        storedInput = Number(ans);
        storedOutput = `${ans} ${e.target.textContent}`;
        currInput = null;
        updateDisplay();
    }
}

function solve() {
    if (OPERATION && storedInput && currInput) {
        let ans = operate(OPERATION, storedInput, currInput);
        if (ans == errorCode) return;
        storedInput = null;
        storedOutput = null;
        OPERATION = null;
        currInput = ans;
        displayingLastResult = true;
        updateDisplay();
    }
}

function clear() {
    storedInput = null;
    storedOutput = null;
    currInput = null;
    OPERATION = null;
    displayingLastResult = false;
    updateDisplay();
}

colorCards.forEach(card => card.addEventListener('click', colorChange));

numberButtons.forEach(btn => btn.addEventListener('click', logNumber));
functionButtons.forEach(btn => btn.addEventListener('click', logFunction));
equalButton.addEventListener('click', solve);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', () => {
    if (!displayingLastResult && currInput) {
        currInput = String(currInput).substring(0, currInput.length - 1);
        updateDisplay();
    }
});

