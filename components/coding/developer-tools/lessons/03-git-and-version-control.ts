import type { Lesson } from "./types";

export const gitAndVersionControl: Lesson = {
  introduction: `
As software projects grow, developers constantly make changes by adding features, fixing bugs and improving existing code. Without a system to track these changes, it would be easy to lose progress, overwrite important work or accidentally introduce errors.

This is where **Git** comes in. Git is a **version control system** that records every change made to a project. It allows developers to return to previous versions, experiment safely with new ideas and collaborate with others without interfering with each other's work.

Today, Git is considered one of the most essential tools in software development and is used by individuals, startups and some of the world's largest technology companies.
`,
  whyItMatters: `
Imagine writing hundreds of lines of code only to accidentally delete an important feature or introduce a bug that breaks your application. Without version control, recovering your previous work could be impossible.

Git solves this problem by keeping a complete history of your project. Every important change is saved, allowing developers to restore older versions, compare changes and collaborate with confidence.

Whether you're working alone or in a team, version control is an essential part of professional software development.
`,
  keyPrinciples: `
### What is Version Control?

Version control is a system that records changes made to files over time. Instead of saving multiple copies like project-final, project-final-v2 or project-final-really-final, Git stores every change in an organized history, making it easy to track how a project has evolved.

---

### What is Git?

Git is the world's most popular version control system.

It allows developers to:

* Track changes to code.
* Save project history.
* Restore previous versions.
* Work on new features safely.
* Collaborate with other developers.

Git runs locally on your computer, meaning you can use it even without an internet connection.

---

### Repositories

A **repository**, often shortened to **repo**, is a project's storage location.

A repository contains:

* Source code
* Project files
* Git history
* Configuration files
* Documentation

Every Git project begins by creating or cloning a repository.

---

### Commits

A **commit** is a saved snapshot of your project. Whenever you complete a meaningful change, you create a commit with a short descriptive message.

For example:

* Add login page
* Fix navigation bug
* Improve homepage layout
* Update documentation

Each commit creates a point in history that you can return to at any time.

---

### Branches

A **branch** allows developers to work on new features without affecting the main version of the project.

For example:

* Main branch → Stable application
* Feature branch → New dark mode
* Bug fix branch → Fix login issue

Once the work is complete, the branch can be merged back into the main project. Branches make experimentation much safer because unfinished work doesn't affect the production version.

---

### Merging

After a feature has been completed and tested, developers combine it with the main project through a process called **merging**. Git automatically combines changes whenever possible.

If two developers modify the same piece of code, Git may create a **merge conflict**, which must be resolved manually before the project can continue.

---

### Basic Git Workflow

A typical Git workflow looks like this: Create Repository → Write Code → Save Changes → Commit Changes → Create New Branch (optional) → Merge Into Main.

Although professional projects can become much more complex, nearly every Git workflow follows these same basic principles.
`,
  examples: `
Developers use Git to:

* Save progress after completing a feature.
* Undo mistakes by returning to previous commits.
* Experiment with new ideas using branches.
* Collaborate on team projects.
* Keep a complete history of every change.

Git is used on projects of every size, from personal websites to large enterprise applications.
`,
  commonMistakes: `
* Forgetting to commit changes regularly.
* Writing unclear commit messages.
* Making large commits that combine many unrelated changes.
* Working directly on the main branch for every feature.
* Thinking Git automatically backs up projects online (it only stores them locally unless connected to a remote repository).
`,
  exercises: `
* Explain the purpose of version control.
* Describe what a Git repository is.
* Explain the difference between a commit and a branch.
* Think of three situations where Git could help recover from a mistake.
`,
  summary: `
Git is the foundation of modern version control. It allows developers to track changes, save project history, recover previous versions and collaborate efficiently with others. By understanding repositories, commits and branches, you'll gain one of the most valuable skills used in professional software development.
`,
  resources: `
* Git Documentation
* Pro Git (Free Online Book)
* Git Cheat Sheet
* Atlassian Git Tutorials
* Learn Git Branching
* Git SCM Guides
`,
};
