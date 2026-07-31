import type { Lesson } from "./types";

export const theTerminal: Lesson = {
  introduction: `
When many people think about programming, they imagine writing code inside a code editor. However, professional developers also spend a significant amount of time using another powerful tool: the **terminal**, also known as the **command line**.

The terminal allows you to communicate directly with your computer by typing commands instead of clicking buttons. It can navigate folders, create files, run programs, install software, manage projects and automate repetitive tasks. While it may seem intimidating at first, learning the terminal is one of the most valuable skills for any developer.

Whether you're building websites, developing software or working with cloud servers, the terminal is used every day by developers around the world.
`,
  whyItMatters: `
Many development tools are designed to work through the terminal. Frameworks like React, Next.js and many programming languages provide commands that are faster and more efficient than using graphical interfaces.

Understanding the terminal also gives you greater control over your computer, helping you work more efficiently and solve problems that cannot always be handled through traditional applications.
`,
  keyPrinciples: `
### What is the Terminal?

The terminal is an application that lets you interact with your computer using text-based commands. Instead of clicking folders and buttons, you type commands to tell the operating system what to do.

For example, you can:

* Navigate folders
* Create files
* Delete files
* Copy files
* Run programs
* Install software
* Start development servers

Although every operating system looks different, the basic concepts remain the same.

---

### Why Developers Use It

The terminal is often much faster than using a graphical interface.

Developers use it to:

* Create new projects
* Run applications
* Install libraries
* Manage files
* Execute scripts
* Use Git
* Connect to remote servers

Many development tools are designed specifically for terminal use.

---

### Navigating the File System

One of the first things you'll learn is how to move around your computer.

Common actions include:

* Viewing the current folder
* Listing files
* Moving into folders
* Going back to previous folders
* Creating new directories

Understanding the file system makes it much easier to organize projects and locate files.

---

### Running Commands

Every terminal command performs a specific task.

For example, commands can:

* Open applications
* Run programs
* Build projects
* Install dependencies
* Start local servers

When you begin learning web development, you'll often use the terminal to launch development environments with a single command.

---

### Common Terminal Commands

Although commands vary slightly between operating systems, many are very similar.

* pwd — Show the current directory
* ls — List files and folders
* cd — Change directory
* mkdir — Create a new folder
* touch — Create a new file
* rm — Delete files
* clear — Clear the terminal window

Learning just a handful of commands can dramatically improve your workflow.

---

### Integrated Terminals

Most modern code editors include a built-in terminal, including Visual Studio Code, Cursor and IntelliJ IDEA. This allows developers to write code and run commands without leaving their editor, making development faster and more convenient.
`,
  examples: `
A web developer might use the terminal to:

* Create a new Next.js project.
* Install project dependencies.
* Start a local development server.
* Run tests.
* Build an application for production.

A backend developer might use it to:

* Connect to a remote server.
* Manage databases.
* Deploy applications.
* Monitor logs.

The terminal is a central part of nearly every development workflow.
`,
  commonMistakes: `
* Being afraid to use the terminal because it looks complicated.
* Copying commands without understanding what they do.
* Running commands in the wrong directory.
* Accidentally deleting files with terminal commands.
* Assuming every operating system uses identical commands.
`,
  exercises: `
* Explain what the terminal is and why developers use it.
* Describe the purpose of the cd command.
* List three tasks that can be completed using the terminal.
* Open your terminal and practice navigating between folders using basic commands.
`,
  summary: `
The terminal is one of the most important tools in a developer's toolkit. It allows you to interact directly with your computer, automate tasks and use many of the tools required for modern software development. Although it may seem unfamiliar at first, mastering the terminal will make you a faster, more confident and more efficient developer.
`,
  resources: `
* Microsoft Learn — Command Line Basics
* The Linux Command Line
* Windows Terminal Documentation
* Apple Terminal User Guide
* Visual Studio Code Terminal Documentation
* ExplainShell
`,
};
