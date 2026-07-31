"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for TypeScript — its own dedicated file/route
// rather than a shared template, matching how every other Coding sub-page
// works. Real per-language copy (what it is, why to learn it, syntax,
// roadmap, etc.) hasn't been written yet, so every prose section falls back
// to PLACEHOLDER.

const NAME = "TypeScript";
const TAGLINE = "JavaScript, with guardrails.";
const LOGO = "/type-script-logo-green.png";
const SUMMARY =
  "Take your JavaScript skills to the next level with TypeScript. By adding static typing and powerful developer tools, TypeScript helps you build larger, more reliable and easier-to-maintain applications.";

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

const WHAT_IS_INTRO = `
TypeScript is a programming language developed by Microsoft that builds directly on top of JavaScript. Instead of replacing JavaScript, TypeScript extends it by adding new features that make code easier to write, understand and maintain. Every valid JavaScript program is also valid TypeScript, which means you can gradually learn and adopt the language without starting from scratch.

The biggest difference between JavaScript and TypeScript is **static typing**. In JavaScript, variables can change from one type to another without warning. While this makes JavaScript flexible, it can also lead to bugs that are difficult to find in larger projects.

For example, imagine you're storing a user's age.
`;

const WHAT_IS_JS_CODE = `let age = 25;\n\nage = "twenty-five";`;

const WHAT_IS_MIDDLE = `
JavaScript allows this without showing an error.

With TypeScript, you can define exactly what kind of value a variable should store.
`;

const WHAT_IS_TS_CODE = `let age: number = 25;\n\nage = "twenty-five";`;

const WHAT_IS_OUTRO = `
Instead of allowing the mistake, TypeScript immediately warns you that a string cannot be assigned to a variable that should only contain numbers. Finding these problems while writing code saves developers time and prevents many bugs before an application is even launched.

TypeScript code does not run directly inside a browser. Instead, it is **compiled into standard JavaScript**. After compilation, browsers and Node.js execute the generated JavaScript just like any other web application. This means users never need to install TypeScript themselves.

Because TypeScript is fully compatible with JavaScript, developers can continue using the same libraries and frameworks they already know. Popular technologies such as React, Next.js, Angular and Node.js all support TypeScript, making it easy to integrate into existing projects.

Today, TypeScript has become one of the most popular languages for professional web development. From small startups to some of the world's largest technology companies, developers use TypeScript to build applications that are easier to scale, debug and maintain over time.
`;

const WHY_LEARN = `
As software projects grow, managing thousands of lines of JavaScript code becomes increasingly difficult. Small mistakes such as using the wrong data type, misspelling a property name or calling a function incorrectly can lead to bugs that are hard to detect and expensive to fix. TypeScript was created to solve many of these problems before your code even runs.

One of TypeScript's greatest advantages is its powerful type system. By allowing developers to describe exactly what kind of data their program expects, TypeScript can detect many common mistakes during development. Instead of discovering errors after deploying an application, developers receive helpful feedback directly inside their code editor.

TypeScript also provides an excellent development experience. Modern editors such as Visual Studio Code can use TypeScript's type information to offer intelligent autocomplete, better navigation, inline documentation and more accurate error messages. These features make programming faster, more productive and much less frustrating.

Another major advantage is scalability. While JavaScript works perfectly for small projects, large applications with hundreds of files often become difficult to manage. TypeScript helps teams organize their code, define clear structures and maintain consistency across an entire codebase. This is one of the main reasons why many professional companies have adopted TypeScript for large-scale development.

Learning TypeScript does not mean abandoning JavaScript. Instead, it builds directly on the knowledge you already have. Once you understand JavaScript fundamentals, learning TypeScript becomes a natural next step that introduces safer coding practices without changing how the language fundamentally works.

Whether you're building modern websites, full-stack applications or enterprise software, TypeScript is one of the most valuable skills you can add to your web development toolkit. It combines JavaScript's flexibility with additional safety and structure, making it the preferred choice for many professional developers.
`;

const WHERE_USED = `
TypeScript is used across many areas of modern software development, particularly in projects where reliability, maintainability and scalability are important. Because it compiles into standard JavaScript, it can be used almost anywhere JavaScript is used while providing additional tools that make development easier.

One of the most common uses for TypeScript is **frontend web development**. Developers use it alongside frameworks such as React, Next.js, Angular and Vue to build interactive websites and complex web applications. TypeScript helps keep these projects organized by ensuring components, functions and data structures behave as expected.

TypeScript is also widely used for **backend development** with Node.js. Developers use frameworks such as NestJS and Express to create APIs, authentication systems, databases and cloud services. Static typing becomes especially valuable on the backend, where applications often process large amounts of data and communicate with many different systems.

Beyond traditional web development, TypeScript is used for **mobile applications**, desktop software, browser extensions, cloud platforms and serverless functions. Because it shares the same ecosystem as JavaScript, developers can build complete applications using a single language across multiple platforms.

Many of today's most popular open-source projects are written entirely or partially in TypeScript. Companies such as Microsoft, Google, OpenAI, Shopify and Slack use it to improve code quality, reduce bugs and simplify collaboration between large development teams.

As TypeScript continues to grow in popularity, it has become one of the standard languages for professional web development. Whether you're building a personal portfolio, a startup product or a large enterprise application, TypeScript provides the tools needed to write cleaner, safer and more maintainable code.
`;

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

type ContentPart =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string };

type ContentBlock = {
  heading?: string;
  parts: ContentPart[];
};

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

const CORE_SYNTAX_INTRO =
  "Every programming language has its own syntax—a set of rules that defines how code is written and understood by the computer. Since TypeScript is built on top of JavaScript, much of its syntax will look familiar if you already know JavaScript. However, TypeScript introduces additional features that make your code safer, more predictable and easier to maintain.\n\nThe biggest addition is static typing. By allowing developers to define exactly what type of data a variable, function or object should use, TypeScript can detect many mistakes while you're writing code instead of after your application has already been deployed.\n\nLet's explore the core syntax that every TypeScript developer should understand.";

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables allow you to store information that can be accessed and updated throughout your program. Like JavaScript, TypeScript uses let and const to declare variables, but it also allows you to specify the type of data each variable should store." },
      { type: "p", text: "For example, you may want to store a person's name, age and whether they are logged in." },
      { type: "code", code: `let name: string = "Alex";\nlet age: number = 22;\nlet isLoggedIn: boolean = true;\n\nconst country: string = "Germany";` },
      { type: "p", text: "Here, let creates variables whose values can change, while const creates a constant that cannot be reassigned. The type annotations (string, number and boolean) tell TypeScript exactly what kind of data each variable should contain." },
      { type: "p", text: "If you accidentally assign the wrong type, TypeScript immediately reports an error before your code runs." },
      { type: "code", code: `let age: number = 22;\n\nage = "Twenty-Two";` },
      { type: "p", text: "This helps prevent bugs that might otherwise appear later during development." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "Just like JavaScript, TypeScript supports many different data types. The difference is that you can explicitly define which type a variable should contain." },
      { type: "p", text: "The most common data types include:" },
      { type: "ul", items: ["string – Text", "number – Integers and decimal numbers", "boolean – true or false", "null", "undefined", "array – Lists of values", "object – Collections of related data", "any – Accepts any value (generally avoided)"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `let username: string = "Alex";\nlet score: number = 95;\nlet premiumUser: boolean = true;\n\nlet colors: string[] = [\n  "Red",\n  "Blue",\n  "Green"\n];` },
      { type: "p", text: "Using the correct data type makes your programs easier to understand and allows TypeScript to detect mistakes before they become problems." },
    ],
  },
  {
    heading: "Type Annotations",
    parts: [
      { type: "p", text: "One of TypeScript's most important features is type annotations." },
      { type: "p", text: "A type annotation tells TypeScript exactly what kind of value should be stored inside a variable or passed into a function." },
      { type: "code", code: `let price: number = 99.99;\n\nlet productName: string = "Laptop";\n\nlet available: boolean = true;` },
      { type: "p", text: "Without type annotations, developers may accidentally assign incorrect values." },
      { type: "code", code: `let price: number = 99.99;\n\nprice = "Cheap";` },
      { type: "p", text: "TypeScript immediately warns you that a string cannot be assigned to a variable expecting a number." },
      { type: "p", text: "This extra safety is one of the main reasons companies choose TypeScript for larger applications." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions group related code together into reusable blocks." },
      { type: "p", text: "TypeScript allows you to define not only the types of parameters but also the type of value returned by the function." },
      { type: "code", code: `function greet(name: string): string {\n  return \`Hello \${name}!\`;\n}\n\nconsole.log(greet("Alex"));` },
      { type: "p", text: "Here: name must be a string. The function must return a string." },
      { type: "p", text: "If you accidentally return a different type, TypeScript immediately reports the mistake." },
      { type: "code", code: `function square(number: number): number {\n  return number * number;\n}\n\nconsole.log(square(5));` },
      { type: "p", text: "Typing functions makes your code much easier to understand, especially in large projects where many developers work together." },
    ],
  },
  {
    heading: "Interfaces",
    parts: [
      { type: "p", text: "Interfaces are one of TypeScript's most powerful features." },
      { type: "p", text: "An interface defines the structure an object must follow. Instead of describing a single object, it acts like a blueprint for many similar objects." },
      { type: "code", code: `interface User {\n  name: string;\n  age: number;\n  country: string;\n}` },
      { type: "p", text: "Now every user object must follow this structure." },
      { type: "code", code: `const user: User = {\n  name: "Alex",\n  age: 22,\n  country: "Germany"\n};` },
      { type: "p", text: "If a required property is missing or has the wrong type, TypeScript immediately displays an error." },
      { type: "p", text: "Interfaces help keep large applications consistent and make code easier to maintain." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "Objects allow you to group related information together." },
      { type: "p", text: "For example, instead of creating separate variables for a person's name, email and age, you can store everything inside a single object." },
      { type: "code", code: `const user = {\n  name: "Alex",\n  age: 22,\n  email: "alex@example.com"\n};\n\nconsole.log(user.name);` },
      { type: "p", text: "Objects are used throughout modern web development to represent users, products, orders, settings and almost every other type of data." },
      { type: "p", text: "When combined with interfaces, objects become even more reliable because TypeScript ensures they always follow the correct structure." },
    ],
  },
  {
    heading: "Arrays",
    parts: [
      { type: "p", text: "Arrays store multiple values inside a single variable." },
      { type: "p", text: "Instead of creating dozens of variables for a list of products or users, an array keeps everything organized in one place." },
      { type: "code", code: `const products: string[] = [\n  "Laptop",\n  "Keyboard",\n  "Mouse"\n];` },
      { type: "p", text: "You can access items using their position inside the array." },
      { type: "code", code: `console.log(products[0]);` },
      { type: "p", text: "Arrays also provide many useful methods for working with data." },
      { type: "code", code: `const numbers: number[] = [10, 20, 30];\n\nnumbers.push(40);` },
      { type: "p", text: "Arrays are commonly used for shopping carts, messages, tasks, users and many other collections of information." },
    ],
  },
  {
    heading: "Classes",
    parts: [
      { type: "p", text: "Classes allow developers to create reusable templates for objects." },
      { type: "p", text: "Think of a class as a blueprint. It describes what information an object should contain and what actions it can perform." },
      { type: "code", code: `class User {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  greet() {\n    console.log(\`Hello \${this.name}\`);\n  }\n}\n\nconst alex = new User("Alex");\n\nalex.greet();` },
      { type: "p", text: "Classes are widely used in larger applications because they help organize code into logical, reusable components." },
    ],
  },
  {
    heading: "Generics",
    parts: [
      { type: "p", text: "Generics allow you to write reusable code that works with many different data types while still keeping type safety." },
      { type: "p", text: "Instead of writing multiple versions of the same function, you can create one flexible solution." },
      { type: "code", code: `function getFirstItem<T>(items: T[]): T {\n  return items[0];\n}\n\nconst number = getFirstItem([1, 2, 3]);\n\nconst name = getFirstItem([\n  "Alex",\n  "Emma"\n]);` },
      { type: "p", text: "The <T> represents a placeholder type that TypeScript automatically replaces with the correct type when the function is called." },
      { type: "p", text: "Generics are heavily used in professional libraries and frameworks because they create flexible, reusable and type-safe code." },
    ],
  },
  {
    heading: "Enums",
    parts: [
      { type: "p", text: "Enums allow developers to create a fixed set of named values." },
      { type: "p", text: "For example, an application might only allow three possible user roles." },
      { type: "code", code: `enum Role {\n  Admin,\n  User,\n  Guest\n}\n\nlet currentRole = Role.Admin;` },
      { type: "p", text: "Enums make code easier to read than using random numbers or strings throughout your application." },
      { type: "p", text: "They are commonly used for statuses, user roles, permissions and predefined options." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every TypeScript application is built upon these core concepts. Variables store information, data types define what kind of data can be stored, type annotations improve safety, functions organize reusable logic, interfaces define clear data structures, objects and arrays organize information, classes create reusable blueprints, generics make code flexible without sacrificing type safety and enums provide clear predefined values." },
      { type: "p", text: "Together, these features make TypeScript one of the most reliable and maintainable programming languages for modern software development. By mastering these fundamentals, you'll be well prepared to build scalable web applications and confidently move on to advanced topics such as asynchronous programming, APIs, React, Next.js and enterprise-level development." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "TypeScript is designed to work seamlessly with the JavaScript ecosystem. Rather than replacing existing tools and frameworks, it enhances them by adding static typing and improved developer tooling. This means you can use TypeScript with many of the same technologies that JavaScript developers already rely on while benefiting from safer, more maintainable code." },
      { type: "p", text: "Although TypeScript itself is a programming language, most developers use it together with frameworks, libraries and tools that help them build modern websites, web applications and backend services more efficiently." },
      { type: "p", text: "Let's explore some of the most popular technologies used alongside TypeScript." },
    ],
  },
  {
    heading: "React",
    parts: [
      { type: "p", text: "React is the world's most popular library for building modern user interfaces. When combined with TypeScript, developers can create reusable components that are easier to understand, maintain and debug." },
      { type: "p", text: "TypeScript helps React developers define the exact structure of component properties (props), state and function parameters, reducing common programming mistakes." },
      { type: "p", text: "For example, a React component can specify exactly what information it expects to receive." },
      { type: "code", code: `interface ButtonProps {\n  title: string;\n}\n\nfunction Button({ title }: ButtonProps) {\n  return <button>{title}</button>;\n}` },
      { type: "p", text: "If another developer tries to pass the wrong type of data, TypeScript immediately reports the problem." },
      { type: "p", text: "Because of these advantages, React and TypeScript have become one of the most popular combinations in modern frontend development." },
    ],
  },
  {
    heading: "Next.js",
    parts: [
      { type: "p", text: "Next.js is a full-stack React framework used to build fast, scalable and production-ready web applications." },
      { type: "p", text: "It includes many powerful features out of the box, including:" },
      { type: "ul", items: ["File-based Routing", "Server-Side Rendering (SSR)", "Static Site Generation (SSG)", "API Routes", "Image Optimization", "Authentication Support"] },
      { type: "p", text: "TypeScript is fully supported by Next.js and can even be configured automatically when creating a new project." },
      { type: "p", text: "The combination of Next.js and TypeScript is widely used for company websites, SaaS platforms, dashboards, e-commerce stores and enterprise applications." },
    ],
  },
  {
    heading: "Angular",
    parts: [
      { type: "p", text: "Angular is a frontend framework developed by Google and is built with TypeScript as its primary language." },
      { type: "p", text: "Unlike many other frameworks where TypeScript is optional, Angular projects are designed around TypeScript from the beginning. This allows developers to build large, structured applications with strong typing, dependency injection and modular architecture." },
      { type: "p", text: "Angular is commonly used for:" },
      { type: "ul", items: ["Enterprise applications", "Internal business tools", "Banking platforms", "Healthcare software", "Government systems"] },
      { type: "p", text: "Its strong structure makes it especially popular among large development teams." },
    ],
  },
  {
    heading: "Node.js",
    parts: [
      { type: "p", text: "TypeScript isn't limited to frontend development. Using Node.js, developers can run TypeScript applications on servers and build complete backend systems." },
      { type: "p", text: "Typical backend applications include:" },
      { type: "ul", items: ["REST APIs", "Authentication systems", "Database services", "Cloud applications", "Real-time chat servers"] },
      { type: "p", text: "Before running a TypeScript application with Node.js, the TypeScript compiler converts the code into standard JavaScript, which Node.js then executes." },
      { type: "p", text: "This allows developers to enjoy all of TypeScript's features while still running on the JavaScript runtime." },
    ],
  },
  {
    heading: "NestJS",
    parts: [
      { type: "p", text: "NestJS is one of the most popular backend frameworks built specifically for TypeScript." },
      { type: "p", text: "Inspired by Angular's architecture, NestJS provides a clean structure for building scalable server-side applications." },
      { type: "p", text: "It includes features such as:" },
      { type: "ul", items: ["Dependency Injection", "Controllers", "Services", "Modules", "Authentication", "Validation", "Database Integration"] },
      { type: "p", text: "NestJS is widely used for professional APIs, SaaS platforms and enterprise backend systems because it encourages clean, organized code." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code (VS Code) is one of the best code editors for TypeScript development." },
      { type: "p", text: "Because both VS Code and TypeScript are developed by Microsoft, they work exceptionally well together." },
      { type: "p", text: "Some of its most useful features include:" },
      { type: "ul", items: ["Intelligent Autocomplete", "Type Checking", "Error Detection", "Built-in Debugging", "Git Integration", "Refactoring Tools", "Extensions"] },
      { type: "p", text: "These features allow developers to write code faster while reducing mistakes before the application is even executed." },
    ],
  },
  {
    heading: "npm",
    parts: [
      { type: "p", text: "Modern applications rarely consist only of code written by a single developer. Instead, projects often rely on thousands of reusable packages created by the community." },
      { type: "p", text: "npm (Node Package Manager) allows developers to install and manage these packages with a single command." },
      { type: "p", text: "For example:" },
      { type: "code", code: "npm install typescript" },
      { type: "p", text: "Or install React together with its TypeScript definitions:" },
      { type: "code", code: "npm install react\nnpm install --save-dev @types/react" },
      { type: "p", text: "Using npm saves developers countless hours by allowing them to reuse high-quality open-source libraries instead of building everything from scratch." },
    ],
  },
  {
    heading: "TypeScript Compiler (tsc)",
    parts: [
      { type: "p", text: "One of the most important tools in every TypeScript project is the TypeScript Compiler, commonly called tsc." },
      { type: "p", text: "Unlike JavaScript, browsers cannot execute TypeScript directly." },
      { type: "p", text: "Instead, the compiler converts TypeScript code into standard JavaScript." },
      { type: "p", text: "For example:" },
      { type: "code", code: "tsc app.ts" },
      { type: "p", text: "This command generates a JavaScript file that can run in any browser or Node.js environment." },
      { type: "p", text: "The compiler also checks for type errors before creating the final JavaScript output, making it an essential part of every TypeScript workflow." },
    ],
  },
  {
    heading: "ESLint & Prettier",
    parts: [
      { type: "p", text: "Writing code is only part of software development. Keeping code clean, readable and consistent is just as important, especially when working in teams." },
      { type: "p", text: "ESLint analyzes your code and warns about potential mistakes, unused variables and coding issues." },
      { type: "p", text: "Prettier automatically formats your code according to consistent style rules." },
      { type: "p", text: "Together, these tools help developers write cleaner, more professional code while reducing formatting debates within teams." },
    ],
  },
  {
    heading: "Vite",
    parts: [
      { type: "p", text: "Vite is one of the fastest modern build tools for frontend development and provides first-class support for TypeScript." },
      { type: "p", text: "When working on a project, Vite instantly starts a development server and updates your application every time you save a file." },
      { type: "p", text: "Instead of waiting several seconds for a project to rebuild, developers see changes almost immediately." },
      { type: "p", text: "Vite is widely used with React, Vue and other modern frontend frameworks because it offers excellent performance and a simple developer experience." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "TypeScript is much more than a programming language—it is part of a powerful ecosystem used to build modern software. Frameworks like React, Next.js, Angular and NestJS help developers create professional frontend and backend applications, while tools such as Visual Studio Code, npm, ESLint, Prettier, Vite and the TypeScript Compiler improve productivity, code quality and maintainability." },
      { type: "p", text: "Although these technologies make development faster and more efficient, they all build upon the same foundation: TypeScript and JavaScript. By first mastering the language itself and then learning these frameworks and tools, you'll be well prepared to create scalable, reliable and production-ready applications used by millions of people around the world." },
    ],
  },
];

const TS_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "JavaScript Fundamentals",
    goal: "Build a solid JavaScript foundation before learning TypeScript.",
    learn: ["JavaScript Variables", "Data Types", "Functions", "Objects & Arrays", "Loops & Conditions", "ES6 Features", "Modules"],
    project: "Convert a JavaScript application to TypeScript.",
  },
  {
    level: 2,
    color: "green",
    title: "Getting Started with TypeScript",
    goal: "Set up TypeScript and understand how it works.",
    learn: ["What is TypeScript?", "Installing TypeScript", "TypeScript Compiler (tsc)", "tsconfig.json", "Running TypeScript", "Compiling to JavaScript"],
    project: "Hello TypeScript",
  },
  {
    level: 3,
    color: "green",
    title: "Types & Variables",
    goal: "Learn how TypeScript handles data safely.",
    learn: ["Primitive Types", "Type Annotations", "Type Inference", "Union Types", "Literal Types"],
    project: "Student Information System",
  },
  {
    level: 4,
    color: "green",
    title: "Functions",
    goal: "Create type-safe reusable code.",
    learn: ["Function Parameters", "Return Types", "Optional Parameters", "Default Parameters", "Arrow Functions"],
    project: "Calculator",
  },
  {
    level: 5,
    color: "green",
    title: "Objects & Interfaces",
    goal: "Define structured data.",
    learn: ["Object Types", "Interfaces", "Optional Properties", "Readonly Properties", "Nested Objects"],
    project: "User Profile System",
  },
  {
    level: 6,
    color: "green",
    title: "Arrays & Tuples",
    goal: "Organize collections of data.",
    learn: ["Typed Arrays", "Array Methods", "Tuples", "Readonly Arrays"],
    project: "Product Catalog",
  },
  {
    level: 7,
    color: "green",
    title: "Enums & Type Aliases",
    goal: "Create reusable custom types.",
    learn: ["Enums", "String Enums", "Numeric Enums", "Type Aliases", "Combining Types"],
    project: "Order Status Tracker",
  },
  {
    level: 8,
    color: "green",
    title: "Classes",
    goal: "Build reusable object-oriented applications.",
    learn: ["Classes", "Constructors", "Access Modifiers", "Methods", "Properties"],
    project: "Library System",
  },
  {
    level: 9,
    color: "yellow",
    title: "Advanced Object-Oriented Programming",
    goal: "Master professional object-oriented development.",
    learn: ["Inheritance", "Abstract Classes", "Interfaces", "Encapsulation", "Polymorphism"],
    project: "Employee Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Generics",
    goal: "Write flexible and reusable code.",
    learn: ["Generic Functions", "Generic Interfaces", "Generic Classes", "Constraints", "Utility Types"],
    project: "Reusable Data Manager",
  },
  {
    level: 11,
    color: "yellow",
    title: "Modules",
    goal: "Organize large applications.",
    learn: ["import", "export", "Namespaces", "Project Structure"],
    project: "Multi-Module Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "Error Handling",
    goal: "Build reliable applications.",
    learn: ["try", "catch", "Error Objects", "Custom Errors", "Debugging"],
    project: "Form Validation",
  },
  {
    level: 13,
    color: "yellow",
    title: "Asynchronous TypeScript",
    goal: "Handle asynchronous operations safely.",
    learn: ["Promises", "async / await", "Fetch API", "JSON", "Typed API Responses"],
    project: "Weather Dashboard",
  },
  {
    level: 14,
    color: "yellow",
    title: "Working with APIs",
    goal: "Build applications that communicate with external services.",
    learn: ["REST APIs", "HTTP Requests", "Authentication", "API Models", "Response Types"],
    project: "Movie Database",
  },
  {
    level: 15,
    color: "orange",
    title: "React with TypeScript",
    goal: "Build type-safe React applications.",
    learn: ["Components", "Props", "State", "Hooks", "Event Types"],
    project: "Task Manager",
  },
  {
    level: 16,
    color: "orange",
    title: "Next.js with TypeScript",
    goal: "Build modern full-stack applications.",
    learn: ["App Router", "Server Components", "Client Components", "Routing", "API Routes"],
    project: "Personal Portfolio",
  },
  {
    level: 17,
    color: "orange",
    title: "Backend Development",
    goal: "Create scalable backend applications.",
    learn: ["Node.js", "Express", "NestJS", "Databases", "Authentication"],
    project: "REST API",
  },
  {
    level: 18,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "Jest", "Vitest", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 19,
    color: "red",
    title: "Professional TypeScript",
    goal: "Write clean, scalable production code.",
    learn: ["Clean Code", "SOLID Principles", "Design Patterns", "Project Architecture", "Code Reviews"],
    project: "Enterprise Dashboard",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering TypeScript",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "CI/CD", "Deployment", "Team Collaboration"],
    finalProjects: ["🌐 Full-Stack SaaS Application", "🛒 E-Commerce Platform", "📊 Analytics Dashboard", "💬 Real-Time Chat Application", "📋 Project Management Tool", "📱 Full-Stack Social Media App", "☁️ Cloud-Based API with Authentication"],
  },
];

const CAREER = `
TypeScript has become one of the most valuable programming languages in modern software development. As more companies build large and complex applications, the demand for developers who can write clean, scalable and maintainable code continues to grow. Since TypeScript is built on top of JavaScript, it opens the door to many of the same career opportunities while providing an additional skill that is highly valued by employers.

Many developers begin their careers as **Frontend Developers**, building modern websites and web applications using React, Next.js or Angular. TypeScript helps these developers write safer code, improve collaboration with teammates and reduce bugs in large applications.

TypeScript is also widely used for **Backend Development** with technologies such as Node.js and NestJS. Backend developers create APIs, authentication systems, databases and cloud services that power modern applications. Strong typing becomes especially valuable when working with large amounts of data and complex business logic.

Because TypeScript can be used across both frontend and backend development, it is an excellent choice for **Full-Stack Developers**. Full-stack developers build complete applications from the user interface to the server and database, making them some of the most versatile and in-demand professionals in the software industry.

Beyond web development, TypeScript is used in desktop applications, cloud platforms, enterprise software, browser extensions and mobile applications. Its growing popularity has made it a standard choice for many companies building long-term software projects.

As your skills continue to grow, you may pursue roles such as:

* Frontend Developer
* Full-Stack Developer
* Backend Developer
* React Developer
* Next.js Developer
* Node.js Developer
* TypeScript Developer
* Software Engineer
* Technical Lead
* Solutions Architect

Learning TypeScript is also an excellent investment for your future. Since it builds directly on JavaScript, it strengthens your understanding of modern software development while preparing you to work with today's most popular frameworks and technologies. Whether you want to join a startup, work for a global technology company or build your own products, TypeScript provides the skills needed to create professional, scalable applications.
`;

const RESOURCES = `
Learning TypeScript is a journey that builds upon your JavaScript knowledge. While understanding the language's syntax and type system is important, the best way to improve is by writing code, building projects and solving real-world problems. The more you practice, the more natural TypeScript will become.

One of TypeScript's greatest strengths is its excellent documentation and active community. Because the language is developed and maintained by Microsoft, it is well documented and continuously improved. In addition, thousands of tutorials, courses and open-source projects are available to help developers at every skill level.

As you continue learning, focus on applying TypeScript in real projects rather than only reading about it. Try converting JavaScript applications into TypeScript, create reusable interfaces, build React applications with typed components and experiment with APIs. These hands-on experiences will help you understand not only how TypeScript works, but also why it has become the preferred choice for many professional developers.

Remember that TypeScript is designed to help you write better JavaScript. Don't worry if the additional syntax feels unfamiliar at first. As you gain experience, features such as interfaces, generics and strong typing will become valuable tools that make your applications easier to build, maintain and scale.

### Recommended Resources

* **TypeScript Documentation** – The official documentation maintained by Microsoft, covering everything from beginner concepts to advanced features.
* **TypeScript Handbook** – A comprehensive guide that explains the language step by step with practical examples.
* **MDN Web Docs** – Learn the JavaScript concepts that TypeScript builds upon.
* **freeCodeCamp** – Interactive tutorials and projects covering both JavaScript and TypeScript.
* **The Odin Project** – A project-based web development curriculum that includes modern JavaScript and TypeScript workflows.
* **Total TypeScript** – One of the most popular learning platforms dedicated entirely to TypeScript.
* **GitHub** – Explore open-source TypeScript projects and learn from real-world code written by experienced developers.
* **LeetCode** – Improve your programming and problem-solving skills by solving coding challenges using TypeScript.

Becoming confident with TypeScript takes time, but every project you build and every problem you solve will strengthen your understanding. Focus on mastering the fundamentals, write code consistently and challenge yourself with increasingly complex applications. With patience and practice, you'll develop the skills needed to build professional software using one of the most widely adopted programming languages in modern web development.
`;

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

export default function TypeScript() {
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
                      { label: "First Released", value: "2012" },
                      { label: "Created By", value: "Microsoft" },
                      { label: "Latest Version", value: "TypeScript 5.x" },
                      { label: "Typing", value: "Static, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Object-Oriented, Functional, Generic)" },
                      { label: "Primary Use", value: "Large-Scale Frontend & Full-Stack Development" },
                      { label: "Runs On", value: "Compiles to JavaScript for Browsers & Node.js" },
                      { label: "Compiled To", value: "JavaScript" },
                      { label: "Difficulty", value: "⭐⭐⭐☆☆ Intermediate" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "React, Next.js, Angular, NestJS, Vue" },
                      { label: "Used By", value: "Microsoft, Google, OpenAI, Slack, Shopify, Airbnb" },
                    ].map((fact) => (
                      <div key={fact.label}>
                        <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
                          {fact.label}
                        </div>
                        <div className="mt-1.5 text-sm sm:text-base text-gray-700">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.id === "learning-roadmap" ? (
                  <div className="max-w-3xl space-y-10">
                    {TS_ROADMAP.map((lvl) => {
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
                  <div className="max-w-2xl space-y-4">
                    {renderProse(WHAT_IS_INTRO)}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-700">JavaScript</span>
                      <pre className="mt-2 rounded-2xl bg-green-950 text-green-100 text-xs sm:text-sm leading-6 p-4 sm:p-5 overflow-x-auto shadow-lg">
                        <code>{WHAT_IS_JS_CODE}</code>
                      </pre>
                    </div>
                    {renderProse(WHAT_IS_MIDDLE)}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-700">TypeScript</span>
                      <pre className="mt-2 rounded-2xl bg-green-950 text-green-100 text-xs sm:text-sm leading-6 p-4 sm:p-5 overflow-x-auto shadow-lg">
                        <code>{WHAT_IS_TS_CODE}</code>
                      </pre>
                    </div>
                    {renderProse(WHAT_IS_OUTRO)}
                  </div>
                ) : section.id === "why-learn" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(WHY_LEARN)}</div>
                ) : section.id === "where-used" ? (
                  <div className="max-w-2xl space-y-4">{renderProse(WHERE_USED)}</div>
                ) : section.id === "core-syntax" ? (
                  <div className="max-w-2xl">
                    <div className="mb-8 space-y-4">{renderProse(CORE_SYNTAX_INTRO)}</div>
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
