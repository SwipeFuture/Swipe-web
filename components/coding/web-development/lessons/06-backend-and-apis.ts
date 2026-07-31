import type { Lesson } from "./types";

export const backendAndApis: Lesson = {
  introduction: `
While the frontend is everything users see and interact with, the **backend** works behind the scenes. It processes requests, stores data, manages user accounts and performs tasks that aren't visible in the browser. Without a backend, most modern websites wouldn't be able to support features like logins, online payments or saving user information.

The frontend and backend communicate through **APIs (Application Programming Interfaces)**, allowing websites to send and receive data securely. Together, these technologies power everything from social media platforms to online banking.
`,
  whyItMatters: `
Many modern websites are dynamic, meaning their content changes based on user actions. The backend makes this possible by processing information, storing data in databases and sending the correct information back to the frontend. Understanding how the backend works helps you see how complete web applications are built.
`,
  keyPrinciples: `
### What is a Backend?

The backend is the part of a web application that runs on a server.

Its responsibilities include:

* Processing requests.
* Managing users.
* Storing and retrieving data.
* Handling authentication.
* Running business logic.

Unlike the frontend, users never interact with the backend directly.

---

### Databases

A **database** stores information so it can be accessed later.

Common examples include:

* User accounts
* Products
* Orders
* Messages
* Blog posts

Whenever you create an account or save information on a website, it is usually stored in a database.

---

### APIs

An **API (Application Programming Interface)** allows different applications or systems to communicate with each other.

For example:

* A user clicks Sign In.
* The frontend sends a request to the backend.
* The backend checks the database.
* The backend sends a response back to the frontend.
* The website displays the result.

APIs are one of the most important parts of modern web development because they connect the frontend with the backend.

---

### Request & Response

Communication between the frontend and backend follows a simple process: Frontend sends a Request → Backend queries the Database → Backend sends a Response → Frontend displays the result.

This process happens every time you load data, submit a form or log into a website.

---

### Authentication

Many websites need to verify who a user is before allowing access.

Authentication is used for:

* Logging into an account.
* Resetting passwords.
* Protecting private information.
* Securing online payments.

It helps ensure that only authorized users can access certain features or data.

---

### Popular Backend Technologies

Different technologies can be used, but they all serve the same purpose: processing requests and delivering data.

* **Node.js** — JavaScript runtime for backend development
* **Express.js** — Building web servers and APIs
* **Next.js API Routes** — Creating backend endpoints within Next.js
* **Python (Django / Flask)** — Web applications and APIs
* **Java (Spring Boot)** — Enterprise applications
* **C# (.NET)** — Business software and web services
`,
  examples: `
The backend powers many everyday features:

* Logging into your account.
* Saving a shopping cart.
* Processing online payments.
* Loading social media posts.
* Sending emails.
* Managing user profiles.
`,
  commonMistakes: `
* Thinking the backend is visible to users.
* Assuming websites can store everything in the browser.
* Confusing APIs with databases.
* Believing every website needs a complex backend.
`,
  exercises: `
* Explain the difference between the frontend and the backend.
* Describe the role of a database.
* Explain what an API does.
* Think of three websites that rely heavily on backend services.
`,
  summary: `
The backend is responsible for processing requests, storing data and managing the logic behind modern web applications. APIs connect the frontend and backend, while databases store the information that applications need to function. Together, these technologies allow websites to provide dynamic, secure and interactive experiences.
`,
  resources: `
* MDN Web Docs — HTTP
* Node.js Documentation
* Express.js Documentation
* Next.js Documentation
* REST API Tutorial
* Postman Learning Center
`,
};
