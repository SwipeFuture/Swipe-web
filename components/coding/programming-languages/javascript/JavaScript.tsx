"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for JavaScript — its own dedicated file/route
// rather than a shared template, matching how every other Coding sub-page
// works. Real per-language copy (what it is, why to learn it, syntax,
// roadmap, etc.) hasn't been written yet, so every prose section falls back
// to PLACEHOLDER.

const NAME = "JavaScript";
const TAGLINE = "The language of the web.";
const LOGO = "/java-script-logo-green.png";
const SUMMARY =
  "Learn the language that powers the modern web. JavaScript brings websites to life through interactivity and dynamic functionality, making it one of the most essential programming languages for frontend and full-stack development.";

const PLACEHOLDER = "Content for this section is coming soon.";

type RoadmapColor = "green" | "yellow" | "orange" | "red";

type RoadmapLevel = {
  level: number;
  color: RoadmapColor;
  title: string;
  goal: string;
  learn: string[];
  project?: string;
  finalProjects?: string[];
};

const ROADMAP_COLORS: Record<RoadmapColor, { dot: string; border: string; text: string }> = {
  green: { dot: "bg-green-500", border: "border-green-300", text: "text-green-700" },
  yellow: { dot: "bg-yellow-500", border: "border-yellow-300", text: "text-yellow-700" },
  orange: { dot: "bg-orange-500", border: "border-orange-300", text: "text-orange-700" },
  red: { dot: "bg-red-500", border: "border-red-300", text: "text-red-700" },
};

const JS_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started",
    goal: "Set up your development environment and write your first JavaScript program.",
    learn: ["What is JavaScript?", "How JavaScript works", "Setting up Visual Studio Code", "Running JavaScript in the browser", "Console & Developer Tools", "Hello World", "Comments"],
    project: "Hello JavaScript",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how JavaScript stores and manages data.",
    learn: ["let", "const", "Strings", "Numbers", "Booleans", "null", "undefined", "Type Conversion"],
    project: "Simple Calculator",
  },
  {
    level: 3,
    color: "green",
    title: "Operators",
    goal: "Perform calculations and compare values.",
    learn: ["Arithmetic Operators", "Assignment Operators", "Comparison Operators", "Logical Operators", "Increment & Decrement", "Modulo"],
    project: "Grade Calculator",
  },
  {
    level: 4,
    color: "green",
    title: "Conditions",
    goal: "Make decisions in your programs.",
    learn: ["if", "else", "else if", "switch", "Ternary Operator"],
    project: "Age Checker",
  },
  {
    level: 5,
    color: "green",
    title: "Loops",
    goal: "Repeat code efficiently.",
    learn: ["for", "while", "do...while", "break", "continue", "Nested Loops"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Functions",
    goal: "Organize code into reusable blocks.",
    learn: ["Function Declarations", "Parameters", "Return Values", "Arrow Functions", "Scope"],
    project: "Calculator with Functions",
  },
  {
    level: 7,
    color: "green",
    title: "Arrays",
    goal: "Work with collections of data.",
    learn: ["Creating Arrays", "Accessing Elements", "Array Methods", "for...of", "map()", "filter()"],
    project: "Shopping List",
  },
  {
    level: 8,
    color: "green",
    title: "Objects",
    goal: "Store structured data.",
    learn: ["Object Literals", "Properties", "Methods", "Object Destructuring", "Spread Operator"],
    project: "User Profile System",
  },
  {
    level: 9,
    color: "yellow",
    title: "Strings",
    goal: "Manipulate text efficiently.",
    learn: ["String Methods", "Template Literals", "substring()", "split()", "replace()", "trim()"],
    project: "Password Validator",
  },
  {
    level: 10,
    color: "yellow",
    title: "DOM Manipulation",
    goal: "Make websites interactive.",
    learn: ["Selecting Elements", "Changing Content", "Styling Elements", "Event Listeners", "Forms"],
    project: "Interactive Counter",
  },
  {
    level: 11,
    color: "yellow",
    title: "Events",
    goal: "Respond to user interactions.",
    learn: ["Click Events", "Keyboard Events", "Mouse Events", "Form Events", "Event Bubbling"],
    project: "To-Do List",
  },
  {
    level: 12,
    color: "yellow",
    title: "Asynchronous JavaScript",
    goal: "Handle operations that take time.",
    learn: ["Callbacks", "Promises", "async / await", "Fetch API", "JSON"],
    project: "Weather App",
  },
  {
    level: 13,
    color: "yellow",
    title: "Error Handling",
    goal: "Build more reliable applications.",
    learn: ["try", "catch", "finally", "throw", "Debugging"],
    project: "Form Validation",
  },
  {
    level: 14,
    color: "yellow",
    title: "Modules",
    goal: "Organize larger projects.",
    learn: ["import", "export", "ES Modules", "File Structure"],
    project: "Multi-File Application",
  },
  {
    level: 15,
    color: "orange",
    title: "Object-Oriented JavaScript",
    goal: "Build applications using objects and classes.",
    learn: ["Classes", "Constructors", "Inheritance", "Encapsulation", "Static Methods"],
    project: "Library Management System",
  },
  {
    level: 16,
    color: "orange",
    title: "Modern JavaScript",
    goal: "Master modern ES6+ features.",
    learn: ["Destructuring", "Spread & Rest", "Optional Chaining", "Nullish Coalescing", "Default Parameters"],
    project: "Student Dashboard",
  },
  {
    level: 17,
    color: "orange",
    title: "APIs & HTTP",
    goal: "Communicate with external services.",
    learn: ["REST APIs", "HTTP Methods", "Fetch", "Authentication Basics", "API Keys"],
    project: "Movie Search App",
  },
  {
    level: 18,
    color: "orange",
    title: "Node.js Basics",
    goal: "Run JavaScript outside the browser.",
    learn: ["What is Node.js?", "npm", "Packages", "Express Basics", "File System"],
    project: "Simple REST API",
  },
  {
    level: 19,
    color: "red",
    title: "TypeScript",
    goal: "Write safer and more scalable JavaScript.",
    learn: ["TypeScript Basics", "Types", "Interfaces", "Generics", "Compilation"],
    project: "Task Manager",
  },
  {
    level: 20,
    color: "red",
    title: "Professional JavaScript",
    goal: "Build production-ready JavaScript applications.",
    learn: ["Clean Code", "Design Patterns", "Testing", "Git & GitHub", "Performance Optimization", "Security Best Practices", "Build Tools", "Deployment"],
    finalProjects: ["🌐 Portfolio Website", "🛒 E-Commerce Store", "💬 Real-Time Chat App", "📝 Advanced To-Do App", "🎬 Movie Database", "📊 Finance Tracker", "📱 Full-Stack Dashboard"],
  },
];

const WHAT_IS = `
When you visit a website, you're actually using three different technologies that work together to create the experience you see on your screen.

* HTML provides the structure of the page by defining elements such as headings, paragraphs, buttons and images.
* CSS controls the appearance of those elements by adding colors, layouts, animations and responsive designs.
* JavaScript adds behavior and interactivity, allowing websites to respond to user actions and change content without reloading the page.

Think of it like building a house. HTML creates the walls, doors and windows, CSS paints and decorates the rooms, while JavaScript brings the house to life by making the lights switch on, the doors open automatically and the security system respond when someone presses the doorbell.

JavaScript was created in 1995 by Brendan Eich while working at Netscape. At the time, websites were mostly static documents that displayed information but couldn't react to users. If you wanted to update a page, you often had to reload the entire website.

JavaScript changed that by allowing websites to execute code directly inside the browser. This meant developers could create interactive features such as image sliders, dropdown menus, form validation and dynamic content that updated instantly without refreshing the page.

Over the years, JavaScript has evolved into one of the most important programming languages in the world. Today, it is no longer limited to web browsers. With technologies like Node.js, developers can also use JavaScript to build servers, APIs and complete backend applications. It is also used to create mobile apps, desktop software, browser extensions and cloud services.

Because every modern web browser supports JavaScript by default, it has become the foundation of web development. Whether you're visiting a social media platform, an online store, a streaming service or a banking website, JavaScript is almost certainly running behind the scenes to make the experience fast, interactive and responsive.

For anyone interested in building websites or web applications, learning JavaScript is an essential first step. It provides the foundation for many modern frameworks and technologies, including React, Next.js and TypeScript, making it one of the most valuable programming languages you can learn.
`;

const WHY_LEARN = `
JavaScript is one of the most popular and widely used programming languages in the world. It is supported by every major web browser and is used by millions of developers to build websites, applications and online services that people use every day.

One of JavaScript's greatest strengths is its versatility. Unlike many programming languages that are designed for a specific purpose, JavaScript can be used across the entire web development stack. It powers interactive user interfaces in the browser, runs backend servers through Node.js and can even be used to develop desktop applications, mobile apps and cloud-based services.

Learning JavaScript also opens the door to a huge ecosystem of tools and frameworks. Popular technologies such as React, Next.js, Vue, Express.js and TypeScript are all built around JavaScript. Once you understand the language itself, learning these frameworks becomes much easier because they all rely on the same core concepts.

Another major advantage is the size of the JavaScript community. Because it is so widely used, there are thousands of tutorials, books, courses and open-source projects available online. If you encounter a problem while learning, there is a very good chance that another developer has already asked the same question and shared a solution.

JavaScript is also an excellent career choice. Companies of every size—from startups to some of the world's largest technology companies—use JavaScript to build and maintain their products. This creates a strong demand for developers who understand the language and its ecosystem.

Whether your goal is to become a frontend developer, full-stack engineer or software developer, JavaScript provides a strong foundation that will continue to be useful throughout your programming journey.
`;

const WHERE_USED = `
JavaScript is used in almost every area of modern software development, making it one of the most versatile programming languages available today.

Its most common use is frontend web development, where it creates interactive user experiences inside the browser. Features such as navigation menus, image galleries, search bars, forms, animations, shopping carts and real-time notifications are all powered by JavaScript.

With the introduction of Node.js, JavaScript also became a powerful language for backend development. Developers can use it to build servers, process data, create APIs, manage user authentication and connect applications to databases. This allows a single language to be used for both the frontend and backend of a project, a practice known as full-stack development.

JavaScript is also widely used in mobile application development through frameworks like React Native, allowing developers to create apps for both iOS and Android using the same language. In addition, technologies such as Electron make it possible to build desktop applications for Windows, macOS and Linux using JavaScript.

Beyond traditional applications, JavaScript plays an important role in cloud computing, browser extensions, automation tools, online games and serverless functions. Its flexibility allows developers to build everything from simple personal websites to large-scale platforms that serve millions of users every day.

Because of its versatility, enormous ecosystem and universal browser support, JavaScript has become one of the most influential programming languages ever created and remains a fundamental skill for modern software development.
`;

const CAREER = `
JavaScript is one of the most in-demand programming languages in the world and plays a key role in modern software development. Because it is supported by every major web browser and can also be used on servers, desktop applications and mobile devices, JavaScript developers have access to a wide range of career opportunities across many industries.

Many developers begin their careers as **Frontend Developers**, creating responsive websites and interactive user interfaces using JavaScript alongside HTML and CSS. As they gain experience, they often learn frameworks such as React or Next.js to build larger and more complex web applications.

JavaScript is also widely used for **Backend Development** through technologies like Node.js. Backend developers build servers, APIs, databases and the logic that powers applications behind the scenes. Developers who understand both frontend and backend technologies are known as **Full-Stack Developers**, one of the most sought-after roles in the software industry.

Beyond traditional web development, JavaScript is used to build **mobile applications** with frameworks like React Native, **desktop applications** using Electron, browser extensions, cloud services and serverless applications. Its flexibility allows developers to work on a wide variety of projects without switching programming languages.

As your skills continue to grow, you may pursue specialized roles such as:

* Frontend Developer
* Backend Developer
* Full-Stack Developer
* React Developer
* Node.js Developer
* Web Application Developer
* Software Engineer
* Technical Lead
* Solutions Architect

Learning JavaScript also provides an excellent foundation for mastering other technologies such as TypeScript, React, Next.js and many modern development frameworks. Whether you want to work for a startup, a global technology company or build your own products, JavaScript offers countless opportunities for growth and long-term career success.
`;

const RESOURCES = `
Learning JavaScript takes time and practice. While reading tutorials and watching videos can help you understand new concepts, the best way to improve is by writing code regularly and building your own projects. Every application you create will strengthen your understanding and help you become a more confident developer.

The JavaScript community is one of the largest and most active in the world. There are thousands of free tutorials, official documentation sites, coding challenges and open-source projects that can support your learning journey. Whenever you encounter a problem, chances are that another developer has already experienced it and shared a solution online.

As you continue learning, try to balance theory with hands-on practice. Read documentation, experiment with new ideas, solve coding challenges and gradually build larger applications. Over time, you'll become familiar with JavaScript's syntax, best practices and ecosystem.

### Recommended Resources

* **MDN Web Docs** – The official and most comprehensive JavaScript documentation.
* **JavaScript.info** – A beginner-friendly guide covering JavaScript from fundamentals to advanced topics.
* **freeCodeCamp** – Free interactive JavaScript courses and coding challenges.
* **Codecademy** – Hands-on JavaScript lessons with guided exercises.
* **The Odin Project** – A complete web development curriculum focused on practical projects.
* **LeetCode** – Practice programming and problem-solving with coding challenges.
* **Frontend Mentor** – Build real-world frontend projects from professional designs.
* **GitHub** – Explore open-source JavaScript projects and learn from experienced developers.

Remember that becoming a skilled JavaScript developer is a journey, not a race. Focus on understanding the fundamentals, build projects consistently and don't be afraid to make mistakes. Every bug you solve and every project you complete brings you one step closer to becoming a professional developer.
`;

const CORE_SYNTAX_INTRO =
  "Every programming language has its own syntax—a set of rules that tells the computer how to read and execute your code. Learning JavaScript syntax is like learning the grammar of a new language. Once you understand the building blocks, you'll be able to combine them to create everything from simple scripts to complex web applications.";

type ContentPart =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string };

type ContentBlock = {
  heading?: string;
  parts: ContentPart[];
};

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables allow you to store information that can be used later in your program. Instead of writing the same value repeatedly, you can save it inside a variable and access or update it whenever needed." },
      { type: "p", text: "For example, imagine you're building a user profile. You might store the user's name, age and country in variables." },
      { type: "code", code: `let name = "Alex";\nlet age = 22;\nconst country = "Germany";` },
      { type: "p", text: "Here, let creates a variable whose value can change, while const creates a constant that cannot be reassigned after it has been created." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "JavaScript can store different kinds of information, known as data types." },
      { type: "p", text: "Some of the most common data types include:" },
      {
        type: "ul",
        items: [
          "String – Text",
          "Number – Whole numbers and decimals",
          "Boolean – true or false",
          "Array – A list of values",
          "Object – A collection of related information",
        ],
      },
      { type: "code", code: `let username = "Alex";\nlet score = 95;\nlet isLoggedIn = true;\n\nlet colors = ["Red", "Blue", "Green"];\n\nlet user = {\n  name: "Alex",\n  age: 22\n};` },
      { type: "p", text: "Choosing the correct data type helps organize your data and makes your programs easier to understand." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators allow JavaScript to perform calculations and compare values." },
      { type: "p", text: "For example:" },
      { type: "code", code: `let a = 10;\nlet b = 5;\n\nconsole.log(a + b); // 15\nconsole.log(a - b); // 5\nconsole.log(a * b); // 50\nconsole.log(a / b); // 2` },
      { type: "p", text: "Operators are also used to compare values." },
      { type: "code", code: `let age = 18;\n\nconsole.log(age >= 18); // true\nconsole.log(age < 18); // false` },
      { type: "p", text: "These comparisons become useful when making decisions in your program." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions based on certain conditions." },
      { type: "p", text: "For example, a website may only allow users over 18 to access specific content." },
      { type: "code", code: `let age = 20;\n\nif (age >= 18) {\n  console.log("Access granted.");\n} else {\n  console.log("Access denied.");\n}` },
      { type: "p", text: "The if statement checks whether a condition is true. If it is, one block of code runs; otherwise, another block is executed." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops allow you to repeat code automatically instead of writing the same instructions multiple times." },
      { type: "p", text: "Imagine displaying numbers from 1 to 5." },
      { type: "code", code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}` },
      { type: "p", text: "Without a loop, you would have to write five separate console.log() statements. Loops save time and make your code much cleaner." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions group code into reusable blocks. Instead of writing the same logic multiple times, you create it once and call it whenever you need it." },
      { type: "code", code: `function greet(name) {\n  console.log("Hello " + name + "!");\n}\n\ngreet("Alex");\ngreet("Emma");` },
      { type: "p", text: "Functions make programs easier to organize, maintain and expand as they grow." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "Objects store multiple pieces of related information together." },
      { type: "p", text: "Instead of creating separate variables for a person's name, age and country, you can combine everything into a single object." },
      { type: "code", code: `const user = {\n  name: "Alex",\n  age: 22,\n  country: "Germany"\n};\n\nconsole.log(user.name);` },
      { type: "p", text: "Objects are one of JavaScript's most important features and are used in almost every modern application." },
    ],
  },
  {
    heading: "Arrays",
    parts: [
      { type: "p", text: "Arrays store multiple values inside a single variable." },
      { type: "p", text: "For example, an online shop could use an array to store a list of products." },
      { type: "code", code: `const products = [\n  "Laptop",\n  "Keyboard",\n  "Mouse"\n];\n\nconsole.log(products[0]);` },
      { type: "p", text: "Arrays are commonly used for lists of users, products, messages, tasks and many other types of data." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every JavaScript application is built using these core concepts. Variables store information, data types define what kind of information is stored, operators perform calculations, conditions make decisions, loops repeat tasks, functions organize reusable code, and objects and arrays help structure data." },
      { type: "p", text: "By mastering these fundamentals, you'll have the knowledge needed to build interactive websites and understand more advanced JavaScript concepts such as asynchronous programming, APIs, classes and modern frameworks like React and Next.js." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "JavaScript is much more than just a programming language. Over the years, developers have built thousands of frameworks, libraries and tools that make creating modern applications faster, easier and more efficient. While you can build websites using plain JavaScript, most professional developers rely on these technologies to save time and organize large projects." },
      { type: "p", text: "Before learning a framework, it's important to build a strong understanding of JavaScript itself. Frameworks are built on top of JavaScript, meaning they use the same syntax and core concepts you've already learned. Once you understand the language, picking up new frameworks becomes much easier." },
    ],
  },
  {
    heading: "React",
    parts: [
      { type: "p", text: "React is the world's most popular JavaScript library for building user interfaces. Instead of writing every part of a webpage manually, React allows developers to create reusable components that can be combined to build complete applications." },
      { type: "p", text: "For example, a button, navigation bar or product card can each be created as its own component and reused throughout a website." },
      { type: "p", text: "React is used by companies such as Facebook, Instagram, Netflix and Airbnb because it makes large applications easier to develop and maintain." },
    ],
  },
  {
    heading: "Next.js",
    parts: [
      { type: "p", text: "Next.js is a powerful framework built on top of React. It adds many features that make websites faster, more secure and easier to build." },
      { type: "p", text: "With Next.js, developers can create:" },
      { type: "ul", items: ["Company websites", "Blogs", "Online stores", "Dashboards", "Full-stack web applications"] },
      { type: "p", text: "Next.js also includes features such as routing, server-side rendering, image optimization and API routes, reducing the need for additional tools. It's one of the most popular choices for modern web development." },
    ],
  },
  {
    heading: "Node.js",
    parts: [
      { type: "p", text: "Normally, JavaScript runs inside a web browser. Node.js changes this by allowing JavaScript to run directly on your computer or a server." },
      { type: "p", text: "This means developers can build backend applications using the same language they use for the frontend." },
      { type: "p", text: "Node.js is commonly used for:" },
      { type: "ul", items: ["REST APIs", "Web servers", "Authentication systems", "Real-time chat applications", "Backend services"] },
      { type: "p", text: "Using JavaScript for both the frontend and backend is known as full-stack development." },
    ],
  },
  {
    heading: "Express.js",
    parts: [
      { type: "p", text: "Express.js is a lightweight framework built for Node.js. It simplifies backend development by providing tools to create APIs, manage routes and handle requests from users." },
      { type: "p", text: "Instead of writing hundreds of lines of code to build a server, Express allows developers to create one with just a few lines of code." },
      { type: "p", text: "Many Node.js applications use Express as the foundation of their backend." },
    ],
  },
  {
    heading: "TypeScript",
    parts: [
      { type: "p", text: "TypeScript is an extension of JavaScript developed by Microsoft. It introduces static typing, allowing developers to detect many errors before their code even runs." },
      { type: "p", text: "For example, TypeScript can warn you if you're trying to store text inside a variable that should only contain numbers." },
      { type: "p", text: "Large companies often choose TypeScript because it makes large codebases easier to maintain, improves autocomplete and helps teams avoid common programming mistakes." },
    ],
  },
  {
    heading: "npm",
    parts: [
      { type: "p", text: "As projects grow, developers often need additional packages such as animation libraries, authentication tools or charting frameworks." },
      { type: "p", text: "npm (Node Package Manager) is the world's largest package manager and allows developers to install these packages with a single command." },
      { type: "p", text: "For example:" },
      { type: "code", code: "npm install react" },
      { type: "p", text: "Instead of writing everything from scratch, developers can reuse trusted packages created by the community." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code (VS Code) is one of the most popular code editors for JavaScript development." },
      { type: "p", text: "It provides helpful features such as:" },
      { type: "ul", items: ["Syntax highlighting", "Intelligent autocomplete", "Built-in terminal", "Git integration", "Debugging tools", "Extensions for almost every programming language"] },
      { type: "p", text: "These features help developers write code more efficiently and reduce mistakes while programming." },
    ],
  },
  {
    heading: "Vite",
    parts: [
      { type: "p", text: "Vite is a modern build tool that makes JavaScript development much faster. It starts projects almost instantly and automatically refreshes the browser whenever you save your code." },
      { type: "p", text: "Instead of waiting several seconds after every change, developers see updates immediately, making development smoother and more productive." },
      { type: "p", text: "Many modern React projects now use Vite because of its speed and simplicity." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Modern JavaScript development is built around an ecosystem of powerful frameworks and tools. React helps create interactive user interfaces, Next.js simplifies full-stack web development, Node.js brings JavaScript to the backend, Express.js makes building APIs easier, TypeScript improves code quality, npm provides access to millions of reusable packages, and tools like VS Code and Vite make development faster and more enjoyable." },
      { type: "p", text: "While these technologies are incredibly useful, remember that they all rely on the same foundation: JavaScript. Once you understand the language itself, learning any of these tools becomes much easier and opens the door to building professional websites and applications used by millions of people every day." },
    ],
  },
];

// A tiny prose parser: blank line = new paragraph, "* " = bullet. Keeps
// pasted lesson copy free of any JSX/markup.
// Turns **bold** and *italic* spans inside a line of prose into styled inline elements.
function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*.+?\*\*|\*.+?\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.length > 1 && part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-gray-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
}

// A tiny prose parser: blank line = new paragraph, "* " = bullet, "## "/"### " =
// sub-heading, "---" = divider, **bold**/*italic* = inline emphasis.
function renderProse(raw: string): ReactNode[] {
  const lines = raw.trim().split("\n").map((line) => line.trim());
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={blocks.length} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul
        key={blocks.length}
        className="list-disc pl-5 space-y-1.5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500"
      >
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (line === "---") {
      flushParagraph();
      flushList();
      blocks.push(
        <div
          key={blocks.length}
          className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent"
        />
      );
      continue;
    }

    const heading = line.match(/^#{2,3}\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(
        <h4 key={blocks.length} className="text-base sm:text-lg font-bold tracking-tight text-green-900">
          {renderInline(heading[1])}
        </h4>
      );
      continue;
    }

    const bullet = line.match(/^[*-]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

// Renders a list of ContentBlocks (used by Core Syntax and Popular
// Frameworks & Tools) — each block gets an optional heading followed by its
// paragraph/list/code parts in order, so code snippets stay interleaved
// with the prose that introduces them.
function renderBlocks(blocks: ContentBlock[]): ReactNode {
  return (
    <div className="space-y-8">
      {blocks.map((block, bi) => (
        <div key={bi}>
          {block.heading && (
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-green-900 mb-3">
              {block.heading}
            </h3>
          )}
          <div className="space-y-3">
            {block.parts.map((part, pi) => {
              if (part.type === "p") {
                return (
                  <p key={pi} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                    {part.text}
                  </p>
                );
              }
              if (part.type === "ul") {
                return (
                  <ul
                    key={pi}
                    className="list-disc pl-5 space-y-1.5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500"
                  >
                    {part.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <pre
                  key={pi}
                  className="rounded-2xl bg-green-950 text-green-100 text-xs sm:text-sm leading-6 p-4 sm:p-5 overflow-x-auto shadow-lg"
                >
                  <code>{part.code}</code>
                </pre>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const SECTIONS = [
  { id: "quick-facts", title: "Quick Facts" },
  { id: "what-is", title: `What is ${NAME}` },
  { id: "why-learn", title: `Why Learn ${NAME}` },
  { id: "where-used", title: "Where It's Used" },
  { id: "core-syntax", title: "Core Syntax" },
  { id: "frameworks-tools", title: "Popular Frameworks & Tools" },
  { id: "learning-roadmap", title: "Learning Roadmap", star: true },
  { id: "career", title: "Career Opportunities" },
  { id: "resources", title: "Resources" },
];

function DetailSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="relative scroll-mt-36">
      <div className="flex items-start gap-5 sm:gap-6">
        <span className="hidden sm:flex shrink-0 items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl border border-green-200 bg-green-50 text-green-800 font-black text-base lg:text-lg">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black">
            {title}
          </h2>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function JavaScript() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - sectionCenter;
          setParallax(distance * 0.05);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);

    return () => {
      heroObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — identical language to the Coding page ================= */}

      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #ecfdf5 16%, #bbf7d0 42%, #d1fae5 66%, #f0fdf4 85%, #ffffff 100%)",
        }}
      />

      <div
        className="absolute inset-0 -z-40 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#14532d 1px,transparent 1px),
            linear-gradient(to bottom,#14532d 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-300/40 to-transparent blur-[1px]" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-green-900 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.3] animate-pulse" />
        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-600 blur-[120px] lg:blur-[180px] opacity-[0.3] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-green-700 blur-[160px] opacity-[0.28] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-green-800 to-emerald-800 blur-[200px] opacity-[0.24] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500 blur-[180px] opacity-[0.18] -z-30 animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        <div className="hidden md:block absolute -right-40 top-40 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-green-400/50" />
        <div className="hidden lg:block absolute left-16 bottom-32 w-[380px] h-[380px] rounded-full border border-green-400/60" />
        <div className="hidden lg:block absolute right-1/4 top-16 w-[240px] h-[240px] rounded-full border border-emerald-300/70" />
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />
        <div className="hidden lg:block absolute bottom-32 left-1/5 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />
        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-green-100/70 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />
      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-32 left-10 w-3 h-3 rounded-full bg-green-800 shadow-xl animate-bounce" />
      <div className="hidden sm:block absolute top-2/3 right-16 w-2 h-2 rounded-full bg-black/40" />
      <div className="hidden lg:block absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-green-800 animate-pulse" />
      <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-emerald-600 animate-ping" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Top / Bottom Fade */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-24 sm:h-32 lg:h-44 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 z-10 w-full h-24 sm:h-32 lg:h-44 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <Link
          href="/coding/programming-languages"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/60 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-lg transition-all duration-300 hover:-translate-x-0.5 hover:shadow-xl"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Programming Languages
        </Link>

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`mt-10 sm:mt-14 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="text-center lg:text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-green-900 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />
              <span className="relative">Coding · Programming Language</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                {NAME}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg font-medium text-green-800">
              {TAGLINE}
            </p>

            <p className="mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 max-w-xl mx-auto lg:mx-0">
              {SUMMARY}
            </p>

          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">

            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full bg-green-800 blur-[100px] sm:blur-[150px] opacity-50 animate-pulse" />

            <img
              src={LOGO}
              alt={`${NAME} logo`}
              className="relative w-[220px] sm:w-[300px] lg:w-[380px] aspect-square rounded-[32px] sm:rounded-[40px] object-cover shadow-[0_35px_80px_rgba(20,83,45,0.25)] transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Table of Contents ============ */}

        <div className="sticky top-20 sm:top-24 z-30 mt-10 sm:mt-14 flex justify-center">
          <nav className="w-full max-w-4xl overflow-x-auto rounded-full border border-white/70 bg-white/70 backdrop-blur-xl shadow-lg px-2 py-2">
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-max mx-auto">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-600 transition-all duration-300 hover:bg-green-50 hover:text-green-900"
                >
                  {section.title}
                  
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ============ Sections ============ */}

        <div className="relative mt-20 sm:mt-24 lg:mt-28 flex flex-col gap-20 sm:gap-24">

          {SECTIONS.map((section, i) => (
            <div key={section.id}>
              {i > 0 && (
                <div className="mb-20 sm:mb-24 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              )}

              <DetailSection
                id={section.id}
                index={i + 1}
                title={section.star ? `${section.title} (20 Levels)` : section.title}
              >
                {section.id === "quick-facts" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl">
                    {[
                      { label: "First Released", value: "1995" },
                      { label: "Created By", value: "Brendan Eich" },
                      { label: "Latest Version", value: "ECMAScript 2025" },
                      { label: "Typing", value: "Dynamic, Weak" },
                      { label: "Paradigm", value: "Multi-Paradigm (Object-Oriented, Functional, Event-Driven)" },
                      { label: "Primary Use", value: "Frontend & Full-Stack Web Development" },
                      { label: "Runs On", value: "Web Browsers & Node.js" },
                      { label: "Compiled To", value: "Machine Code (via JavaScript Engines like V8)" },
                      { label: "Difficulty", value: "⭐⭐☆☆☆ Beginner-Friendly" },
                      { label: "Open Source", value: "Yes (ECMAScript Standard)" },
                      { label: "Popular Frameworks", value: "React, Next.js, Vue, Angular, Express.js" },
                      { label: "Used By", value: "Google, Netflix, Meta, Amazon, Microsoft, Airbnb" },
                    ].map((fact) => (
                      <div key={fact.label}>
                        <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                          {fact.label}
                        </div>
                        <div
                          className={`mt-1.5 text-sm sm:text-base ${
                            fact.value.startsWith("[") ? "italic text-gray-400" : "text-gray-700"
                          }`}
                        >
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.id === "learning-roadmap" ? (
                  <div className="max-w-3xl space-y-10">
                    {JS_ROADMAP.map((lvl) => {
                      const colors = ROADMAP_COLORS[lvl.color];
                      return (
                        <div key={lvl.level} className={`border-l-2 ${colors.border} pl-5 sm:pl-6`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                            <span className={`text-xs font-semibold ${colors.text}`}>
                              Lv. {String(lvl.level).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-black">
                            {lvl.title}
                          </h3>
                          <p className="mt-2 text-sm sm:text-base text-gray-500">
                            <span className="font-semibold text-gray-700">Goal:</span> {lvl.goal}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {lvl.learn.map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-800"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          {lvl.project && (
                            <p className="mt-3 text-sm sm:text-base text-gray-500">
                              <span className="font-semibold text-green-800">Mini Project:</span> {lvl.project}
                            </p>
                          )}
                          {lvl.finalProjects && (
                            <div className="mt-4">
                              <span className="text-sm font-semibold text-green-800">Final Projects</span>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {lvl.finalProjects.map((p) => (
                                  <span
                                    key={p}
                                    className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-800"
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : section.id === "what-is" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(WHAT_IS)}</div>
                ) : section.id === "why-learn" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(WHY_LEARN)}</div>
                ) : section.id === "where-used" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(WHERE_USED)}</div>
                ) : section.id === "core-syntax" ? (
                  <div className="max-w-2xl">
                    <p className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 mb-8">
                      {CORE_SYNTAX_INTRO}
                    </p>
                    {renderBlocks(CORE_SYNTAX_BLOCKS)}
                  </div>
                ) : section.id === "frameworks-tools" ? (
                  <div className="max-w-2xl">{renderBlocks(FRAMEWORKS_BLOCKS)}</div>
                ) : section.id === "career" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(CAREER)}</div>
                ) : section.id === "resources" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(RESOURCES)}</div>
                ) : (
                  <p className="text-sm sm:text-base italic leading-6 sm:leading-7 text-gray-400 max-w-2xl">
                    {PLACEHOLDER}
                  </p>
                )}
              </DetailSection>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
