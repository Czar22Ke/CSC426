# Vanilla JS GUI Calculator

A sleek, responsive, and user-friendly Graphical User Interface (GUI) calculator built entirely from scratch using HTML, CSS, and Vanilla JavaScript.

## Features & Operations

The calculator supports comprehensive arithmetic operations, including standard and advanced mathematical components specifically programmed for enhanced utility:

- **`+`** : Addition
- **`-`** : Subtraction
- **`*`** : Multiplication
- **`/`** : Standard Division
- **`\`** : Integer Division (Calculates the division and rounds down to the nearest whole integer)
- **`^`** : Exponentiation (Power)
- **`%`** : Modulo (Remainder)
- **`C`** : Clear All (Resets the state of the calculator)

## Technical Architecture

- **HTML5:** Semantic markup utilizing custom `data-` attributes to tightly couple DOM elements with JavaScript logic without relying on arbitrary class names.
- **CSS3:** Built using modern **CSS Grid** for the layout, ensuring perfectly aligned buttons that easily adapt to screen spaces. Features dark-mode aesthetics with dynamic hover states.
- **JavaScript (ES6+):** Object-Oriented approach utilizing a `Calculator` class. This effectively handles state management (current vs previous operands) and ensures clean transitions between mathematical operations. Includes automatic screen-resetting upon evaluating expressions.

## How to Run Locally

No local server or build tools are required!

1. Clone the repository.
2. Navigate to the project directory.
3. Open `index.html` in any modern web browser to use the calculator.

## Directory Structure

- `index.html` - Main HTML skeleton
- `style.css` - GUI styling and layout properties
- `script.js` - Calculator class and DOM event listeners
