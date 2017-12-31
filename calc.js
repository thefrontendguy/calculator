let calc = () => {
    let number = document.querySelectorAll('.btn.number');
    for (let i = 0; i < number.length; i++) {
        number[i].addEventListener('click', numClick);
    }
    let numberClicked = [];

    function numClick() {
        let dot = document.querySelectorAll('.btn.dot')[0];
        let num = this.value;

        if (num >= 0 && num <= 9) {
            num = Number(num);
        }
        if (typeof num === 'string' && numberClicked.indexOf('.') === -1) {
            if (numberClicked[0] === undefined) {
                numberClicked[0] = '0.';
            } else {
                numberClicked.push(this.value);
            }
        }
        if (typeof num === 'number') {
            numberClicked.push(this.value);
        }
        let numFull = Number(numberClicked.join(''));
        if (numFull.length > 18) { numFull.slice(0, 10) }

        if (input.operator === null) {
            input.arg1 = numFull;
            updateDisplay(input.arg1)
        } else if (input.arg1 !== null) {
            input.arg2 = numFull;
            updateDisplay(input.arg2)
        }
    }

    let operator = document.querySelectorAll('.btn.operator');
    for (let i = 0; i < operator.length; i++) {
        operator[i].addEventListener('click', operatorClick);
    }
    function operatorClick() {
        numberClicked = [];
        if (input.arg1 !== null) {
            input.operator = this.value;
            updateDisplay(input.operator)
        }
    }
    let clear = document.querySelectorAll('.btn.C')[0];
    clear.addEventListener('click', clearClick);
    function clearClick() {
        input.arg1 = null;
        input.arg2 = null;
        input.operator = null;
        numberClicked = [];
        updateDisplay(0)
    }

    let memory = document.querySelectorAll('.btn.M')[0];
    memory.addEventListener('click', memoryClick);
    function memoryClick() {
        if (input.memory !== null) {
            if (input.operator === null) {
                input.arg1 = input.memory;
                updateDisplay(input.arg1)
            } else if (input.arg1 !== null) {
                input.arg2 = input.memory;
                updateDisplay(input.arg2)
            }
        }
    }

    let memoryPlus = document.querySelectorAll('.btn.Mplus')[0];
    memoryPlus.addEventListener('click', memoryPlusClick);
    function memoryPlusClick() {
        let currentScreenValue = Number(document.getElementById('screen').innerHTML);
        if (currentScreenValue > 0) {
            input.memory = currentScreenValue;
        }
    }

    let memoryClear = document.querySelectorAll('.btn.Mclear')[0];
    memoryClear.addEventListener('click', memoryClearClick);
    function memoryClearClick() {
        input.memory = null;
    }

    let result = document.querySelectorAll('.btn.result')[0];
    result.addEventListener('click', resultClick);
    function resultClick() {
        let arg1 = input.arg1;
        let operator = input.operator;
        let arg2 = input.arg2;
        let result = eval(arg1 + operator + arg2);
        input.arg1 = result;
        updateDisplay(result)
    }
    let input = {
        arg1: null,
        operator: null,
        arg2: null,
        memory: null
    }
    let updateDisplay = (value) => {
        let display = document.getElementById('screen');
        display.innerHTML = value;
    }
}