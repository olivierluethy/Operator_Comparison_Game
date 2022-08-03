/* Collect amount of points */
var points = 0;
/* Existing operators */
var operators = ["<", ">", "==", "<=", ">=", "!="];
/* Random picked operator */
var operator = "";
/* For displaying the first number */
var number1 = document.getElementById("number1");
/* For displaying the second number */
var number2 = document.getElementById("number2");
/* For displaying the operator */
var operation = document.getElementById("operation");
/* Text to show if user was correct */
var corin = document.getElementById("corinText");
/* To store the first number */
var number1number = 0;
/* To store the second number */
var number2number = 0;
/* Random picked number for first number */
number1number = Math.floor(Math.random() * 1000) + 1;
/* Random picked number for second number */
number2number = Math.floor(Math.random() * 1000) + 1;
/* Displaying first number */
number1.innerHTML = number1number;
/* Displaying second number */
number2.innerHTML = number2number;
/* Random picked operator */
operator = operators[Math.floor(Math.random() * operators.length)];
/* Show generated operator */
operation.innerHTML = operator;
/* To show on website the result of chosen button from user */
var corinColor = document.querySelector(".corin");
/* If the user clicked true */
document.querySelector(".true").addEventListener("click", function() {
        if (operator == "<") {
            if (number1number < number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        } else if (operator == ">") {
            if (number1number > number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        } else if (operator == "==") {
            if (number1number == number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        } else if (operator == "<=") {
            if (number1number <= number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        } else if (operator == ">=") {
            if (number1number >= number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        } else if (operator == "!=") {
            if (number1number != number2number) {
                points++;
                corin.innerHTML = "Antwort Richtig!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "green";
            } else {
                points--;
                corin.innerHTML = "Antwort Falsch!";
                getRandomNumbers();
                corinColor.style.backgroundColor = "red";
            }
        }
    })
    /* If user clicked false */
document.querySelector(".false").addEventListener("click", function() {
    if (operator == "<") {
        if (number1number < number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == ">") {
        if (number1number > number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "==") {
        if (number1number == number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "<=") {
        if (number1number <= number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == ">=") {
        if (number1number >= number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    } else if (operator == "!=") {
        if (number1number != number2number) {
            points--;
            corin.innerHTML = "Antwort Falsch!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "red";
        } else {
            points++;
            corin.innerHTML = "Antwort Richtig!";
            getRandomNumbers();
            corinColor.style.backgroundColor = "green";
        }
    }
})

function getRandomNumbers() {
    number1number = Math.floor(Math.random() * 1000) + 1;
    number2number = Math.floor(Math.random() * 1000) + 1;
    number1.innerHTML = number1number;
    number2.innerHTML = number2number;
    getRandomOperator();
}

function getRandomOperator() {
    operator = operators[Math.floor(Math.random() * operators.length)];
    operation.innerHTML = operator;
}