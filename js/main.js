var points = 0;
var operators = ["<", ">", "==", "<=", ">=", "!="];
var operator = "";
var number1 = document.getElementById("number1");
var number2 = document.getElementById("number2");
var operation = document.getElementById("operation");
number1.innerHTML = Math.floor(Math.random() * 6) + 1;
number2.innerHTML = Math.floor(Math.random() * 6) + 1;
operator = operators[Math.floor(Math.random() * operators.length)];
operation.innerHTML = operator;

document.querySelector(".true").addEventListener("click", function() {
    if (operator == "<") {
        if (number1 < number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
    if (operator == ">") {
        if (number1 > number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
    if (operator == "==") {
        if (number1 == number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
    if (operator == "<=") {
        if (number1 <= number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
    if (operator == ">=") {
        if (number1 >= number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
    if (operator == "!=") {
        if (number1 != number2) {
            points++;
            console.log("richtig");
            getRandomNumbers();
        } else {
            points--;
            console.log("falsch");
            getRandomNumbers();
        }
    }
})

document.querySelector(".false").addEventListener("click", function() {
    if (operator == "<") {
        if (number1 < number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
    if (operator == ">") {
        if (number1 > number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
    if (operator == "==") {
        if (number1 == number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
    if (operator == "<=") {
        if (number1 <= number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
    if (operator == ">=") {
        if (number1 >= number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
    if (operator == "!=") {
        if (number1 != number2) {
            points--;
            console.log("falsch");
            getRandomNumbers();
        } else {
            points++;
            console.log("richtig");
            getRandomNumbers();
        }
    }
})

function getRandomNumbers() {
    number1.innerHTML = Math.floor(Math.random() * 6) + 1;
    number2.innerHTML = Math.floor(Math.random() * 6) + 1;
    getRandomOperator();
}

function getRandomOperator() {
    operator = operators[Math.floor(Math.random() * operators.length)];
    operation.innerHTML = operator;
}