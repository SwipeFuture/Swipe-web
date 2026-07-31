import type { Lesson } from "./types";

export const deploymentAndDevelopmentWorkflow: Lesson = {
  introduction: `
Writing code is only one part of web development. Once a website is finished, it needs to be tested, stored, shared with other developers and published on the internet. This entire process is known as the development workflow.

Professional developers use tools like Git, GitHub and cloud hosting platforms to manage projects, collaborate with teams and deploy websites. These tools help keep projects organized, make teamwork easier and ensure websites can be updated safely over time.
`,
  whyItMatters: `
A website isn't useful if it only exists on your computer. Deployment makes your project available to users around the world, while modern development tools help developers track changes, collaborate with others and maintain applications as they grow.
`,
  keyPrinciples: `
### Git

Git is a version control system that tracks changes made to your code.

With Git, developers can:

* Save project history.
* Undo mistakes.
* Work on new features safely.
* Collaborate with other developers.

Git is one of the most important tools in modern software development.

---

### GitHub

GitHub is an online platform that stores Git repositories.

It allows developers to:

* Back up projects.
* Share code with others.
* Collaborate in teams.
* Review changes.
* Contribute to open-source projects.

Many employers also use GitHub portfolios when hiring developers.

---

### Deployment

Deployment is the process of publishing a website so anyone can access it through the internet.

Popular deployment platforms include:

* Vercel
* Netlify
* Cloudflare Pages
* GitHub Pages

Once deployed, a website receives its own web address and becomes publicly available.

---

### Domains & Hosting

Every website needs a domain and hosting.

A domain is the website's address, such as swipe.com, google.com or github.com.

Hosting is the service that stores your website files and makes them available online. Without hosting, a website cannot be accessed by other users.

---

### Continuous Improvement

Most websites continue to evolve after they're published. Developers regularly:

* Fix bugs.
* Add new features.
* Improve performance.
* Update security.
* Respond to user feedback.

Modern development is an ongoing process rather than a one-time project.

---

### Modern Development Workflow

A typical web development workflow looks like this: Plan → Write Code → Test → Commit with Git → Push to GitHub → Deploy → Website Goes Live.

Although every team has its own workflow, these steps are common across most modern web projects.
`,
  examples: `
Modern development workflows are used to:

* Publish portfolio websites.
* Launch online stores.
* Deploy SaaS applications.
* Collaborate on team projects.
* Release updates and bug fixes.
`,
  commonMistakes: `
* Forgetting to back up code with Git.
* Deploying without testing.
* Making changes directly to a live website.
* Ignoring version control.
* Not documenting important updates.
`,
  exercises: `
* Explain the purpose of Git.
* Describe the difference between Git and GitHub.
* Research a website hosting platform.
* Explain the steps involved in deploying a website.
`,
  summary: `
Building a website is only the beginning of the development process. Professional developers use tools like Git and GitHub to manage their projects and deployment platforms to publish websites online. By following an organized workflow, developers can build, maintain and improve web applications efficiently throughout their entire lifecycle.
`,
  resources: `
* Git Documentation
* GitHub Documentation
* Vercel Documentation
* Netlify Documentation
* Cloudflare Pages Documentation
* Pro Git (Free Online Book)
`,
};
