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

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        let num = button.value;
        let check = resultText.textContent;
        check.length >= 12 ? resultText.textContent : resultText.textContent == "0" ? resultText.textContent = num : resultText.textContent += num;
    })
});

operateButtons.forEach(button => {
    button.addEventListener("click", () => {
        operator = button.value;
        operator == 'power' ? operatorSign = "**" : operatorSign = button.textContent;
        previousResultText.textContent = `${resultText.textContent} ${operatorSign}`;
        upperNumber = resultText.textContent;
        resultText.textContent = "0";
    })
});

equalsButton.addEventListener("click", () => {
    let temporaryResult = resultText.textContent;
    if (operator == "divide" && resultText.textContent == "0") {
        previousResultText.textContent = "Divide by 0?"
        resultText.textContent = "Ohh buddy...";

    } else {
        resultText.textContent = operate(operator, Number(upperNumber), Number(resultText.textContent));
        previousResultText.textContent = `${previousResultText.textContent} ${temporaryResult}`;
    }
})

clearButton.addEventListener("click", () => {
    resultText.textContent == "0" ? resultText.textContent = "0" : resultText.textContent;
    resultText.textContent = resultText.textContent.slice(0, -1);
})

clearAllButton.addEventListener("click", () => {
    resultText.textContent = "0";
    previousResultText.textContent = '';
})

plusMinusButton.addEventListener("click", () => {
    resultText.textContent > 0 ? resultText.textContent = `-${resultText.textContent}` : resultText.textContent == "0" ? resultText.textContent = "0" : resultText.textContent = resultText.textContent.slice(1);
})

dotButton.addEventListener("click", () => {
    let check = resultText.textContent.toString();
    check.includes(".") ? resultText.textContent : resultText.textContent += ".";
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
    return check.length >= 12 ? num.toExponential(6) : num;
}