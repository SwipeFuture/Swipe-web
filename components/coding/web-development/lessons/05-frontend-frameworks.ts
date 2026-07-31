import type { Lesson } from "./types";

export const frontendFrameworks: Lesson = {
  introduction: `
As websites became more interactive and complex, managing large amounts of JavaScript became increasingly difficult. To solve this, developers created **frontend frameworks**. These frameworks provide tools, structures and best practices that make building modern web applications faster, more organized and easier to maintain.

Today, most professional web applications are built using frameworks instead of plain HTML, CSS and JavaScript. Frameworks help developers focus on building features rather than solving the same problems repeatedly.
`,
  whyItMatters: `
Modern websites often contain hundreds or even thousands of components. Without a framework, maintaining large applications would quickly become difficult. Frameworks improve organization, encourage reusable code and simplify the development of responsive and scalable applications.
`,
  keyPrinciples: `
### What is a Frontend Framework?

A frontend framework is a collection of tools and libraries that help developers build user interfaces more efficiently.

Instead of creating every feature from scratch, developers use frameworks to speed up development while following proven best practices.

---

### Components

Most modern frameworks use **components**.

A component is a reusable part of a website, such as:

* Navigation bars
* Buttons
* Cards
* Forms
* Footers
* Product listings

Instead of writing the same code multiple times, developers build a component once and reuse it throughout the application.

---

### React

**React** is one of the world's most popular frontend libraries.

It was developed by Meta and is used to build fast and interactive user interfaces. React introduced component-based development, making large applications easier to organize and maintain.

Many modern companies use React for their websites and applications.

---

### Next.js

**Next.js** is a framework built on top of React. It adds powerful features such as:

* File-based routing
* Server-side rendering (SSR)
* Static site generation (SSG)
* API routes
* Image optimization
* Improved performance

Because of these features, Next.js has become one of the most popular choices for modern web development.

---

### Why Frameworks Matter

Frameworks help developers:

* Build applications faster.
* Organize large projects.
* Reuse components.
* Improve performance.
* Follow modern development standards.

Although every framework has its own approach, they all aim to make web development more efficient.

---

### Popular Frontend Frameworks

Each framework has different strengths, but they all help developers build modern websites more efficiently.

* **React** — Building interactive user interfaces
* **Next.js** — Full-stack React applications
* **Vue** — Lightweight and flexible web applications
* **Angular** — Large enterprise applications
* **Svelte** — High-performance web applications
`,
  examples: `
Frontend frameworks are used to build:

* Social media platforms.
* Online stores.
* Dashboards.
* Streaming services.
* Portfolio websites.
* Software-as-a-Service (SaaS) applications.

Many of the websites you use every day are powered by frontend frameworks.
`,
  commonMistakes: `
* Learning a framework before understanding HTML, CSS and JavaScript.
* Switching between frameworks too often.
* Thinking frameworks replace JavaScript.
* Choosing a framework simply because it's popular.
`,
  exercises: `
* Explain what a frontend framework is.
* Describe the purpose of reusable components.
* Research React and Next.js.
* Think of three websites that likely use a frontend framework.
`,
  summary: `
Frontend frameworks help developers build modern web applications more efficiently by providing reusable components, better project organization and powerful development tools. React and Next.js have become industry standards because they simplify the creation of fast, scalable and maintainable websites.
`,
  resources: `
* React Documentation
* Next.js Documentation
* Vue Documentation
* Angular Documentation
* Svelte Documentation
`,
};
