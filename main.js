const inputDisplay = document.getElementById('input');
const outputDisplay = document.getElementById('output');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalBtn = document.getElementById('equal');
const numberBtn = document.querySelectorAll('.numbers');
const operatorBtn = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');

let initialNumber = null;
let presentNumber = '0';
let currentOperator = null;
let resultNumber = null;

function getNumbers(number){
    //WHEN A NUMBER IS PRESSED AFTER EQUALS
    if(initialNumber == null && currentOperator == null && resultNumber != null){
        presentNumber = number;
        resultNumber = null;
        inputDisplay.textContent = '';
        display(presentNumber);
    }
    else if(presentNumber == '0'){
        decimalBtn.disabled = false;
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
    //INITIAL CONDITION
    if(initialNumber == null && resultNumber == null){
        initialNumber = parseFloat(presentNumber);
    }

    //CONTINUOS OPERATIONS
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

    //EQUALS BUTTON
    equalBtn.addEventListener('click', () => {
        if(currentOperator != null){
            resultNumber = calculate(currentOperator);
            outputDisplay.textContent = resultNumber;
            initialNumber = null;
            presentNumber = '0';
            currentOperator = null;
        }

        //WHEN ONLY ONE NUMBER IS ENTERED BEFORE CLICKING EQUALS
        else{
            resultNumber = parseFloat(presentNumber);
            outputDisplay.textContent = resultNumber;
            initialNumber = null;
            presentNumber = '0';
        }
    })

    //CLEAR BUTTON
    clearBtn.addEventListener('click', () => {
        initialNumber = null;
        presentNumber = '0';
        currentOperator = null;
        resultNumber = null;
        inputDisplay.textContent = '';
        outputDisplay.textContent = '';
        deleteBtn.disabled = false;
        decimalBtn.disabled = false;
    })

    //DELETE BUTTON
    deleteBtn.addEventListener('click', () => {
        //DISABLE DELETE BUTTON AFTER RESULT IS DISPLAYED
        if(outputDisplay.textContent != ''){
            deleteBtn.disabled = true;
        }

        else{
            deleteBtn.disabled = false;
            //IF CURRENT INPUT IS A OPERATOR
            if(presentNumber == '0' && currentOperator != null){
                currentOperator = null;
            }
            //IF CURRENT INPUT IS A NUMBER
            else{
                if(presentNumber.length > 1){
                    let updatedNumber = presentNumber.slice(0, -1);
                    presentNumber = updatedNumber;
                    if(!presentNumber.includes('.')){
                        decimalBtn.disabled = false;
                    }
                }
                else{
                    presentNumber = '0';
                }
            }
            let displayContent = inputDisplay.textContent;
            inputDisplay.textContent = displayContent.slice(0, -1);
        }
    })

    //DECIMAL BUTTON
    decimalBtn.addEventListener('click', () => {
        let checkDecimal = presentNumber;
        if(checkDecimal.includes('.')){
            decimalBtn.disabled = true;
        }
        else{
            decimalBtn.disabled = false;
        }
    })
})