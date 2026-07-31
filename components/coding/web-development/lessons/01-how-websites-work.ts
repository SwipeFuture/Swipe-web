import type { Lesson } from "./types";

export const howWebsitesWork: Lesson = {
  introduction: `
Every website you visit follows the same basic process. Whether you're opening Google, YouTube, Amazon or Swipe, your browser communicates with a server to request information. The server processes the request and sends the necessary files back to your device, allowing the browser to display the website.

Although this happens in just a few milliseconds, several technologies work together behind the scenes. Understanding how websites work helps you see the bigger picture of web development before learning HTML, CSS and JavaScript.
`,
  whyItMatters: `
Modern websites are much more than static pages. They allow users to sign in, watch videos, purchase products and interact with applications in real time. Understanding how the web works helps you understand where different technologies fit into the development process and why frontend and backend development are both important.
`,
  keyPrinciples: `
### The Browser

A browser is the application you use to access websites.

Popular browsers include:

* Google Chrome
* Safari
* Microsoft Edge
* Mozilla Firefox
* Opera

The browser downloads website files, interprets them and displays the finished webpage on your screen.

---

### The Server

A server is a computer that stores websites and applications.

When someone visits a website, the server receives the request and sends the required files back to the browser.

Servers can provide:

* HTML files
* CSS files
* JavaScript files
* Images
* Videos
* Data from databases

Without servers, websites wouldn't be accessible on the internet.

---

### The Request & Response Process

Every website follows the same communication process:

* You enter a website address.
* Your browser sends a request to the server.
* The server processes the request.
* The server sends a response containing the website files.
* Your browser displays the webpage.

This process usually takes only a fraction of a second.

---

### Frontend vs Backend

Modern websites are divided into two main parts.

**Frontend** — everything users can see and interact with, such as buttons, navigation, images, forms and animations. Frontend developers mainly work with HTML, CSS, JavaScript, TypeScript, React and Next.js.

**Backend** — works behind the scenes. It is responsible for processing requests, managing databases, authenticating users, handling payments and running business logic. Users never directly see the backend, but almost every modern website depends on it.

---

### How Everything Works Together

A simple example: you open swipe.com → your browser sends a request → the server receives the request → the server sends back HTML, CSS, JavaScript and images → the browser combines these files and displays the finished website.

If you sign in or submit a form, additional requests are sent to the backend to process your information.

---

### Visual Overview

User → Browser (sends a request) → Server (sends a response) → HTML + CSS + JavaScript → Website
`,
  examples: `
This process happens every day when you:

* Open YouTube.
* Search on Google.
* Shop online.
* Read the news.
* Sign in to an application.
* Use social media.

Every modern website follows this same communication model.
`,
  commonMistakes: `
* Thinking websites are stored inside the browser.
* Confusing the browser with the server.
* Believing the frontend works without a backend.
* Assuming websites consist of only one file instead of many different resources.
`,
  exercises: `
* Name three browsers you have used.
* Explain the difference between a browser and a server.
* Describe the request and response process in your own words.
* Identify which parts of your favorite website belong to the frontend and which belong to the backend.
`,
  summary: `
Every website is created through communication between a browser and a server. The browser requests information, the server responds with the necessary files and the browser renders the final webpage. Understanding this process provides the foundation for web development and makes it easier to learn HTML, CSS, JavaScript and modern web frameworks.
`,
  resources: `
* MDN Web Docs — Learn how browsers, HTML, CSS and JavaScript work.
* HTTP Overview (MDN) — Understand how requests and responses work.
* HTML Living Standard — Official HTML specification.
* Google Chrome DevTools — Explore how websites load using your browser's developer tools.
`,
};
