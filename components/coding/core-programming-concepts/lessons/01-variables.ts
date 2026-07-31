import type { Lesson } from "./types";

export const variables: Lesson = {
  introduction: `
Variables are one of the first concepts every programmer learns. A variable is a named container that stores information so it can be used throughout a program. Instead of repeating the same value multiple times, you store it in a variable and reference it whenever you need it.

Variables can hold many different types of data, including text, numbers and true or false values. Every application—from websites and mobile apps to games and AI systems—uses variables to manage information.
`,
  whyItMatters: `
Without variables, programs couldn't remember information or respond to user input. Imagine an online store that couldn't remember a customer's name, the price of a product or the contents of a shopping cart. Variables make software dynamic by allowing information to be stored, updated and processed.
`,
  keyPrinciples: `
### What is a Variable?

A variable has three parts:

* Data Type (in some languages optional)
* Variable Name
* Value

Think of a variable as a labeled box that stores information: Data Type + Variable Name = Value, or simply Variable Name = Value, depending on the programming language.

---

### Common Data Types

**String** — stores text.

Examples: *"Hello"*, *"Swipe"*, *"John Smith"*

**Number** — stores numeric values.

Examples: *25*, *3.14*, *2026*

**Boolean** — stores only two possible values: *true* or *false*.

Booleans are commonly used for questions such as:

* Is the user logged in?
* Has the payment been completed?
* Is dark mode enabled?

---

### Variable Syntax in Popular Languages

Although the syntax looks different, every language below is creating a variable called name that stores the text "John".

* **Python** — name = "John"
* **JavaScript** — let name = "John";
* **TypeScript** — let name: string = "John";
* **Java** — String name = "John";
* **C#** — string name = "John";
* **C++** — string name = "John";
* **Go** — name := "John"
* **Rust** — let name = "John";
`,
  examples: `
Variables are used everywhere:

* Storing a user's name.
* Tracking a game score.
* Saving a product price.
* Remembering login status.
* Calculating a shopping cart total.
`,
  commonMistakes: `
* Choosing unclear variable names.
* Mixing different data types.
* Creating unnecessary variables.
* Forgetting that variables can change over time.
`,
  exercises: `
* Create one String, one Number and one Boolean variable.
* Write the same variable in two different programming languages.
* Think of five real-world examples where variables are used.
`,
  summary: `
Variables are one of the most important building blocks of programming. They allow programs to store, update and manage information efficiently. Although every programming language has its own syntax, the idea behind variables is always the same: giving a piece of data a name so it can be used throughout a program.
`,
};
