import type { Lesson } from "./types";

export const codeEditorsAndIdes: Lesson = {
  introduction: `
Every piece of software begins with writing code, and to write code efficiently, developers use specialized tools called **code editors** and **Integrated Development Environments (IDEs)**. While you could technically write code in a simple text editor like Notepad, modern development requires much more than just typing text.

Code editors and IDEs provide features that help developers write, understand, test and debug code faster. They highlight mistakes, suggest code as you type, organize projects and integrate with many of the tools developers use every day. Choosing the right editor can significantly improve your productivity and make learning to program much more enjoyable.

Today, millions of developers rely on tools like **Visual Studio Code**, **Cursor** and **IntelliJ IDEA** to build everything from websites and mobile apps to games and enterprise software.
`,
  whyItMatters: `
As projects grow larger, keeping track of thousands of lines of code becomes increasingly difficult. Modern code editors and IDEs simplify this process by providing intelligent features that reduce mistakes, save time and make code easier to understand.

Whether you're writing your first "Hello, World!" program or building a large application with thousands of files, the right development environment helps you stay organized and focus on solving problems rather than managing files manually.
`,
  keyPrinciples: `
### What is a Code Editor?

A **code editor** is a program specifically designed for writing and editing source code. Unlike a regular text editor, code editors understand programming languages and provide features that make development much easier.

Common features include:

* Syntax highlighting
* Auto-completion
* Code formatting
* Search and replace
* File explorer
* Extension support

Code editors are lightweight, fast and highly customizable, making them the most popular choice for many developers.

---

### What is an IDE?

An **Integrated Development Environment (IDE)** combines a code editor with additional development tools in one application.

Besides writing code, IDEs often include:

* Built-in debugger
* Project management
* Version control integration
* Testing tools
* Performance analysis
* Database tools

IDEs are particularly useful for large software projects where many advanced tools are needed.

---

### Code Editor vs IDE

Although they serve similar purposes, there are some important differences.

* **Code Editor** — Lightweight and fast, focused on editing code, highly customizable, great for web development.
* **IDE** — More powerful but heavier, a complete development environment, includes many built-in tools, popular for enterprise and large applications.

Many developers start with a code editor and later use an IDE depending on the project they're working on.

---

### Popular Tools — Visual Studio Code

Visual Studio Code (VS Code) is one of the most popular code editors in the world.

It offers:

* Fast performance
* Thousands of extensions
* Integrated terminal
* Git support
* AI extensions
* Excellent support for web development

It is an excellent choice for beginners and professionals alike.

---

### Popular Tools — Cursor

Cursor is a modern AI-powered code editor built on Visual Studio Code.

It includes intelligent AI features that help developers:

* Generate code
* Explain existing code
* Find bugs
* Refactor projects
* Answer programming questions

AI-assisted development has become increasingly common, making tools like Cursor valuable companions for both learning and professional development.

---

### Popular Tools — IntelliJ IDEA

IntelliJ IDEA is a professional IDE developed by JetBrains.

It is especially popular for:

* Java
* Kotlin
* Enterprise software
* Backend development

It provides powerful debugging, intelligent code analysis and advanced project management features.

---

### Extensions

Most code editors can be expanded using **extensions**. Extensions add new functionality without changing the editor itself.

Popular extensions include:

* Programming language support
* Themes
* Icons
* Git integration
* AI assistants
* Code formatters
* Spell checkers

Developers often customize their editor to match their workflow.
`,
  examples: `
A frontend developer might use:

* Visual Studio Code
* Prettier
* ESLint
* GitHub extension
* Tailwind CSS IntelliSense

A Java developer might prefer:

* IntelliJ IDEA
* Maven
* Gradle
* Database tools
* Integrated debugger

A developer working with AI may choose:

* Cursor
* Python extensions
* Jupyter notebooks
* AI coding assistants

Each developer selects tools based on the technologies and projects they work with.
`,
  commonMistakes: `
* Spending more time choosing an editor than learning to code.
* Installing too many unnecessary extensions.
* Constantly switching between editors.
* Thinking expensive tools automatically make you a better developer.
* Ignoring keyboard shortcuts that improve productivity.
`,
  exercises: `
* Explain the difference between a code editor and an IDE.
* List three features that make code editors different from regular text editors.
* Research Visual Studio Code, Cursor and IntelliJ IDEA and compare their strengths.
* Install a code editor and explore its interface, file explorer and extension marketplace.
`,
  summary: `
Code editors and IDEs are essential tools for modern software development. They help developers write cleaner code, reduce errors and work more efficiently by providing intelligent features that go far beyond a simple text editor. Whether you choose a lightweight editor like Visual Studio Code or a full-featured IDE like IntelliJ IDEA, understanding these tools is the first step toward becoming a productive developer.
`,
  resources: `
* Visual Studio Code Documentation
* Cursor Documentation
* IntelliJ IDEA Documentation
* JetBrains Academy
* MDN Web Docs
* Visual Studio Code Marketplace
`,
};
