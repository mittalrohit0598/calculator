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
    return a / b;
}

function operate(a, b, operator) {
    let res = 0;
    switch(operator){
        case '+': res = add(a, b); break;
        case '-': res = subtract(a, b); break;
        case '*': res = multiply(a, b); break;
        case '/': res = divide(a, b); break;
    }
    return(res);
}