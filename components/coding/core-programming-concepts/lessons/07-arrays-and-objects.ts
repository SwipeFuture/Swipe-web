import type { Lesson } from "./types";

export const arraysAndObjects: Lesson = {
  introduction: `
As programs become more advanced, developers need a way to organize larger amounts of data. Instead of creating dozens of separate variables, programming languages provide Arrays and Objects to group related information together.

Arrays store multiple values in a single collection, while Objects describe something by storing different pieces of information about it. Together, they form the foundation of almost every modern application, from websites and games to artificial intelligence.
`,
  whyItMatters: `
Without Arrays and Objects, managing data would quickly become difficult. They allow developers to organize information, access it efficiently and build applications that can handle large amounts of data in a structured way.
`,
  keyPrinciples: `
### Arrays

An Array stores multiple values in a single variable.

Example: ["Apple", "Banana", "Orange"]

Arrays are perfect for lists where every item belongs to the same group, such as:

* Products
* Users
* Messages
* High scores

---

### Objects

An Object stores multiple pieces of information about one thing.

Example: name: "John", age: 24, country: "USA"

Instead of storing one value, an Object stores properties that describe something.

---

### Arrays & Objects Together

Arrays and Objects are often combined — for example, a list of users where each user is its own Object with a name and age. This represents a collection of structured records rather than a flat list of simple values.

---

### Arrays & Objects Across Popular Languages

Every programming language provides a way to group related data. While the syntax differs, the concept remains the same.

* **Python** — fruits = ["Apple", "Banana"] · user = {"name": "John", "age": 24}
* **JavaScript** — const fruits = ["Apple", "Banana"]; · const user = { name: "John", age: 24 };
* **TypeScript** — const fruits: string[] = ["Apple"]; · const user = { name: "John", age: 24 };
* **Java** — String[] fruits = {"Apple", "Banana"}; · class User { ... }
* **C#** — string[] fruits = {"Apple", "Banana"}; · class User { ... }
* **C++** — vector<string> fruits; · struct User { ... };
* **Go** — fruits := []string{"Apple", "Banana"} · type User struct { ... }
* **Rust** — let fruits = vec!["Apple", "Banana"]; · struct User { ... }
`,
  examples: `
Arrays and Objects are used everywhere:

* A shopping cart stores products in an Array.
* A playlist stores multiple songs in an Array.
* A user profile is represented as an Object.
* A product contains properties like name, price and stock.
* Social media apps store lists of posts, comments and users.
`,
  commonMistakes: `
* Using an Array when an Object is more appropriate.
* Storing unrelated data in the same Object.
* Creating unnecessary nested Arrays or Objects.
* Forgetting that Arrays store collections while Objects describe individual items.
`,
  exercises: `
* Create an Array containing your five favorite movies.
* Describe yourself using an Object with your name, age and country.
* Think of three real-world examples where Arrays and Objects are used together.
* Explain the difference between an Array and an Object in your own words.
`,
  summary: `
Arrays and Objects are essential data structures used in every programming language. Arrays organize collections of values, while Objects group related information about a single item. Together, they allow developers to build structured, scalable and efficient applications that manage real-world data.
`,
};
