# Operator Trainer

An interactive, dark-mode learning app that builds real intuition for how
comparison operators (`<`, `>`, `==`, `<=`, `>=`, `!=`) behave — and for the
numerical edge cases that trip programmers up (negative numbers, floating-point
precision, hex/binary literals).

You're shown a statement like `7 < 12` and decide whether it's **true** or
**false**. Every answer is explained, and the app remembers what you get wrong.

## What makes it a learning tool, not just a quiz

- **Three difficulty levels.** Each meaningfully changes the experience:

  | Mode   | Number range   | Operators                          | Time pressure  |
  |--------|----------------|------------------------------------|----------------|
  | Easy   | 0–20           | `<` `>` `==`                       | none           |
  | Medium | 0–1000         | all six                            | 12s / question |
  | Hard   | −1000…1000     | all six + negatives, floats, hex   | 8s / question  |

- **An explanation for every answer.** Whether you're right or wrong, the app
  spells out *why* the statement is true or false, in plain English — including
  teaching notes for tricky concepts (e.g. why `0.1 + 0.2 == 0.3` is `false`).

- **Adaptive spaced repetition (Leitner system).** Each concept lives in a
  "box". Answer it correctly and it's promoted to a higher box and shown less
  often; answer it wrong and it drops back to box 1 and reappears almost
  immediately. Concepts keep coming back until you've mastered them. Progress is
  saved in your browser (`localStorage`), so it carries across sessions.

- **Engaging feedback.** Correct answers trigger a green pulse and a confetti
  burst; wrong answers gently shake and highlight the right choice. Questions
  transition smoothly, and score / streak / accuracy / mastery update live.

## Controls

- Click **True** / **False**, or press **T** / **F** (or **←** / **→**).
- Press **Enter** or **Space** for the next question.

## How to run

It's a static site — no build step, no dependencies, works offline. Just open
`index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Project structure

- `index.html` — markup and layout
- `css/style.css` — hand-written modern dark-mode styling and animations
- `js/main.js` — concept generators, spaced-repetition engine, explanations, UX
