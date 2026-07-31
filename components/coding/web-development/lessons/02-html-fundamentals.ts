import type { Lesson } from "./types";

export const htmlFundamentals: Lesson = {
  introduction: `
Every website starts with HTML. HTML, which stands for HyperText Markup Language, is the standard language used to create the structure and content of webpages. It tells the browser what elements should appear on the page, such as headings, paragraphs, images, buttons and links.

Think of HTML as the skeleton of a website. Without it, a webpage would have no structure or content. While HTML doesn't control how a website looks or behaves, it provides the foundation that CSS and JavaScript build upon.
`,
  whyItMatters: `
Every webpage on the internet uses HTML. Whether you're building a personal portfolio, an online store or a social media platform, HTML defines the layout and organizes the content. Learning HTML is the first step toward becoming a web developer.
`,
  keyPrinciples: `
### HTML Elements

An HTML document is built from elements that describe different parts of a webpage, such as headings, paragraphs, images, buttons, links and lists.

Most HTML elements use an opening tag and a closing tag.

Example: <h1>Welcome to Swipe</h1>

The opening tag tells the browser where the element begins, and the closing tag tells it where the element ends.

---

### Common HTML Elements

Some of the most frequently used elements include:

* <h1> to <h6> — Headings
* <p> — Paragraphs
* <a> — Links
* <img> — Images
* <button> — Buttons
* <div> — Groups content together
* <ul> and <li> — Unordered lists
* <form> — User input forms

These elements are the building blocks of every webpage.

---

### HTML Document Structure

Every HTML page follows a basic structure: a <!DOCTYPE html> declaration, an <html> root element containing a <head> (with page metadata like the <title>) and a <body> (with the visible content, like headings and paragraphs).

The browser reads this document from top to bottom before displaying the webpage.

---

### Semantic HTML

Modern websites use semantic HTML, which means choosing elements that describe their purpose instead of just their appearance.

Examples include:

* <header>
* <nav>
* <main>
* <section>
* <article>
* <footer>

Semantic HTML improves accessibility, search engine optimization (SEO) and makes code easier to understand.

---

### HTML Across Modern Frameworks

Although modern frameworks use different syntax, they all generate HTML in the browser.

* **HTML** — <h1>Hello</h1>
* **React** — <h1>Hello</h1>
* **Next.js** — <h1>Hello</h1>
* **Vue** — <h1>Hello</h1>
* **Angular** — <h1>Hello</h1>
* **Svelte** — <h1>Hello</h1>

No matter which framework you use, the final result displayed by the browser is HTML.
`,
  examples: `
HTML is used to create:

* Website navigation.
* Blog articles.
* Product pages.
* Contact forms.
* Image galleries.
* Landing pages.

Every visible piece of content on a webpage begins as HTML.
`,
  commonMistakes: `
* Thinking HTML is a programming language.
* Using HTML to style a website instead of CSS.
* Forgetting closing tags.
* Ignoring semantic HTML elements.
* Using too many unnecessary <div> elements.
`,
  exercises: `
* Explain what HTML stands for.
* Name five common HTML elements.
* Describe the difference between HTML and CSS.
* Identify semantic elements on a website you visit.
* Think about why every webpage needs HTML.
`,
  summary: `
HTML is the foundation of every website. It provides the structure and content that browsers display, while CSS adds styling and JavaScript adds interactivity. By understanding HTML elements, document structure and semantic markup, you've learned the first building block of modern web development.
`,
  resources: `
* MDN Web Docs — HTML
* HTML Living Standard (WHATWG)
* W3Schools — HTML Tutorial
* Google HTML Style Guide
`,
};
