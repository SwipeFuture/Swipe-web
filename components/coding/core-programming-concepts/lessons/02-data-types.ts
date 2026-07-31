import type { Lesson } from "./types";

export const dataTypes: Lesson = {
  introduction: `
Variables store information, but not all information is the same. A person's name is text, their age is a number, and whether they are logged in is either true or false. These different categories of information are called **data types**.

Data types help programming languages understand what kind of data is being stored and what operations can be performed on it. Choosing the correct data type makes programs more reliable, efficient and easier to understand.
`,
  whyItMatters: `
Every program works with data. Whether you're building a website, a mobile app or a game, you'll constantly store, process and display information. Understanding data types helps you avoid errors and write cleaner, more predictable code.
`,
  keyPrinciples: `
### String

A **String** stores text.

Examples: *"Hello"*, *"Swipe"*, *"John Smith"*

---

### Number

A **Number** stores numeric values.

Examples: *25*, *3.14*, *2026*

Numbers are used for calculations such as prices, scores and measurements.

---

### Boolean

A **Boolean** stores only one of two values: *true* or *false*.

Booleans answer simple yes-or-no questions, such as:

* Is the user logged in?
* Is dark mode enabled?
* Has the payment been completed?

---

### Array

An **Array** stores multiple values in a single variable.

Example: ["Apple", "Banana", "Orange"]

Arrays are useful for lists of items.

---

### Object

An **Object** stores related pieces of information together.

Example: name: "John", age: 24, isStudent: true

Objects describe real-world things with multiple properties.

---

### Data Types Across Popular Languages

Every programming language supports the same core data types, even though the syntax may be slightly different.

* **Python** — name = "John" · age = 24 · isStudent = True
* **JavaScript** — let name = "John"; · let age = 24; · let isStudent = true;
* **TypeScript** — let name: string = "John"; · let age: number = 24; · let isStudent: boolean = true;
* **Java** — String name = "John"; · int age = 24; · boolean isStudent = true;
* **C#** — string name = "John"; · int age = 24; · bool isStudent = true;
* **C++** — string name = "John"; · int age = 24; · bool isStudent = true;
* **Go** — name := "John" · age := 24 · isStudent := true
* **Rust** — let name = "John"; · let age = 24; · let is_student = true;
`,
  examples: `
Data types are used everywhere:

* A username is stored as a String.
* A product price is stored as a Number.
* A login status is stored as a Boolean.
* A shopping cart stores products in an Array.
* A user profile is represented as an Object.
`,
  commonMistakes: `
* Using the wrong data type.
* Treating numbers as text.
* Forgetting that Booleans only have two values.
* Choosing an Array when an Object would be more appropriate.
`,
  exercises: `
* Write one example of each data type.
* Create an Array containing your three favorite foods.
* Describe yourself using an Object with at least four properties.
* Think of three real-world examples where each data type could be used.
`,
  summary: `
Data types define the kind of information a variable stores. The most common types include Strings, Numbers, Booleans, Arrays and Objects. Understanding when to use each one is an essential skill that will help you write cleaner, safer and more efficient programs.
`,
};
