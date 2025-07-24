function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

const inputDisplay = document.getElementById('input')
const outputDisplay = document.getElementById('output')
const display = document.getElementById('display')
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const equalBtn = document.getElementById('equal')
const buttonDisplay = document.querySelectorAll('.display')

function operate(){
    //CLEAR BUTTON
    clearBtn.addEventListener('click', () => {
        inputDisplay.textContent = '';
        outputDisplay.textContent = '';
    })

    //DELETE BUTTON
    deleteBtn.addEventListener('click', () => {
        let currentText = inputDisplay.textContent
        inputDisplay.textContent = currentText.slice(0, -1)
    })

    //DISPLAY
    buttonDisplay.forEach(btn => {
        btn.addEventListener('click', () => {
            inputDisplay.textContent += `${btn.textContent}`
        })
    })
}

operate();