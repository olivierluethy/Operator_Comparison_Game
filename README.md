# Operator Comparison Game
A game where the user is presented with two numbers and an operator, and they have to choose whether the operator applied to the two numbers is true or false. The game keeps track of the user's score, and displays the result of their choice. When the user makes a choice, the code generates new random numbers and an operator for the next round. The code also updates the score and displays a message indicating whether the user's choice was correct or incorrect.

## How does the code work
The code begins by defining several variables, including points, which will keep track of the user's score, and operators, which is an array containing different comparison operators. It also defines several elements from the HTML document, such as number1 and number2, which are used to display the two numbers, and corin, which is used to display text indicating whether the user's answer was correct.

The code then generates two random numbers, displays them on the page, and randomly selects an operator from the operators array. It also sets an event listener on the "true" button, which will be triggered when the user clicks the button. When the button is clicked, the code checks which operator was selected, and determines whether the statement made by the operator with the two numbers is true or false. If the statement is true, the user's score is incremented and a message is displayed indicating that the answer was correct. If the statement is false, the user's score is decremented and a message is displayed indicating that the answer was incorrect. In either case, the code also generates new random numbers and an operator to be used in the next question.

## The use of It
Programmers often use different operators for their programms. This game helps them to know how they are being used.