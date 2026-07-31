import type { Lesson } from "./types";

export const buildAndDeploymentTools: Lesson = {
  introduction: `
Writing code is only part of building a software application. Before a website or app can be used by others, it needs to be **built**, **optimized** and **deployed**. This process transforms your source code into a production-ready application that can be accessed by users around the world.

Modern developers use build tools to automate repetitive tasks and deployment platforms to publish their projects with just a few clicks. These tools improve performance, reduce errors and make it easier to update applications as they evolve.

Whether you're building a personal portfolio or a large web application, understanding build and deployment tools is an essential step in becoming a professional developer.
`,
  whyItMatters: `
Imagine having to manually optimize every image, combine every file and upload your website every time you make a small change. Modern development would be slow, repetitive and prone to mistakes.

Build tools automate these tasks, while deployment platforms publish your application quickly and reliably. Together, they allow developers to focus on writing code instead of managing complex release processes.
`,
  keyPrinciples: `
### What are Build Tools?

Build tools prepare your project before it is published.

They automatically perform tasks such as:

* Bundling files
* Optimizing images
* Compressing code
* Compiling TypeScript
* Processing CSS
* Improving performance

Instead of doing these jobs manually, developers simply run a build command.

---

### Development vs Production

Applications are usually built in two different modes.

**Development Mode** — Easier to debug, faster to update, includes helpful error messages, designed for building and testing.

**Production Mode** — Optimized for speed, smaller file sizes, better performance, ready for real users.

Before deployment, projects are typically converted from development mode into production mode.

---

### Deployment

Deployment is the process of publishing an application to the internet.

Once deployed, users can access your website through its domain name from anywhere in the world.

Modern deployment platforms automatically:

* Upload your project.
* Build the application.
* Optimize files.
* Publish updates.
* Provide secure hosting.

---

### Popular Platforms — Vercel

Vercel is one of the most popular platforms for deploying modern web applications, especially those built with Next.js.

Features include:

* Automatic deployments
* Fast global hosting
* Custom domains
* Performance optimization
* Continuous deployment from GitHub

---

### Popular Platforms — Netlify

Netlify is widely used for static websites and frontend applications.

It provides:

* Simple deployment
* Form handling
* Serverless functions
* Continuous deployment
* Built-in performance tools

---

### Popular Platforms — Cloudflare Pages

Cloudflare Pages is a modern hosting platform focused on speed and security.

It offers:

* Global content delivery
* Fast deployments
* Automatic builds
* GitHub integration
* Excellent performance worldwide

---

### Continuous Deployment

Many teams use **Continuous Deployment (CD)**.

Instead of uploading files manually, every change pushed to GitHub automatically triggers:

* Build the project.
* Run checks.
* Deploy the latest version.
* Publish the update online.

This allows developers to release new features quickly while reducing manual work.
`,
  examples: `
Developers use build and deployment tools to:

* Publish portfolio websites.
* Deploy online stores.
* Launch SaaS applications.
* Update company websites.
* Release new features automatically after every GitHub push.

These tools make it possible to deliver software efficiently and reliably.
`,
  commonMistakes: `
* Deploying without testing the application first.
* Forgetting to build the project before publishing.
* Assuming development mode and production mode are identical.
* Making changes directly on a live website.
* Ignoring deployment errors or warning messages.
`,
  exercises: `
* Explain the purpose of build tools.
* Describe the difference between development mode and production mode.
* Compare Vercel, Netlify and Cloudflare Pages.
* Research how a Next.js application is deployed to the internet.
`,
  summary: `
Build and deployment tools automate the process of preparing and publishing software. They optimize applications, improve performance and make it easy to release updates quickly and reliably. Platforms like Vercel, Netlify and Cloudflare Pages have become essential tools for modern web development by simplifying the journey from source code to a live application.
`,
  resources: `
* Vercel Documentation
* Netlify Documentation
* Cloudflare Pages Documentation
* Next.js Deployment Documentation
* MDN Web Docs — Deployment
* Node.js Documentation
`,
};
