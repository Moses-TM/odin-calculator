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
let decimalExists = false;

function getNumbers(number) {
    //WHEN A NUMBER IS PRESSED AFTER EQUALS
    if (initialNumber == null && currentOperator == null && resultNumber != null) {
        presentNumber = number;
        resultNumber = null;
        inputDisplay.textContent = '';
        display(presentNumber);
    }
    else if (presentNumber == '0') {
        decimalBtn.disabled = false;
        decimalExists = false;
        presentNumber = number;
    }
    else {
        presentNumber += number;
    }
}

function display(item) {
    if (item == 'error') {
        outputDisplay.textContent = '';
        inputDisplay.textContent = 'MATH ERROR';
        return;
    }
    else if (inputDisplay.textContent == 'MATH ERROR') {
        inputDisplay.textContent = '';
    }
    outputDisplay.textContent = '';
    inputDisplay.textContent += item;
}

function operate(operator) {
    deleteBtn.disabled = false;
    //CONTINUE CALCULATIONS AFTER EQUALS IS CLICKED
    if (initialNumber == null && resultNumber != null) {
        initialNumber = resultNumber;
        resultNumber = null;
        inputDisplay.textContent = '';
        display(initialNumber);
    }

    //INITIAL CONDITION
    if (initialNumber == null && resultNumber == null) {
        initialNumber = parseFloat(presentNumber);
    }

    //CONTINUOS OPERATIONS
    else if (currentOperator) {
        let result = calculate(currentOperator);
        initialNumber = result.toString();
        inputDisplay.textContent = '';
        display(result);
    }

    currentOperator = operator;
    presentNumber = '0';
}

function calculate(operator) {
    let firstNumber = parseFloat(initialNumber);
    let secondNumber = parseFloat(presentNumber);
    let result;

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;

        case '-':
            result = firstNumber - secondNumber;
            break;

        case '*':
            result = firstNumber * secondNumber;
            break;

        case '/':
            if (secondNumber == 0) {
                display("error");
                initialNumber = null;
                presentNumber = '0';
                currentOperator = null;
                resultNumber = null;
                return;
            }
            else {
                result = firstNumber / secondNumber;
                break;
            }
    }

    let resultString = result.toString();
    if (resultString.includes('.') && resultString.split('.')[1].length > 3) {
        return result.toFixed(3);
    }
    else if (resultString.length > 14) {
        return result.toExponential(3);
    }
    return result;
}

function equalCalculation() {
    if (currentOperator != null) {
        resultNumber = calculate(currentOperator);
        outputDisplay.textContent = resultNumber;
        initialNumber = null;
        presentNumber = '0';
        currentOperator = null;
    }

    //WHEN ONLY ONE NUMBER IS ENTERED BEFORE CLICKING EQUALS
    else {
        resultNumber = parseFloat(presentNumber);
        outputDisplay.textContent = resultNumber;
        initialNumber = null;
        presentNumber = '0';
    }
}

function clearCalculator() {
    initialNumber = null;
    presentNumber = '0';
    currentOperator = null;
    resultNumber = null;
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
    deleteBtn.disabled = false;
    decimalBtn.disabled = false;
    decimalExists = false;
}

function deleteFunction() {
    //DISABLE DELETE BUTTON AFTER RESULT IS DISPLAYED
    if (outputDisplay.textContent != '') {
        deleteBtn.disabled = true;
    }

    else {
        deleteBtn.disabled = false;
        //IF CURRENT INPUT IS A OPERATOR
        if (presentNumber == '0' && currentOperator != null) {
            currentOperator = null;
        }
        //IF CURRENT INPUT IS A NUMBER
        else {
            if (presentNumber.length > 1) {
                let updatedNumber = presentNumber.slice(0, -1);
                presentNumber = updatedNumber;
                if (!presentNumber.includes('.')) {
                    decimalBtn.disabled = false;
                    decimalExists = false;
                }
            }
            else {
                presentNumber = '0';
            }
        }
        let displayContent = inputDisplay.textContent;
        inputDisplay.textContent = displayContent.slice(0, -1);
    }
}

function decimalFunction() {
    let checkDecimal = presentNumber;
    if (checkDecimal.includes('.')) {
        decimalBtn.disabled = true;
        decimalExists = true;
    }
    else {
        decimalBtn.disabled = false;
        decimalExists = false;
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
        equalCalculation();
    })

    //CLEAR BUTTON
    clearBtn.addEventListener('click', () => {
        clearCalculator();
    })

    //DELETE BUTTON
    deleteBtn.addEventListener('click', () => {
        deleteFunction();
    })

    //DECIMAL BUTTON
    decimalBtn.addEventListener('click', () => {
        decimalFunction();
    })

    //KEYBOARD SUPPORT
    document.addEventListener('keydown', function (e) {
        handleKeyPress(e.key);
    })

    function handleKeyPress(key) {
        const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'NumpadDecimal'];
        if (validNumbers.includes(key)) {
            if (key === '.') {
                decimalFunction();
                if (!decimalExists) {
                    display(key);
                    getNumbers(key);
                }
            }
            else {
                display(key);
                getNumbers(key);
            }
            return;
        }

        const acceptableOperator = {
            '+': '+',
            'NumpadAdd': '+',
            '-': '-',
            'NumpadSubtract': '-',
            '*': '*',
            'NumpadMultiply': '*',
            '/': '/',
            'NumpadDivide': '/',
            'Backspace': 'backspace',
            'Enter': 'equals',
            '=': 'equals',
            'Delete': 'clear',
        };

        if (acceptableOperator[key]) {
            if (acceptableOperator[key] === 'equals') {
                equalCalculation();
            }

            else if (acceptableOperator[key] === 'clear') {
                clearCalculator();
            }

            else if (acceptableOperator[key] === 'backspace') {
                deleteFunction();
            }

            else {
                operate(key);
                display(key);
            }

            return;
        }

        if (key === 'Enter') {
            key.preventDefault();
        }
    }
})