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
        calculator(key.textContent);
    });
});

window.addEventListener('keydown', (e) => {
    if(e.key.search(/(\*|\u002F|-|\+|[0-9]|\.|=|Enter|Backspace)/) > -1 || e.keyCode == 67){
        if(e.key == '.'){
            if(decimal.disabled == false){
                calculator(e.key);
            }
        } else {
            calculator(e.key);
        }
    }
});

function calculator(key) {
    if(key == 'C' || key == 'c'){
        display.textContent = "";
        decimal.disabled = false;
        firstOperand = NaN;
        secondOperand = NaN;
        operator = "";
    } else if(key.search(/(\*|\u002F|-|\+)/) > -1){
        if(Object.is(secondOperand, NaN) && operator == ""){
            if(display.textContent !== ""){
                firstOperand = +display.textContent;
                operator = key;
                display.textContent += ` ${key} `;
                decimal.disabled = false;
            }
        } else if(!Object.is(firstOperand, NaN) && operator != "" && !display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length) == 0){
            secondOperand = +display.textContent.slice(display.textContent.indexOf(operator) + 2, display.textContent.length);
            const result = operate(firstOperand, secondOperand, operator);
            firstOperand = result;
            operator = key;
            secondOperand = NaN;
            display.textContent = result + ` ${operator} `;
            decimal.disabled = false;
        } else if(!Object.is(firstOperand, NaN)){
            operator = key;
            display.textContent = `${firstOperand} ${operator} `;
        }
    } else if(key == '=' || key == 'Enter'){
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
    } else if(key == 'CE' || key == 'Backspace'){
        if(display.textContent.slice(-2, -1).search(/(\*|\u002F|-|\+)/) > -1){
            display.textContent = display.textContent.slice(0, display.textContent.length - 3);
            operator = "";
        } else if(display.textContent.slice(-1, display.textContent.length) == '.'){
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            decimal.disabled = false;
        } else {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        }
    } else {
        display.textContent += key;
        if(key == '.'){
            decimal.disabled = true;
        }
    }
}