"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for C# — its own dedicated file/route rather than
// a shared template, matching how every other Coding sub-page works. Real
// per-language copy (what it is, why to learn it, syntax, roadmap, etc.)
// hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "C#";
const TAGLINE = "Microsoft's powerhouse language.";
const LOGO = "/c-sharp-logo-green.png";
const SUMMARY =
  "Learn the language behind Microsoft technologies and the Unity game engine. C# is a modern, object-oriented language used for desktop applications, web development, cloud services and game development.";

const PLACEHOLDER = "Content for this section is coming soon.";

const WHAT_IS = `
C# (pronounced "C Sharp") is a modern, high-level programming language developed by Microsoft. It is designed to be simple, powerful and versatile, making it suitable for building everything from desktop applications and websites to games, cloud services and enterprise software.

C# is part of the .NET ecosystem, a powerful development platform that provides libraries, tools and runtimes for building cross-platform applications. Programs written in C# are compiled into Common Intermediate Language (CIL) and then executed by the .NET Runtime, allowing applications to run efficiently on Windows, macOS and Linux.

One of C#'s biggest strengths is its object-oriented design. Developers organize code using classes and objects, making applications easier to maintain, extend and reuse. At the same time, C# also supports modern programming features such as asynchronous programming, generics, functional programming concepts and LINQ, making it one of the most feature-rich programming languages available today.

C# was introduced by Microsoft in 2002 as part of the first release of the .NET Framework. It was designed to combine the performance of C++ with the simplicity of languages like Java while providing a modern and productive development experience.

Today, C# is used by millions of developers around the world. It powers enterprise applications, cloud services, desktop software, mobile apps and many of the world's most popular video games through the Unity game engine. Thanks to its performance, reliability and continuous evolution, C# remains one of the most important programming languages in modern software development.
`;

const WHY_LEARN = `
C# is one of the most versatile programming languages available today. Whether you're interested in web development, desktop applications, game development or cloud computing, C# provides the tools needed to build professional software across many different industries.

One of C#'s greatest advantages is its modern syntax. The language is designed to be clean, consistent and easy to read while offering powerful features that help developers write reliable and maintainable code. Because it is statically typed, many programming errors can be detected before an application is even executed.

Another major strength is the .NET ecosystem. Microsoft provides an extensive collection of libraries, frameworks and development tools that simplify software development. Frameworks like ASP.NET Core, Blazor and .NET MAUI allow developers to build websites, cloud services, desktop applications and mobile apps using the same language.

C# is also the primary language for Unity, one of the world's most popular game engines. Millions of indie games, mobile games and AAA titles are built using C#, making it an excellent choice for aspiring game developers.

From a career perspective, C# offers excellent opportunities. Many companies rely on it for enterprise software, financial systems, healthcare applications and cloud infrastructure. As Microsoft's ecosystem continues to grow, skilled C# developers remain in high demand around the world.

Whether your goal is to become a software engineer, backend developer, cloud engineer or game developer, C# provides a strong foundation for building modern, high-quality applications.
`;

const WHERE_USED = `
C# is used across many areas of software development, making it one of the most flexible programming languages in the industry. Thanks to the .NET platform, developers can build applications for desktop, web, mobile, cloud and gaming using a single language.

One of the most common uses of C# is web development. Frameworks such as ASP.NET Core allow developers to build secure, scalable websites, REST APIs and cloud-based services. Many businesses use C# to power backend systems that handle user authentication, databases and business logic.

C# is also widely used for desktop application development. Using technologies like Windows Presentation Foundation (WPF), Windows Forms and .NET MAUI, developers create modern applications for Windows, macOS and Linux.

Another major area is game development. C# is the primary programming language for the Unity game engine, which is used to create 2D, 3D, mobile, virtual reality and augmented reality games. Thousands of independent developers and major game studios rely on Unity and C# to build interactive experiences.

Beyond web and gaming, C# plays an important role in cloud computing, enterprise software, mobile applications and business systems. Developers use Microsoft Azure together with C# to create scalable cloud services, serverless applications and distributed systems that support millions of users.

Because of its versatility, performance and strong ecosystem, C# continues to be one of the most widely used programming languages in professional software development. Whether you're building business software, cloud services, desktop applications or video games, C# provides the tools needed to create reliable and high-performance applications.
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

const CORE_SYNTAX_INTRO = `
Every programming language has its own syntax—a set of rules that defines how code is written and executed. C# is known for its clean, structured and modern syntax, making it both beginner-friendly and powerful enough for building large-scale professional applications.

As an object-oriented language, C# organizes code using classes and objects. Every application is built from these building blocks, allowing developers to create reusable, maintainable and scalable software.

Let's explore the core syntax that every C# developer should understand.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables allow you to store information that can be used throughout your program." },
      { type: "p", text: "Before creating a variable, C# requires you to specify its data type." },
      { type: "code", code: `string name = "Alex";\nint age = 22;\nbool isStudent = true;` },
      { type: "p", text: "Here, string stores text, int stores whole numbers and bool stores either true or false." },
      { type: "p", text: "Because C# is a statically typed language, a variable can only store values of the type it was declared with." },
      { type: "code", code: `int age = 22;\n\nage = "Twenty-Two";` },
      { type: "p", text: "This produces a compilation error because a string cannot be assigned to an integer variable." },
      { type: "p", text: "Strong typing helps catch errors before the program runs." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "C# provides many built-in data types for storing different kinds of information." },
      { type: "p", text: "Some of the most common value types include:" },
      { type: "ul", items: ["int – Whole numbers", "double – Decimal numbers", "float – Decimal numbers with lower precision", "bool – True or False", "char – A single character"] },
      { type: "p", text: "Reference types include:" },
      { type: "ul", items: ["string – Text", "Arrays – Collections of values", "Classes – Custom objects"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `double price = 999.99;\nchar grade = 'A';\nstring language = "C#";` },
      { type: "p", text: "Choosing the correct data type improves performance and keeps code organized." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators allow C# to perform calculations, compare values and evaluate logical expressions." },
      { type: "p", text: "Arithmetic operators perform mathematical calculations." },
      { type: "code", code: `int a = 10;\nint b = 5;\n\nConsole.WriteLine(a + b);\nConsole.WriteLine(a - b);\nConsole.WriteLine(a * b);\nConsole.WriteLine(a / b);` },
      { type: "p", text: "Comparison operators compare values." },
      { type: "code", code: `int age = 18;\n\nConsole.WriteLine(age >= 18);\nConsole.WriteLine(age < 18);` },
      { type: "p", text: "Logical operators such as &&, || and ! allow multiple conditions to be combined into a single expression." },
      { type: "p", text: "Operators are fundamental to almost every C# application." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions based on different situations." },
      { type: "p", text: "C# uses if, else if and else statements to execute code depending on whether a condition is true." },
      { type: "code", code: `int age = 20;\n\nif (age >= 18)\n{\n    Console.WriteLine("Access granted.");\n}\nelse\n{\n    Console.WriteLine("Access denied.");\n}` },
      { type: "p", text: "C# also provides the switch statement, which is useful when comparing a single value against multiple possible cases." },
      { type: "p", text: "Conditions help applications respond intelligently to user input and changing data." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops repeat code automatically, reducing duplication and improving efficiency." },
      { type: "p", text: "The most commonly used loop is the for loop." },
      { type: "code", code: `for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine(i);\n}` },
      { type: "p", text: "C# also supports while, do...while and foreach loops." },
      { type: "p", text: "Loops are commonly used for processing collections, reading files and performing repetitive tasks." },
    ],
  },
  {
    heading: "Methods",
    parts: [
      { type: "p", text: "Methods are reusable blocks of code that perform specific tasks." },
      { type: "p", text: "Instead of repeating the same code multiple times, you define a method once and call it whenever needed." },
      { type: "code", code: `static void Greet(string name)\n{\n    Console.WriteLine($"Hello, {name}!");\n}\n\nGreet("Alex");` },
      { type: "p", text: "Methods can receive parameters and return values." },
      { type: "code", code: `static int Square(int number)\n{\n    return number * number;\n}` },
      { type: "p", text: "Using methods makes applications cleaner and easier to maintain." },
    ],
  },
  {
    heading: "Classes",
    parts: [
      { type: "p", text: "Everything in C# is built around classes." },
      { type: "p", text: "A class acts as a blueprint that defines the properties and behavior of objects." },
      { type: "code", code: `class Car\n{\n    public string Brand;\n\n    public void Drive()\n    {\n        Console.WriteLine("Driving...");\n    }\n}` },
      { type: "p", text: "Classes allow developers to organize related data and functionality into reusable structures." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "An object is an instance of a class." },
      { type: "p", text: "Once a class has been created, multiple objects can be created from it." },
      { type: "code", code: `Car myCar = new Car();\n\nmyCar.Brand = "Toyota";\n\nmyCar.Drive();` },
      { type: "p", text: "Objects are used to represent real-world entities such as users, products, vehicles and customers." },
    ],
  },
  {
    heading: "Arrays",
    parts: [
      { type: "p", text: "Arrays allow developers to store multiple values of the same type inside a single variable." },
      { type: "code", code: `string[] fruits =\n{\n    "Apple",\n    "Banana",\n    "Orange"\n};` },
      { type: "p", text: "Individual values can be accessed using their index." },
      { type: "code", code: `Console.WriteLine(fruits[0]);` },
      { type: "p", text: "Arrays are useful for storing collections of related information efficiently." },
    ],
  },
  {
    heading: "Exception Handling",
    parts: [
      { type: "p", text: "Programs sometimes encounter unexpected situations, such as missing files or invalid input. These situations are called exceptions." },
      { type: "p", text: "C# provides exception handling to prevent applications from crashing unexpectedly." },
      { type: "code", code: `try\n{\n    int result = 10 / 0;\n}\ncatch (Exception)\n{\n    Console.WriteLine("An error occurred.");\n}` },
      { type: "p", text: "Using try and catch allows developers to handle errors gracefully and improve application reliability." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every C# application is built using these core concepts. Variables store information, data types define the kind of data that can be stored, operators perform calculations, conditions make decisions and loops automate repetitive tasks. Methods organize reusable logic, while classes and objects form the foundation of object-oriented programming. Arrays help manage collections of data, and exception handling ensures applications remain stable even when unexpected errors occur." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for learning advanced C# topics such as LINQ, asynchronous programming, ASP.NET Core, Entity Framework, game development with Unity and cloud application development using .NET. These core concepts appear in almost every C# application and are essential for becoming a confident and professional C# developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "C# is part of the .NET ecosystem, one of the most powerful software development platforms in the world. Over the years, Microsoft and the open-source community have created a wide range of frameworks and development tools that allow developers to build websites, desktop applications, cloud services, mobile apps and video games." },
      { type: "p", text: "Learning C# is only the first step. Professional developers rely on these frameworks and tools every day to build modern, scalable and high-performance applications." },
    ],
  },
  {
    heading: "Visual Studio",
    parts: [
      { type: "p", text: "Visual Studio is Microsoft's official Integrated Development Environment (IDE) for C# and .NET development." },
      { type: "p", text: "It provides powerful features that help developers write, test and debug applications more efficiently." },
      { type: "p", text: "Some of its key features include:" },
      { type: "ul", items: ["Intelligent Code Completion (IntelliSense)", "Integrated Debugger", "Project Templates", "Git Integration", "Performance Analysis", "Built-in Testing Tools"] },
      { type: "p", text: "Visual Studio is widely used by professional C# developers for desktop, web and enterprise development." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code is a lightweight and highly customizable code editor that also supports C# development through the C# Dev Kit extension." },
      { type: "p", text: "It offers:" },
      { type: "ul", items: ["Syntax Highlighting", "IntelliSense", "Integrated Terminal", "Git Integration", "Extension Marketplace", "Cross-Platform Support"] },
      { type: "p", text: "VS Code is an excellent choice for developers who prefer a faster and more lightweight development environment." },
    ],
  },
  {
    heading: "ASP.NET Core",
    parts: [
      { type: "p", text: "ASP.NET Core is Microsoft's modern framework for building web applications and REST APIs." },
      { type: "p", text: "It allows developers to create secure, scalable and high-performance backend applications." },
      { type: "p", text: "ASP.NET Core provides features such as:" },
      { type: "ul", items: ["REST API Development", "MVC Architecture", "Authentication & Authorization", "Dependency Injection", "Middleware", "Cloud Deployment"] },
      { type: "p", text: "Today, ASP.NET Core is one of the most popular backend frameworks in the .NET ecosystem." },
    ],
  },
  {
    heading: "Entity Framework Core",
    parts: [
      { type: "p", text: "Entity Framework Core (EF Core) is Microsoft's Object-Relational Mapping (ORM) framework." },
      { type: "p", text: "Instead of writing SQL queries manually, developers work directly with C# objects while EF Core automatically handles communication with the database." },
      { type: "p", text: "Entity Framework Core simplifies:" },
      { type: "ul", items: ["Database Connections", "CRUD Operations", "Migrations", "Entity Relationships", "LINQ Queries"] },
      { type: "p", text: "It is commonly used together with ASP.NET Core in professional applications." },
    ],
  },
  {
    heading: ".NET MAUI",
    parts: [
      { type: "p", text: ".NET MAUI (Multi-platform App UI) allows developers to build native applications for Windows, macOS, Android and iOS using a single C# codebase." },
      { type: "p", text: "Developers can create:" },
      { type: "ul", items: ["Mobile Apps", "Desktop Applications", "Cross-Platform User Interfaces", "Business Applications"] },
      { type: "p", text: ".NET MAUI replaces Xamarin as Microsoft's modern solution for cross-platform app development." },
    ],
  },
  {
    heading: "Blazor",
    parts: [
      { type: "p", text: "Blazor is a web framework that allows developers to build interactive web applications using C# instead of JavaScript." },
      { type: "p", text: "Blazor supports both server-side and client-side applications while sharing code between the frontend and backend." },
      { type: "p", text: "It is commonly used for:" },
      { type: "ul", items: ["Interactive Web Apps", "Business Dashboards", "Enterprise Applications", "Single-Page Applications (SPAs)"] },
    ],
  },
  {
    heading: "Unity",
    parts: [
      { type: "p", text: "Unity is one of the world's most popular game engines, and C# is its primary programming language." },
      { type: "p", text: "Developers use Unity to create:" },
      { type: "ul", items: ["2D Games", "3D Games", "Mobile Games", "Virtual Reality (VR)", "Augmented Reality (AR)"] },
      { type: "p", text: "Thousands of indie developers and major game studios rely on Unity to build games for multiple platforms." },
    ],
  },
  {
    heading: "NuGet",
    parts: [
      { type: "p", text: "NuGet is the official package manager for .NET." },
      { type: "p", text: "It allows developers to install, update and manage thousands of third-party libraries directly within their projects." },
      { type: "p", text: "Using NuGet makes dependency management simple and helps developers quickly add new functionality to their applications." },
    ],
  },
  {
    heading: "Git & GitHub",
    parts: [
      { type: "p", text: "Although not exclusive to C#, Git and GitHub are essential tools for every professional developer." },
      { type: "p", text: "Git tracks changes to your code, while GitHub allows developers to store repositories, collaborate with others and contribute to open-source projects." },
      { type: "p", text: "Using Git enables developers to:" },
      { type: "ul", items: ["Track Project History", "Collaborate in Teams", "Restore Previous Versions", "Manage Feature Branches", "Contribute to Open Source"] },
      { type: "p", text: "Version control is a fundamental skill for modern software development." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Learning C# is only the beginning of becoming a professional developer. Real-world applications are built using an ecosystem of frameworks and tools that simplify development, improve code quality and make collaboration easier." },
      { type: "p", text: "Development environments like Visual Studio and Visual Studio Code help you write code efficiently, while NuGet manages project dependencies. Frameworks such as ASP.NET Core, Entity Framework Core and Blazor enable developers to build modern web applications and enterprise systems, while .NET MAUI simplifies cross-platform app development. Unity powers game development, and Git & GitHub make collaboration and version control possible." },
      { type: "p", text: "As you continue learning C#, you'll gradually become familiar with these technologies. Together, they form the foundation of the modern C# ecosystem and are used daily by millions of developers around the world." },
    ],
  },
];

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

const CS_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with C#",
    goal: "Set up C# and write your first program.",
    learn: ["What is C#?", "Installing .NET", "Visual Studio & VS Code", "Your First C# Program", "The Main() Method", "Compiling & Running C#"],
    project: "Hello C#",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how C# stores and manages data.",
    learn: ["Variables", "Primitive Data Types", "Strings", "Constants (const)", "Type Casting"],
    project: "Student Information System",
  },
  {
    level: 3,
    color: "green",
    title: "Operators",
    goal: "Perform calculations and compare values.",
    learn: ["Arithmetic Operators", "Comparison Operators", "Logical Operators", "Assignment Operators", "Increment & Decrement"],
    project: "Simple Calculator",
  },
  {
    level: 4,
    color: "green",
    title: "Conditions",
    goal: "Control the flow of your applications.",
    learn: ["if Statements", "else & else if", "switch Statements", "Nested Conditions", "Ternary Operator"],
    project: "Grade Calculator",
  },
  {
    level: 5,
    color: "green",
    title: "Loops",
    goal: "Automate repetitive tasks.",
    learn: ["for Loops", "while Loops", "do-while Loops", "foreach Loops", "break & continue"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Methods",
    goal: "Write reusable and organized code.",
    learn: ["Creating Methods", "Parameters", "Return Values", "Method Overloading", "Scope"],
    project: "Math Utility Library",
  },
  {
    level: 7,
    color: "green",
    title: "Classes & Objects",
    goal: "Understand object-oriented programming fundamentals.",
    learn: ["Classes", "Objects", "Constructors", "Fields", "Methods"],
    project: "Car Management System",
  },
  {
    level: 8,
    color: "green",
    title: "Object-Oriented Programming",
    goal: "Build reusable and maintainable software.",
    learn: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Access Modifiers"],
    project: "Employee Management System",
  },
  {
    level: 9,
    color: "yellow",
    title: "Arrays & Collections",
    goal: "Store and organize groups of data.",
    learn: ["Arrays", "List<T>", "Dictionary<TKey, TValue>", "HashSet<T>", "Collections"],
    project: "Student Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Exception Handling",
    goal: "Build reliable applications.",
    learn: ["try & catch", "finally", "throw", "Custom Exceptions", "Debugging"],
    project: "Secure Login System",
  },
  {
    level: 11,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["File Class", "Reading Files", "Writing Files", "JSON Files", "CSV Files"],
    project: "Note-Taking Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "LINQ",
    goal: "Query and manipulate data efficiently.",
    learn: ["LINQ Basics", "Filtering", "Sorting", "Selecting Data", "Lambda Expressions"],
    project: "Product Catalog",
  },
  {
    level: 13,
    color: "yellow",
    title: "Working with Databases",
    goal: "Store and retrieve application data.",
    learn: ["Entity Framework Core", "SQL Basics", "CRUD Operations", "Migrations", "Database Connections"],
    project: "Library Management System",
  },
  {
    level: 14,
    color: "yellow",
    title: "Asynchronous Programming",
    goal: "Build responsive and efficient applications.",
    learn: ["async", "await", "Tasks", "Parallel Programming", "Threading Basics"],
    project: "File Downloader",
  },
  {
    level: 15,
    color: "orange",
    title: "ASP.NET Core",
    goal: "Build modern web applications.",
    learn: ["ASP.NET Core", "MVC", "REST APIs", "Dependency Injection", "Authentication"],
    project: "Task Manager API",
  },
  {
    level: 16,
    color: "orange",
    title: "Cross-Platform Development",
    goal: "Build applications for multiple platforms.",
    learn: [".NET MAUI", "Blazor", "Desktop Apps", "Mobile Apps", "Cross-Platform UI"],
    project: "Personal Expense Tracker",
  },
  {
    level: 17,
    color: "orange",
    title: "Game Development",
    goal: "Create games using C#.",
    learn: ["Unity Basics", "Game Objects", "Components", "Physics", "User Input"],
    project: "2D Platformer Game",
  },
  {
    level: 18,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "xUnit", "NUnit", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 19,
    color: "red",
    title: "Professional C#",
    goal: "Write clean and scalable production code.",
    learn: ["Clean Code", "SOLID Principles", "Design Patterns", "Project Architecture", "Git & GitHub"],
    project: "Enterprise Business Application",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering C#",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "Cloud Deployment", "CI/CD", "Team Collaboration"],
    finalProjects: ["🌐 Enterprise Web Application", "🛒 E-Commerce Platform", "🎮 2D or 3D Unity Game", "📊 Business Management System", "💬 Real-Time Chat Application", "☁️ Cloud-Based REST API with Authentication"],
  },
];

const CAREER = `
C# is one of the most widely used programming languages in professional software development. Thanks to its strong integration with the .NET ecosystem, C# developers work across industries such as finance, healthcare, gaming, manufacturing, cloud computing and enterprise software.

One of the most common career paths is becoming a **C# Developer**. These developers build and maintain applications using C# and .NET, ranging from desktop software to large-scale enterprise systems.

Many developers specialize as **Backend Developers**, using ASP.NET Core to build REST APIs, authentication systems and scalable web services. Backend developers are responsible for the business logic, databases and server-side functionality behind modern applications.

C# is also the primary language for **Unity Game Developers**. Unity powers millions of games across PC, console, mobile, virtual reality (VR) and augmented reality (AR). Game developers use C# to create gameplay mechanics, user interfaces, physics systems and multiplayer experiences.

As cloud technologies continue to grow, many C# developers work as **Cloud Engineers**, building cloud-native applications and services using Microsoft Azure and .NET. These professionals design scalable systems that can support thousands or even millions of users.

Another popular career path is **Desktop Application Development**, where developers create business software, engineering tools and enterprise applications using technologies such as WPF, Windows Forms and .NET MAUI.

Because C# is commonly used in large organizations, experienced developers often move into senior software engineering roles, technical leadership positions or software architecture.

### Common C# Career Paths

* C# Developer
* .NET Developer
* Backend Developer
* Software Engineer
* Full-Stack Developer
* Unity Game Developer
* Cloud Engineer
* Desktop Application Developer
* DevOps Engineer
* Solutions Architect
* Enterprise Software Developer
* Technical Lead

With its broad range of applications and strong industry adoption, C# offers excellent long-term career opportunities. Whether you want to build business software, cloud platforms, games or enterprise systems, C# provides a solid foundation for a successful software development career.
`;

const RESOURCES = `
Learning C# becomes much easier when you combine regular coding practice with high-quality learning resources. Microsoft provides excellent official documentation, while the .NET community offers countless tutorials, books, videos and open-source projects that help developers at every skill level.

### Microsoft Learn

Microsoft Learn is the official learning platform for C# and .NET. It offers free, interactive learning paths covering everything from beginner programming concepts to advanced cloud development with Azure.

### Microsoft Documentation

The official Microsoft documentation contains comprehensive guides for C#, .NET, ASP.NET Core, Entity Framework Core, .NET MAUI and many other technologies. It is the primary reference used by professional developers.

### .NET

The official .NET website provides downloads, release notes, documentation, tutorials and information about the entire .NET ecosystem.

### freeCodeCamp

freeCodeCamp offers free C# tutorials, full programming courses and project-based learning resources suitable for beginners and experienced developers alike.

### Codecademy

Codecademy provides interactive C# courses that allow learners to practice writing code directly in the browser while learning programming fundamentals.

### GeeksforGeeks

GeeksforGeeks contains thousands of C# articles, coding problems, interview questions and algorithm tutorials covering both beginner and advanced topics.

### GitHub

GitHub is the largest platform for open-source software. Exploring C# repositories allows developers to study real-world projects, contribute to open source and collaborate with other programmers.

### LeetCode

LeetCode helps developers strengthen their problem-solving and algorithm skills through hundreds of coding challenges. It is one of the most popular platforms for preparing technical interviews.

### Unity Learn

Unity Learn provides official tutorials, courses and projects for game development using Unity and C#. It is an excellent resource for aspiring game developers.

### C# Community

The C# and .NET community is one of the largest software development communities in the world. Developers can find help through forums, blogs, YouTube channels, Discord servers, conferences and local user groups. Staying involved with the community is a great way to continue learning and keep up with new language features and framework updates.

By combining official documentation, interactive tutorials and consistent hands-on practice, you'll build a strong understanding of C# and the .NET ecosystem. The best way to become a skilled C# developer is to write code regularly, build real-world projects and continuously explore the tools and frameworks that power modern software development.
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

export default function CSharp() {
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
                      { label: "First Released", value: "2002" },
                      { label: "Created By", value: "Microsoft" },
                      { label: "Latest Version", value: "C# 13" },
                      { label: "Typing", value: "Static, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Object-Oriented, Functional, Generic)" },
                      { label: "Primary Use", value: "Desktop, Web, Game & Enterprise Development" },
                      { label: "Runs On", value: ".NET Runtime (Windows, macOS, Linux)" },
                      { label: "Compiled To", value: "Common Intermediate Language (CIL), executed by the .NET Runtime" },
                      { label: "Difficulty", value: "⭐⭐⭐☆☆" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "ASP.NET Core, .NET MAUI, Blazor, Unity, Entity Framework Core" },
                      { label: "Used By", value: "Microsoft, Stack Overflow, Unity Technologies, Accenture, Siemens, Dell" },
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
                    {CS_ROADMAP.map((lvl) => {
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
