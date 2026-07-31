import type { Lesson } from "./types";

export const operators: Lesson = {
  introduction: `
Programs don't just store data—they also perform calculations, compare values and make decisions. This is made possible through operators. Operators are special symbols that tell a program what action to perform with one or more values.

Whether you're adding two numbers, checking if a password is correct or combining multiple conditions, operators are used in almost every program you write. Understanding how they work is an essential step toward writing logical and interactive code.
`,
  whyItMatters: `
Without operators, programs couldn't calculate prices, compare values or make decisions. They allow software to process information and react to different situations, making applications dynamic and useful.
`,
  keyPrinciples: `
### Arithmetic Operators

Arithmetic operators perform mathematical calculations.

Common operators:

* Addition (+)
* Subtraction (-)
* Multiplication (*)
* Division (/)
* Modulus (%) — Remainder

Example: 10 + 5 = 15

---

### Comparison Operators

Comparison operators compare two values and always return a Boolean (true or false).

Common operators:

* Equal to (==)
* Not equal to (!=)
* Greater than (>)
* Less than (<)
* Greater than or equal to (>=)
* Less than or equal to (<=)

Example: 18 >= 16 → true

---

### Logical Operators

Logical operators combine multiple conditions.

Common operators:

* AND (&&)
* OR (||)
* NOT (!)

Example: Age >= 18 && hasTicket == true

The result is only true if both conditions are true.

---

### Operators Across Popular Languages

Most programming languages use nearly identical operators, making them easy to transfer from one language to another.

* **Python** — 5 + 3 · age >= 18 · age >= 18 and member
* **JavaScript** — 5 + 3 · age >= 18 · age >= 18 && member
* **TypeScript** — 5 + 3 · age >= 18 · age >= 18 && member
* **Java** — 5 + 3 · age >= 18 · age >= 18 && member
* **C#** — 5 + 3 · age >= 18 · age >= 18 && member
* **C++** — 5 + 3 · age >= 18 · age >= 18 && member
* **Go** — 5 + 3 · age >= 18 · age >= 18 && member
* **Rust** — 5 + 3 · age >= 18 · age >= 18 && member
`,
  examples: `
Operators are used every day in software:

* Calculating the total price of an order.
* Checking if a password is correct.
* Determining if a user is over 18.
* Combining multiple login requirements.
* Comparing two scores in a game.
`,
  commonMistakes: `
* Confusing assignment (=) with comparison (== or ===).
* Using the wrong comparison operator.
* Forgetting that comparison operators return a Boolean value.
* Writing complex expressions that are difficult to read.
`,
  exercises: `
* Calculate the result of 12 + 8.
* Write a comparison that checks if a user is at least 18 years old.
* Create a logical expression that checks whether a user is logged in and has verified their email.
* Identify which operator category (Arithmetic, Comparison or Logical) each example belongs to.
`,
  summary: `
Operators allow programs to calculate values, compare information and combine conditions. The three main categories are Arithmetic Operators, Comparison Operators and Logical Operators. Mastering these operators is essential because they are used in nearly every program you will write.
`,
};
