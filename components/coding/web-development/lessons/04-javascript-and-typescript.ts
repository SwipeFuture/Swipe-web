import type { Lesson } from "./types";

export const javascriptAndTypescript: Lesson = {
  introduction: `
HTML provides the structure of a webpage, and CSS controls its appearance. **JavaScript** is the technology that makes websites interactive. It allows webpages to respond to user actions, update content dynamically and communicate with servers without reloading the page.

As web applications have become larger and more complex, many developers have adopted **TypeScript**. TypeScript is built on JavaScript but adds features that help developers write safer, more organized and easier-to-maintain code. Today, it has become the preferred choice for many modern frameworks, including React and Next.js.
`,
  whyItMatters: `
Modern websites are expected to be fast, interactive and responsive. Features like navigation menus, image sliders, online forms, shopping carts and real-time updates all rely on JavaScript. TypeScript builds on these capabilities by helping developers catch errors early and manage larger projects more efficiently.
`,
  keyPrinciples: `
### JavaScript

JavaScript is a programming language that runs directly in the browser.

It is responsible for adding functionality to websites, including:

* User interactions
* Animations
* Form validation
* Dynamic content
* API requests

Without JavaScript, most modern websites would be static and far less interactive.

---

### TypeScript

TypeScript is a superset of JavaScript that introduces **static typing** and additional developer tools.

This makes code:

* Easier to understand.
* Easier to maintain.
* Less likely to contain errors.
* Better suited for large applications.

After development, TypeScript is automatically converted into standard JavaScript that browsers can understand.

---

### JavaScript vs TypeScript

* **JavaScript** — Simple and flexible, no type checking, ideal for smaller projects, runs directly in browsers.
* **TypeScript** — More structured and predictable, supports static types, ideal for larger applications, compiles into JavaScript before running.

Today, many professional development teams choose TypeScript because it improves code quality and makes collaboration easier.

---

### Where They're Used

JavaScript and TypeScript power countless web applications, including:

* Interactive websites
* Online stores
* Social media platforms
* Dashboards
* Streaming services
* Single-page applications (SPAs)

They also form the foundation of popular frameworks like React, Next.js, Angular and Vue.

---

### Popular JavaScript Frameworks

Modern web development often uses frameworks built on JavaScript. Some of the most popular include:

* **React** — Building interactive user interfaces.
* **Next.js** — Full-stack React framework with server-side rendering.
* **Vue** — Progressive framework for modern web apps.
* **Angular** — Enterprise framework maintained by Google.
* **Svelte** — Lightweight framework that compiles to efficient JavaScript.

Although these tools work differently, they all rely on JavaScript at their core.
`,
  examples: `
JavaScript and TypeScript are used to:

* Validate forms before submission.
* Update content without refreshing the page.
* Display notifications and popups.
* Fetch data from APIs.
* Build complete web applications.
`,
  commonMistakes: `
* Thinking JavaScript and Java are the same language.
* Learning frameworks before understanding JavaScript fundamentals.
* Assuming TypeScript replaces JavaScript instead of extending it.
* Using JavaScript for everything when HTML or CSS would be more appropriate.
`,
  exercises: `
* Explain the role of JavaScript in web development.
* Describe two advantages of using TypeScript.
* Research one popular JavaScript framework.
* Think of three interactive features on a website that require JavaScript.
`,
  summary: `
JavaScript is the programming language that brings websites to life by adding interactivity and dynamic functionality. TypeScript builds on JavaScript by introducing features that make code safer and easier to maintain. Together, they form the foundation of modern web development and power many of today's most popular websites and applications.
`,
  resources: `
* MDN Web Docs — JavaScript
* TypeScript Documentation
* JavaScript.info
* ECMAScript Language Specification
* Next.js Documentation
* React Documentation
`,
};
