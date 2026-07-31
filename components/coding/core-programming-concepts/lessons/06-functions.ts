import type { Lesson } from "./types";

export const functions: Lesson = {
  introduction: `
As programs grow larger, writing the same code multiple times becomes inefficient and difficult to maintain. **Functions** solve this problem by grouping reusable code into a single block that can be called whenever it's needed.

Think of a function as a small machine: it receives an input, performs a task and can return an output. Functions help organize code, reduce repetition and make programs easier to understand.
`,
  whyItMatters: `
Functions are used in every programming language and almost every application. They make code reusable, easier to maintain and simpler to debug. Instead of writing the same logic repeatedly, you write it once and use it whenever needed.
`,
  keyPrinciples: `
### Creating a Function

A function is a named block of code that performs a specific task.

Example: Function greet() → Display "Hello!"

---

### Parameters

Functions can receive **parameters**, which are values passed into the function.

Example: Function greet(name) → Display "Hello, John!"

The parameter allows the same function to work with different values.

---

### Return Values

A function can send information back using a **return value**.

Example: Function add(a, b) → Return a + b

If a = 5 and b = 3, the function returns 8.

---

### Functions Across Popular Languages

Although the syntax differs, every programming language uses functions to organize and reuse code.

* **Python** — def greet(name):
* **JavaScript** — function greet(name) {}
* **TypeScript** — function greet(name: string) {}
* **Java** — void greet(String name) {}
* **C#** — void Greet(string name) {}
* **C++** — void greet(string name) {}
* **Go** — func greet(name string) {}
* **Rust** — fn greet(name: &str) {}
`,
  examples: `
Functions are used to:

* Calculate the total price of an order.
* Validate a user's password.
* Send an email.
* Display information on a webpage.
* Convert temperatures between Celsius and Fahrenheit.
`,
  commonMistakes: `
* Creating functions that are too large.
* Giving functions unclear names.
* Forgetting to return a value when needed.
* Repeating code instead of creating a function.
`,
  exercises: `
* Think of three tasks that could be turned into functions.
* Explain the difference between a parameter and a return value.
* Write down a descriptive name for a function that calculates a shopping cart total.
`,
  summary: `
Functions are reusable blocks of code that perform specific tasks. By accepting parameters and returning values, they make programs more organized, efficient and easier to maintain. Learning how to use functions is a major step toward writing clean, professional code.
`,
};
