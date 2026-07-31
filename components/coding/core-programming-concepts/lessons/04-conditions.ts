import type { Lesson } from "./types";

export const conditions: Lesson = {
  introduction: `
Not every program should behave the same way all the time. Sometimes a user enters the correct password, sometimes they don't. Sometimes a product is in stock, and sometimes it's sold out. Conditions allow programs to make decisions based on different situations.

Conditions evaluate whether something is true or false. Depending on the result, the program chooses which block of code to execute. This makes software interactive and responsive to user input.
`,
  whyItMatters: `
Without conditions, every program would follow exactly the same path every time it runs. Conditions allow applications to react to different inputs, validate information and provide different outcomes based on specific rules.
`,
  keyPrinciples: `
### The if Statement

The if statement runs code only when a condition is true.

Example: If age is greater than or equal to 18 → Allow access

---

### The else Statement

The else statement runs when the condition is false.

Example: If password is correct → Log the user in. Else → Show an error message.

---

### Multiple Conditions

Programs can check several conditions at once using logical operators such as AND (&&) and OR (||).

Example: Age >= 18 AND hasTicket == true

Both conditions must be true before access is granted.

---

### Conditions Across Popular Languages

Although the syntax varies slightly, every programming language uses conditions to make decisions.

* **Python** — if age >= 18:
* **JavaScript** — if (age >= 18) {}
* **TypeScript** — if (age >= 18) {}
* **Java** — if (age >= 18) {}
* **C#** — if (age >= 18) {}
* **C++** — if (age >= 18) {}
* **Go** — if age >= 18 {}
* **Rust** — if age >= 18 {}
`,
  examples: `
Conditions are used in many applications:

* Checking whether a user is logged in.
* Verifying a password.
* Determining if a customer is eligible for a discount.
* Showing different content based on age.
* Preventing access to restricted pages.
`,
  commonMistakes: `
* Forgetting that conditions must evaluate to true or false.
* Mixing up = and ==.
* Creating conditions that are unnecessarily complicated.
* Forgetting to handle the else case.
`,
  exercises: `
* Write a condition that checks if a user is at least 18 years old.
* Think of three real-world situations where an if statement could be used.
* Create an example that uses both if and else.
`,
  summary: `
Conditions allow programs to make decisions by evaluating whether something is true or false. Using statements like if and else, developers can create software that responds to user input, validates information and behaves differently depending on the situation.
`,
};
