# Operator Comparison Game
A game in which the user is presented with two numbers and an operator, and must choose whether the operator applied to the two numbers is true or false. The game keeps track of the user's score and displays the result of the user's choice. When the user makes a choice, the code generates new random numbers and an operator for the next round. The code also updates the score and displays a message indicating whether the user's choice was correct or incorrect.

## How the code works
The code begins by defining several variables, including points, which will keep track of the user's score, and operators, which are an array of different comparison operators. It also defines several elements from the HTML document, such as number 1 and number 2, which are used to display the two numbers, and corin, which is used to display text indicating whether the user's answer was correct.

The code then generates two random numbers, displays them on the page, and randomly selects an operator from the operator's array. It also sets an event listener on the "true" button, which is triggered when the user clicks the button. When the button is clicked, the code checks which operator was selected and determines whether the statement made by the operator with the two numbers is true or false. If the statement is true, the user's score is incremented and a message is displayed indicating that the answer was correct. If the statement is false, the user's score is decremented and a message is displayed indicating that the answer was incorrect. In both cases, the code also generates new random numbers and an operator to be used in the next question.

## How to use it
Programmers often use different operators in their programs. This game helps them to know how they are used.
