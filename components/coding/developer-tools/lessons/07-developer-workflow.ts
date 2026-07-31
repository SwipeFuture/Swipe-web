import type { Lesson } from "./types";

export const developerWorkflow: Lesson = {
  introduction: `
Building software is much more than simply writing code. Professional developers follow a structured process that helps them plan projects, build features, test their work, fix bugs and continuously improve their applications. This process is known as the **developer workflow**.

A good workflow keeps projects organized, reduces mistakes and makes collaboration much easier. Whether you're working on a personal website or contributing to a large application with hundreds of developers, following a consistent workflow helps ensure that software is reliable, maintainable and easy to update.

Although every company has its own way of working, the core principles of the development workflow are similar across the software industry.
`,
  whyItMatters: `
Without a clear workflow, software projects can quickly become disorganized. Developers may overwrite each other's work, introduce bugs or lose track of important tasks.

A structured workflow provides a roadmap from planning an idea to delivering a finished product. It helps developers stay productive, communicate effectively and release updates with confidence.

Learning this workflow also prepares you for working on professional software teams.
`,
  keyPrinciples: `
### Planning

Every successful project begins with a plan.

Before writing any code, developers often:

* Define project goals.
* Break work into smaller tasks.
* Design user interfaces.
* Plan application features.
* Discuss technical solutions.

Good planning reduces confusion and makes development much smoother.

---

### Writing Code

Once a plan is in place, developers begin building the application.

This usually involves:

* Creating new features.
* Writing clean, readable code.
* Following coding standards.
* Reusing existing components.
* Organizing files and folders.

Writing maintainable code is just as important as making the application work.

---

### Testing

Before publishing new features, developers test their applications to ensure everything works correctly.

Testing can include:

* Checking functionality.
* Finding bugs.
* Testing different devices.
* Verifying performance.
* Ensuring new updates don't break existing features.

Testing helps improve software quality and creates a better experience for users.

---

### Debugging

Even experienced developers encounter bugs.

Debugging is the process of:

* Finding problems.
* Understanding why they occur.
* Fixing the issue.
* Testing the solution.

Debugging is a normal part of software development and often takes as much time as writing new features.

---

### Deployment

Once an application has been tested, it is deployed to production so users can access the latest version.

Modern workflows often automate deployment, allowing updates to be published quickly and safely whenever new code is approved.

Deployment is not the end of development — it marks the beginning of the next improvement cycle.

---

### Continuous Improvement

Software is rarely finished.

Developers regularly:

* Fix bugs.
* Improve performance.
* Add new features.
* Update dependencies.
* Improve security.
* Respond to user feedback.

Successful applications continue evolving long after their initial release.

---

### Typical Developer Workflow

A professional workflow often looks like this: Plan → Write Code → Test → Debug → Commit & Push → Deploy → Monitor & Improve.

This cycle repeats throughout the lifetime of a project, allowing software to grow and improve over time.
`,
  examples: `
Developers follow this workflow to:

* Build new websites.
* Release mobile applications.
* Develop SaaS products.
* Fix software bugs.
* Add new features based on user feedback.
* Maintain large enterprise systems.

No matter the size of the project, an organized workflow helps developers produce better software.
`,
  commonMistakes: `
* Skipping the planning phase.
* Writing code without testing it.
* Ignoring bugs until they become larger problems.
* Deploying unfinished features.
* Making many unrelated changes at once instead of working in smaller, manageable updates.
`,
  exercises: `
* Explain why developers follow a workflow.
* Describe the purpose of testing and debugging.
* List the main stages of a typical development workflow.
* Think about a simple application and describe how you would move from planning to deployment.
`,
  summary: `
A developer workflow provides a structured process for creating, testing and maintaining software. By following stages such as planning, coding, testing, debugging and deployment, developers can build reliable applications while working efficiently with others. Understanding this workflow gives you a strong foundation for both personal projects and professional software development.
`,
  resources: `
* GitHub Documentation
* Atlassian Software Development Guides
* Visual Studio Code Documentation
* MDN Web Docs
* The Twelve-Factor App
* Google Engineering Practices
`,
};
