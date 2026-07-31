import type { Lesson } from "./types";

export const packageManagers: Lesson = {
  introduction: `
Modern software development rarely starts completely from scratch. Instead of writing every feature themselves, developers use **libraries** and **packages** that have already been created by others. These packages can add everything from user interface components and animations to database connections and security features.

Managing hundreds or even thousands of packages manually would be nearly impossible. This is where **package managers** come in. They allow developers to install, update, remove and organize project dependencies with just a few commands.

Whether you're building a simple website or a large application, package managers are an essential part of modern development.
`,
  whyItMatters: `
Imagine building a website that needs a chart library, a date picker, an authentication system and an animation framework. Downloading, updating and managing all of these manually would take a lot of time and increase the risk of errors.

Package managers automate this entire process. They ensure every project has the correct dependencies, making development faster, more organized and much more reliable.

Today, nearly every JavaScript project uses a package manager.
`,
  keyPrinciples: `
### What is a Package?

A **package** is a collection of reusable code that solves a specific problem.

Packages can provide:

* User interface components
* Animations
* Authentication
* Database tools
* API clients
* Utility functions
* Testing libraries

Instead of writing these features from scratch, developers can install them and start using them immediately.

---

### What is a Package Manager?

A **package manager** is a tool that installs and manages packages for a project.

It allows developers to:

* Install new libraries.
* Update existing packages.
* Remove unused dependencies.
* Keep projects organized.
* Ensure every developer has the same package versions.

Without package managers, managing large applications would become very difficult.

---

### Dependencies

A **dependency** is a package that your project relies on.

For example, a React application might depend on:

* React
* Next.js
* Tailwind CSS
* TypeScript
* ESLint

When another developer downloads the project, the package manager automatically installs every required dependency.

---

### Popular Package Managers — npm

**npm (Node Package Manager)** is the default package manager for Node.js and the most widely used in the JavaScript ecosystem.

It includes access to one of the world's largest collections of open-source packages.

---

### Popular Package Managers — pnpm

**pnpm** is designed for speed and efficient disk usage.

It stores packages in a shared location instead of creating duplicate copies for every project, making installations faster and reducing storage space.

Many modern development teams prefer pnpm because of its performance.

---

### Popular Package Managers — Yarn

**Yarn** is another popular package manager created by Meta.

It offers fast installations, reliable dependency management and additional features for larger applications.

Although npm has become more powerful over time, Yarn remains widely used in many professional projects.

---

### The package.json File

Every JavaScript project contains a file called **package.json**.

This file stores important information about the project, including:

* Project name
* Version
* Scripts
* Installed dependencies
* Development dependencies

When someone downloads the project, the package manager reads this file and installs everything the project needs.
`,
  examples: `
Developers use package managers to:

* Install React or Next.js.
* Add Tailwind CSS to a project.
* Update libraries to newer versions.
* Remove packages that are no longer needed.
* Share projects with other developers.

Without package managers, setting up a modern development environment would take much longer.
`,
  commonMistakes: `
* Installing packages without understanding what they do.
* Adding unnecessary dependencies to a project.
* Forgetting to update outdated packages.
* Editing dependency files manually without knowing their purpose.
* Assuming every project uses the same package manager.
`,
  exercises: `
* Explain what a package is.
* Describe the purpose of a package manager.
* Compare npm, pnpm and Yarn.
* Open a JavaScript project and identify the package.json file and some of its dependencies.
`,
  summary: `
Package managers make modern software development faster and more efficient by simplifying the installation and management of reusable code. Tools like npm, pnpm and Yarn allow developers to manage dependencies, share projects and keep applications organized, making them an essential part of every JavaScript development workflow.
`,
  resources: `
* npm Documentation
* pnpm Documentation
* Yarn Documentation
* Node.js Documentation
* package.json Documentation
* JavaScript Package Registry (npm)
`,
};
