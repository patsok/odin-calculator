let allButtons = document.querySelectorAll("button");
let numberButtons = document.querySelectorAll(".number");
let operateButtons = document.querySelectorAll(".operate");
let resultText = document.querySelector(".result");
let previousResultText = document.querySelector(".previousResult");
let equalsButton = document.querySelector(".equals");
let clearButton = document.querySelector(".clear");
let clearAllButton = document.querySelector(".clearAll");
let plusMinusButton = document.querySelector(".plusMinus");
let dotButton = document.querySelector(".dot");

let operator = '';
let operatorSign = '';
let upperNumber = '';
let equal = '';
let repeatNumber = '';
let repeatOperation = '';

function inputNumber(button) {
    let num = button.value;
    let check = resultText.textContent;
    check.length >= 12 ? resultText.textContent : resultText.textContent == "0" ? resultText.textContent = num : resultText.textContent += num;
    repeatOperation = 0;
}

function inputOperation(button) {
    repeatOperation++
    if (repeatOperation == 1) {
        operator = button.value;
        operator == 'power' ? operatorSign = "^" : operatorSign = button.textContent;
        previousResultText.textContent = `${resultText.textContent} ${operatorSign}`;
        upperNumber = resultText.textContent;
        resultText.textContent = "0";
        equal = 0;
    }
}

function inputEquals() {
    equal++;
    let temporaryResult = resultText.textContent;
    equal == 1 ? repeatNumber = resultText.textContent : '';
    if (operator == "divide" && resultText.textContent == "0") {
        previousResultText.textContent = "Divide by 0?"
        resultText.textContent = "Ohh buddy...";
        allButtons.forEach(button => { button.value != "AC" ? button.disabled = true : '' })
    } else {
        if (equal > 1) {
            upperNumber = repeatNumber;
            previousResultText.textContent = '';
        } {
            ''
        };
        if (equal > 1) {
            resultText.textContent = operate(operator, Number(resultText.textContent), Number(upperNumber));
            previousResultText.textContent = `${temporaryResult} ${operatorSign} ${upperNumber} =`;
        } else {
            resultText.textContent = operate(operator, Number(upperNumber), Number(resultText.textContent));
            previousResultText.textContent = `${previousResultText.textContent} ${temporaryResult} =`;
        }
    }
}

function inputDot() {
    let check = resultText.textContent.toString();
    check.includes(".") ? resultText.textContent : resultText.textContent += ".";
}

function inputClearAll() {
    resultText.textContent = "0";
    previousResultText.textContent = '';
    allButtons.forEach(button => button.disabled = false);
}

function inputClear() {
    resultText.textContent == "0" ? resultText.textContent = "0" : resultText.textContent;
    resultText.textContent = resultText.textContent.slice(0, -1);
}

document.addEventListener('keydown', (key) => {
    allButtons.forEach(button => {
        if (key.key == button.value && button.className == "number") {
            inputNumber(button);
        } else if ((key.key == button.textContent || key.key == button.id) && button.className == "operate") {
            inputOperation(button);
        } else if (key.key == button.id || (key.key == 'Enter' && button.id == '=')) {
            inputEquals();
        } else if (key.key == button.value && button.value == ".") {
            inputDot();
        } else if (key.key == "c" && button.value == "AC") {
            inputClearAll();
        } else if (key.key == "Backspace" && button.value == "C") {
            inputClear();
        }
    })
})

numberButtons.forEach(button => {
    button.addEventListener("click", () => inputNumber(button))
});

operateButtons.forEach(button => {
    button.addEventListener("click", () => inputOperation(button))
});

equalsButton.addEventListener("click", inputEquals);

clearButton.addEventListener("click", inputClear)

clearAllButton.addEventListener("click", inputClearAll)

dotButton.addEventListener("click", inputDot)

plusMinusButton.addEventListener("click", () => {
    resultText.textContent > 0 ? resultText.textContent = `-${resultText.textContent}` : resultText.textContent == "0" ? resultText.textContent = "0" : resultText.textContent = resultText.textContent.slice(1);
})

function operate(operator, numFirst, numSecond) {
    let res = 0;
    if (operator == "add") {
        res = numFirst + numSecond;
    } else if (operator == "subtract") {
        res = numFirst - numSecond;
    } else if (operator == "multiply") {
        res = numFirst * numSecond;
    } else if (operator == "divide") {
        res = numFirst / numSecond;
    } else {
        res = numFirst ** numSecond;
    }
    return checkNum(res);

}

function checkNum(num) {
    let check = num.toString();
    if (check.includes(".") && check.length >= 12) {
        let [a, b] = check.split(".");
        let count = 10 - a.length;
        let decimal = b.slice(0, count);
        check = `${a}.${decimal}`;
        num = Number(`${a}.${decimal}`);
    }
    return check.length > 12 ? num.toExponential(6) : num;
}