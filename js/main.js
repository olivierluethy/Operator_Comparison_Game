var points = 0;
var operators = ["<", ">", "==", "<=", ">=", "!="];
var operator = "";
var number1 = document.getElementById("number1");
var number2 = document.getElementById("number2");
var operation = document.getElementById("operation");
var corin = document.getElementById("corinText");
number1.innerHTML = Math.floor(Math.random() * 6) + 1;
number2.innerHTML = Math.floor(Math.random() * 6) + 1;
operator = operators[Math.floor(Math.random() * operators.length)];
operation.innerHTML = operator;
var corinColor = document.querySelector(".corin");

document.querySelector(".true").addEventListener("click", function() {
    if (operator == "<") {
        if (number1 < number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    } else if (operator == ">") {
        if (number1 > number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    } else if (operator == "==") {
        if (number1 == number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    } else if (operator == "<=") {
        if (number1 <= number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    } else if (operator == ">=") {
        if (number1 >= number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    } else if (operator == "!=") {
        if (number1 != number2) {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        } else {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        }
    }
})

document.querySelector(".false").addEventListener("click", function() {
    if (operator == "<") {
        if (number1 < number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == ">") {
        if (number1 > number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "==") {
        if (number1 == number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "<=") {
        if (number1 <= number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == ">=") {
        if (number1 >= number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "!=") {
        if (number1 != number2) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            console.log("Falsch");
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            console.log("Richtig");
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
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