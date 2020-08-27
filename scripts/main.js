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
    if(b){
        return a / b
    } else {
        return 'REALLY?';
    }
}

function operate(a, b, operator) {
    let res = 0;
    switch(operator){
        case '+': res = add(a, b); break;
        case '-': res = subtract(a, b); break;
        case '*': res = multiply(a, b); break;
        case '/': res = divide(a, b); break;
    }
    return res == Math.floor(res) ? res : (res).toFixed(2);;
}

const display = document.querySelector('#display');
const keys = Array.from(document.querySelectorAll('button'));
const decimal = document.querySelector('#decimal');

let firstOperand = NaN;
let secondOperand = NaN;
let operator = "";
display.textContent = "";

keys.forEach((key) => {
    key.addEventListener('click', () => {
        if(key.textContent == 'C'){
            display.textContent = "";
            decimal.disabled = false;
            firstOperand = NaN;
            secondOperand = NaN;
            operator = "";
        } else if(key.classList.contains('operators')){
            if(Object.is(secondOperand, NaN) && operator == ""){
                if(display.textContent !== ""){
                    firstOperand = +display.textContent;
                    operator = key.textContent;
                    display.textContent += ` ${key.textContent} `;
                    decimal.disabled = false;
                }
            } else if(!Object.is(firstOperand, NaN) && operator != "" && !display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length) == 0){
                secondOperand = +display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length);
                const result = operate(firstOperand, secondOperand, operator);
                firstOperand = result;
                operator = key.textContent;
                secondOperand = NaN;
                display.textContent = result + ` ${operator} `;
                decimal.disabled = false;
            } else if(!Object.is(firstOperand, NaN)){
                operator = key.textContent;
                display.textContent = `${firstOperand} ${operator} `;
            }
        } else if(key.textContent == '='){
            if(!Object.is(firstOperand, NaN) && operator != "" && !display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length) == 0){
                secondOperand = +display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length);
                const result = operate(firstOperand, secondOperand, operator);
                display.textContent = result
                firstOperand = result;
                operator = "";
                secondOperand = NaN;
                if(firstOperand != Math.floor(firstOperand)){
                    decimal.disabled = true;
                } else {
                    decimal.disabled = false;
                }
            }
        } else {
            display.textContent += key.textContent;
            if(key.textContent == '.'){
                decimal.disabled = true;
            }
        }
    });
});