import type { Lesson } from "./types";

export const cssFundamentals: Lesson = {
  introduction: `
While HTML provides the structure of a webpage, **CSS** is responsible for its appearance. CSS, which stands for **Cascading Style Sheets**, controls how elements look by defining colors, fonts, spacing, layouts, animations and much more.

Without CSS, every website would appear as plain black text on a white background. CSS transforms simple HTML into modern, visually appealing and responsive websites that provide a better experience for users.
`,
  whyItMatters: `
Good design is about more than making a website look attractive. A well-designed interface improves readability, usability and accessibility, helping users find information quickly and interact with a website more easily. CSS gives developers complete control over how a webpage is presented across different devices.
`,
  keyPrinciples: `
### Selectors

A **selector** tells CSS which HTML element should be styled.

Example: h1 { color: blue; }

In this example, every <h1> heading will appear blue.

---

### Properties & Values

Every CSS rule consists of a **property** and a **value**.

Example: color: blue; · font-size: 32px; · margin: 20px;

Some of the most common properties include:

* color
* background-color
* font-size
* margin
* padding
* width
* height
* border

These properties define how an element should appear on the page.

---

### The Box Model

Every HTML element is treated as a rectangular box.

The **Box Model** consists of four parts:

* Content
* Padding
* Border
* Margin

Understanding the Box Model is essential for creating clean layouts and controlling spacing between elements.

---

### Layouts

Modern CSS provides powerful layout systems that make it easy to organize content. The two most common are:

* **Flexbox** — ideal for arranging items in a row or column.
* **CSS Grid** — ideal for building complex page layouts.

These tools allow developers to create responsive websites with much less code than in the past.

---

### Responsive Design

People visit websites on phones, tablets, laptops and desktop computers. CSS allows websites to automatically adapt to different screen sizes using flexible layouts and media queries.

Responsive design ensures that a website looks good and functions properly on every device.

---

### CSS Across Modern Frameworks

Although frameworks use different technologies, they all rely on CSS for styling. No matter which framework you choose, CSS remains the foundation of web design.

* **HTML & CSS** — Traditional CSS files
* **React** — CSS Modules, Tailwind CSS, Styled Components
* **Next.js** — CSS Modules, Tailwind CSS
* **Vue** — Scoped CSS
* **Angular** — Component CSS
* **Svelte** — Scoped CSS
`,
  examples: `
CSS is used to:

* Change colors and fonts.
* Add spacing between elements.
* Create navigation bars.
* Build responsive layouts.
* Add animations and transitions.
* Design modern user interfaces.
`,
  commonMistakes: `
* Adding too many unnecessary styles.
* Using inconsistent spacing and colors.
* Ignoring responsive design.
* Forgetting about accessibility and readability.
* Writing CSS that is difficult to maintain.
`,
  exercises: `
* Explain the difference between HTML and CSS.
* Name five common CSS properties.
* Describe the four parts of the Box Model.
* Research the difference between Flexbox and CSS Grid.
* Think about why responsive design is important.
`,
  summary: `
CSS is the language that controls the appearance of websites. It styles HTML elements, creates layouts and ensures webpages look great on every device. By understanding selectors, properties, the Box Model and responsive design, you've learned the core concepts that every web developer uses to build modern user interfaces.
`,
  resources: `
* MDN Web Docs — CSS
* CSS Tricks
* Tailwind CSS Documentation
* Flexbox Froggy (Interactive Flexbox learning)
* Grid Garden (Interactive CSS Grid learning)
`,
};
