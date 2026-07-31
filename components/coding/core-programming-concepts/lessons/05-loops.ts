import type { Lesson } from "./types";

export const loops: Lesson = {
  introduction: `
Many programming tasks involve repeating the same action multiple times. Imagine displaying 100 products, sending notifications to every user or calculating the total of several numbers. Writing the same code over and over would be slow and inefficient. Loops solve this problem by allowing a block of code to run repeatedly.

Instead of duplicating code, developers use loops to automate repetitive tasks. This makes programs shorter, easier to read and much more efficient.
`,
  whyItMatters: `
Loops are used in almost every application. They allow programs to process lists of data, repeat actions automatically and save developers from writing unnecessary code. Understanding loops is essential for building real-world software.
`,
  keyPrinciples: `
### For Loop

A for loop repeats code a specific number of times.

Example: Repeat 10 times → Print "Hello"

For loops are commonly used when you know exactly how many times something should repeat.

---

### While Loop

A while loop continues running as long as a condition remains true.

Example: While lives > 0 → Continue the game

While loops are useful when you don't know in advance how many times the loop will run.

---

### Looping Through Collections

Loops are often used to go through every item in an array or list, such as Apple, Banana, Orange — the program processes each item one by one.

---

### Loops Across Popular Languages

Every programming language supports loops, although the syntax may differ slightly.

* **Python** — for item in fruits:
* **JavaScript** — for (let i = 0; i < fruits.length; i++) {}
* **TypeScript** — for (let i = 0; i < fruits.length; i++) {}
* **Java** — for (int i = 0; i < fruits.length; i++) {}
* **C#** — foreach (var item in fruits) {}
* **C++** — for (int i = 0; i < size; i++) {}
* **Go** — for i := 0; i < len(fruits); i++ {}
* **Rust** — for item in fruits.iter() {}
`,
  examples: `
Loops are used to:

* Display every product in an online store.
* Send emails to multiple users.
* Calculate the total of a list of prices.
* Process game objects every frame.
* Read data from a file.
`,
  commonMistakes: `
* Creating infinite loops that never stop.
* Using the wrong type of loop.
* Forgetting to update the loop condition.
* Making loops more complicated than necessary.
`,
  exercises: `
* Think of three everyday tasks that involve repetition.
* Explain when you would use a for loop instead of a while loop.
* List three situations where a loop could process multiple items.
`,
  summary: `
Loops allow programs to repeat tasks automatically, making code more efficient and easier to maintain. Whether processing data, displaying information or automating repetitive actions, loops are one of the most powerful tools in programming.
`,
};
