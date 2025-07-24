const inputDisplay = document.getElementById('input');
const outputDisplay = document.getElementById('output');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalBtn = document.getElementById('equal');
const numberBtn = document.querySelectorAll('.numbers');
const operatorBtn = document.querySelectorAll('.operator');

let initialNumber = null;
let presentNumber = '0';
let currentOperator = null;
let resultNumber = null;

function getNumbers(number){
    if(presentNumber == '0'){
        presentNumber = number;
    }
    else{
        presentNumber += number;
    }
}

function display(item){
    if(item == 'error'){
        outputDisplay.textContent = '';
        inputDisplay.textContent = 'MATH ERROR';
        return;
    }
    else if(inputDisplay.textContent == 'MATH ERROR'){
        inputDisplay.textContent = '';
    }
    outputDisplay.textContent = '';
    inputDisplay.textContent += item;
}

function operate(operator){
    if(initialNumber == null && resultNumber == null){
        initialNumber = parseFloat(presentNumber);
    }
    else if(currentOperator){
        let result = calculate(currentOperator);
        initialNumber = result.toString();
        inputDisplay.textContent = '';
        display(result);
    }

    currentOperator = operator;
    presentNumber = '0';
}

function calculate(operator){
    let firstNumber = parseFloat(initialNumber);
    let secondNumber = parseFloat(presentNumber);

    switch(operator){
        case '+':
            return firstNumber + secondNumber;

        case '-':
            return firstNumber - secondNumber;

        case 'x':
            return firstNumber * secondNumber;

        case '÷':
            if(secondNumber == 0){
                display("error");
                initialNumber = null;
                presentNumber = '0';
                currentOperator = null;
                resultNumber = null;
                return;
            }
            else{
                return firstNumber / secondNumber;
            }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //NUMBER BUTTONS
    numberBtn.forEach(button => {
        let item = button.textContent;
        button.addEventListener('click', () => {
            display(item);
            getNumbers(item);
        })
    })

    //OPERATOR BUTTONS
    operatorBtn.forEach(button => {
        let item = button.textContent;
        button.addEventListener('click', () => {
            operate(item);
            display(item);
        })
    })
})