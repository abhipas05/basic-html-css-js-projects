const zero = document.querySelector(".zero");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const output = document.querySelector("input");
const deleteButton = document.querySelector(".delete")
const clearButton = document.querySelector(".clear");
const multiply = document.querySelector(".multiply");
const subtract = document.querySelector(".sub");
const add = document.querySelector(".plus");
const divide = document.querySelector(".divide");
const equals = document.querySelector(".equal");
const decimal = document.querySelector(".dec");
const percentButton = document.querySelector(".percent")
const plusminusButton = document.querySelector(".plusminus");

let mem1 = null;
let op = null;
let mem2 = null;
let lastOperation = "num";
let realLastOperation = "op";

zero.addEventListener('click', function () {
    append(0);
})
one.addEventListener('click', function () {
    append(1);
})
two.addEventListener('click', function () {
    append(2);
})
three.addEventListener('click', function () {
    append(3);
})
four.addEventListener('click', function () {
    append(4);
})
five.addEventListener('click', function () {
    append(5);
})
six.addEventListener('click', function () {
    append(6);
})
seven.addEventListener('click', function () {
    append(7);
})
eight.addEventListener('click', function () {
    append(8);
})
nine.addEventListener('click', function () {
    append(9);
})

deleteButton.addEventListener('click', deleteFunction);
clearButton.addEventListener('click', clear);
multiply.addEventListener('click', function () {
    selectOperator("x");
});
divide.addEventListener('click', function () {
    selectOperator("/");
});
subtract.addEventListener('click', function () {
    selectOperator("-");
});
add.addEventListener('click', function () {
    selectOperator("+");
});
equals.addEventListener('click', calculate);
decimal.addEventListener('click', function () {
    if (!(output.value.includes("."))) {
        append(".");
    }
});
percentButton.addEventListener('click', percent);
plusminusButton.addEventListener('click', plusminus);

function append(text) {
    if (lastOperation === "op") {
        output.value = "";
        lastOperation = "num";
    }
    if (deleteButton.disabled) {
        deleteButton.disabled = false;
        percentButton.disabled = false;
        plusminusButton.disabled = false;
    }
    let currentText = output.value;
    if (currentText === "0" || currentText === "0.0") {
        output.value = text;
    } else {
        output.value = currentText + text;
    }
    realLastOperation = "num";
}

function selectOperator(operator) {
    if (!(op === null)) {
        let temp = mem1;
        let temp2 = output.value;
        mem1 = continuousCalculation(op, temp, temp2);
        if (!mem1) {
            clear();
            output.value = "that's not allowed";
            const buttons = document.querySelectorAll("button");
            buttons.forEach(function (b) {
                b.disabled = true;
            });
            clearButton.disabled = false;
        } else {
            if (!(realLastOperation === "op")) {
                output.value = mem1;
                op = operator;
                deleteButton.disabled = true;
                percentButton.disabled = true;
                plusminusButton.disabled = true;
                lastOperation = "op";
            } else {
                op = operator;
                mem1 = output.value;
                lastOperation = "op";
            }
        }
    } else {
        op = operator;
        mem1 = output.value;
        lastOperation = "op";
    }
    realLastOperation = "op";
}

function continuousCalculation(operator, s1, s2) {
    let num1 = Number(s1);
    let num2 = Number(s2);
    let returned;
    switch (op) {
        case "+":
            returned = num1 + num2;
            return parseFloat(returned.toFixed(3)).toString();
        case "-":
            returned = num1 - num2;
            return parseFloat(returned.toFixed(3)).toString();
        case "x":
            returned = num1 * num2;
            return parseFloat(returned.toFixed(3)).toString();
        case "/":
            if (num2 === 0) {
                return false;
            } else {
                returned = num1 / num2;
                return parseFloat(returned.toFixed(3)).toString();
            }
    }
}

function calculate() {
    mem2 = output.value;
    let num1 = Number(mem1);
    let num2 = Number(mem2);
    let result = 0;
    switch (op) {
        case "+":
            result = num1 + num2;
            output.value = parseFloat(result.toFixed(3)).toString();
            mem1 = result.toString();
            op = null;
            break;
        case "-":
            result = num1 - num2;
            output.value = parseFloat(result.toFixed(3)).toString();
            mem1 = result.toString();
            op = null;
            break;
        case "x":
            result = num1 * num2;
            output.value = parseFloat(result.toFixed(3)).toString();
            mem1 = result.toString();
            op = null;
            break;
        case "/":
            if (num2 === 0) {
                clear();
                output.value = "that's not allowed";
                const buttons = document.querySelectorAll("button");
                buttons.forEach(function (b) {
                    b.disabled = true;
                });
                clearButton.disabled = false;
            } else {
                result = num1 / num2;
                output.value = parseFloat(result.toFixed(3)).toString();
                mem1 = result.toString();
                op = null;
            }
            break;
    }
}


function deleteFunction() {
    let currentText = output.value;
    if (!(currentText === "")) {
        let newOutput = currentText.substring(0, currentText.length - 1);
        output.value = newOutput;
    }
}

function clear() {
    output.value = "0";
    op = null;
    mem1 = null;
    mem2 = null;
    lastOperation = "num";
    realLastOperation = "op";
    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (b) {
        b.disabled = false;
    });
}

function percent() {
    if (!((output.value === "") || (output.value === "0"))) {
        output.value = parseFloat((Number(output.value) / 100).toFixed(3)).toString();
    }
}

function plusminus() {
    if (!((output.value === "") || (output.value === "0"))) {
        if (Math.sign(Number(output.value)) === (-1)) {
            output.value = parseFloat(Math.abs(Number(output.value))).toString();
        } else {
            output.value = parseFloat(-Math.abs(Number(output.value))).toString();
        }
    }
}
