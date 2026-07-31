import type { Lesson } from "./types";

export const github: Lesson = {
  introduction: `
While Git helps developers track changes on their own computers, software projects often need to be shared with others. Whether you're working with teammates, contributing to open-source software or backing up your projects online, you'll need a platform that stores your Git repositories and makes collaboration easy.

This is where **GitHub** comes in. GitHub is the world's most popular platform for hosting Git repositories. It allows developers to store projects in the cloud, collaborate with others, review code, manage tasks and contribute to software from anywhere in the world.

Today, GitHub hosts millions of repositories and is used by individual developers, startups, universities and many of the world's largest technology companies.
`,
  whyItMatters: `
Modern software is rarely built by a single person. Most applications are created by teams working together on different features at the same time.

GitHub provides the tools that make this collaboration possible. It allows developers to share code, review each other's work, report issues and safely merge changes into a project. Even if you work alone, GitHub acts as a secure online backup and showcases your projects to potential employers.

Learning GitHub is an important step toward becoming a professional developer.
`,
  keyPrinciples: `
### What is GitHub?

GitHub is an online platform that hosts Git repositories.

It allows developers to:

* Store projects online.
* Collaborate with others.
* Back up repositories.
* Review code.
* Manage software projects.
* Contribute to open-source software.

GitHub builds on Git by adding collaboration and cloud storage features.

---

### Repositories

Every project on GitHub is stored inside a **repository**.

A repository contains:

* Source code
* Git history
* Documentation
* Images and assets
* Configuration files
* Project information

Repositories can be public (visible to everyone) or private (accessible only to invited users).

---

### Remote Repositories

When working with GitHub, developers connect their local Git repository to a **remote repository** stored online.

The typical workflow looks like this:

* Write code locally.
* Commit your changes with Git.
* Push the changes to GitHub.
* Share or collaborate with others.

This keeps your local project and the online repository synchronized.

---

### Pull Requests

One of GitHub's most powerful features is the **Pull Request (PR)**. A Pull Request allows developers to propose changes before adding them to the main project.

Other developers can:

* Review the code.
* Suggest improvements.
* Discuss changes.
* Approve the update.
* Merge it into the project.

Pull Requests help maintain high code quality and reduce mistakes.

---

### Issues

GitHub includes an **Issues** system for tracking tasks and problems.

Issues can be used to:

* Report bugs.
* Suggest new features.
* Plan future work.
* Assign tasks to team members.
* Organize project development.

Many development teams use GitHub Issues as part of their daily workflow.

---

### Open Source

GitHub is home to millions of **open-source projects**.

Open-source software allows anyone to:

* View the source code.
* Learn from experienced developers.
* Suggest improvements.
* Report bugs.
* Contribute new features.

Many of today's most popular technologies, including React, Next.js and Linux, are developed openly on GitHub.

---

### Typical GitHub Workflow

A common GitHub workflow looks like this: Create Repository → Clone Repository → Write Code → Commit Changes → Push to GitHub → Open Pull Request → Review & Merge.

This workflow is used by teams of all sizes to develop software safely and efficiently.
`,
  examples: `
Developers use GitHub to:

* Back up personal projects.
* Collaborate with teammates.
* Share open-source software.
* Review code before publishing.
* Showcase portfolios to employers.
* Track bugs and future improvements.

Whether you're building a small website or a large application, GitHub helps organize and manage your work.
`,
  commonMistakes: `
* Thinking Git and GitHub are the same thing.
* Forgetting to push local commits to GitHub.
* Making changes directly on the main branch without review.
* Ignoring Pull Requests and code reviews.
* Accidentally making sensitive repositories public.
`,
  exercises: `
* Explain the difference between Git and GitHub.
* Describe the purpose of a remote repository.
* Explain what a Pull Request is and why it is useful.
* Explore a public GitHub repository and identify its files, documentation and commit history.
`,
  summary: `
GitHub extends Git by providing a platform for storing repositories, collaborating with other developers and managing software projects online. With features like Pull Requests, Issues and remote repositories, GitHub has become an essential tool for modern software development and one of the most valuable platforms for developers worldwide.
`,
  resources: `
* GitHub Documentation
* GitHub Skills
* GitHub Guides
* Git Documentation
* Open Source Guides
* First Contributions
`,
};
