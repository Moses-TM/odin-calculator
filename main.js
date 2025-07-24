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

function getNumbers(){
    
}

function display(item){
    inputDisplay.textContent += item
}

function operate(){
    
}

document.addEventListener('DOMContentLoaded', () => {
    //NUMBER BUTTONS
    numberBtn.forEach(button => {
        button.addEventListener('click', () => {
            display(button.textContent)
        })
    })

    
})