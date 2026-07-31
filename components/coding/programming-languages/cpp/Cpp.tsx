"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for C++ — its own dedicated file/route rather
// than a shared template, matching how every other Coding sub-page works.
// Real per-language copy (what it is, why to learn it, syntax, roadmap,
// etc.) hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "C++";
const TAGLINE = "Maximum control, maximum performance.";
const LOGO = "/c-plusplus-logo-green.png";
const SUMMARY =
  "Master one of the fastest and most powerful programming languages available. C++ is used to build high-performance software such as game engines, operating systems, embedded systems and performance-critical applications.";

const PLACEHOLDER = "Content for this section is coming soon.";

const WHAT_IS = `
C++ is a powerful, high-performance programming language that is widely used for developing operating systems, game engines, desktop applications, embedded systems and performance-critical software. It was created by Bjarne Stroustrup in 1985 as an extension of the C programming language, adding object-oriented programming while maintaining the speed and efficiency of C.

Unlike many modern programming languages, C++ compiles directly into native machine code, allowing programs to run extremely fast with minimal overhead. Because of this, C++ is often chosen for applications where performance, memory management and hardware control are essential.

One of C++'s greatest strengths is its flexibility. Developers can write low-level code that interacts directly with computer hardware or build large object-oriented applications using classes, inheritance and polymorphism. Modern versions of C++ also include generic programming through templates, functional programming features and an extensive Standard Library that simplifies software development.

C++ is the foundation of countless technologies used every day. Many operating systems, web browsers, databases, graphics engines and scientific applications are written entirely or partially in C++. It is also the primary language behind Unreal Engine, one of the world's most advanced game development platforms.

Today, C++ remains one of the most important programming languages in software engineering. Its unmatched performance, portability and versatility make it the language of choice for developers building high-performance applications that demand speed, reliability and complete control over system resources.
`;

const WHY_LEARN = `
C++ is one of the most influential programming languages ever created and continues to play a vital role in modern software development. While it has a steeper learning curve than many newer languages, the knowledge gained from learning C++ provides a deep understanding of how computers and software actually work.

One of C++'s biggest advantages is performance. Because programs are compiled directly into native machine code, C++ applications execute extremely quickly and use system resources efficiently. This makes C++ the preferred language for software where speed and low memory usage are critical.

C++ also gives developers direct control over memory management and hardware. This makes it an excellent choice for developing operating systems, embedded devices, robotics software and other low-level applications where efficiency is essential.

Another major advantage is its widespread use in the gaming industry. The Unreal Engine, used to develop many AAA games, relies heavily on C++. Learning the language opens the door to careers in professional game development and graphics programming.

Beyond gaming, C++ is widely used in finance, engineering, aerospace, artificial intelligence, scientific computing and cybersecurity. Many high-frequency trading systems, simulation software and real-time applications are built with C++ because of its speed and reliability.

Learning C++ also makes it easier to understand other programming languages. Concepts such as pointers, memory management, object-oriented programming and templates provide a strong foundation that transfers to many other languages and technologies.

Whether your goal is to become a systems programmer, game developer, software engineer or embedded systems engineer, C++ remains one of the most valuable programming languages you can learn.
`;

const WHERE_USED = `
C++ is used in many areas of software development where performance, efficiency and direct hardware access are important. Its ability to produce fast native applications makes it one of the most widely used languages for building performance-critical software.

One of the largest application areas is system programming. Many operating systems, device drivers and system utilities are written in C++ because it allows developers to work closely with computer hardware while maintaining high performance.

C++ is also a leading language in game development. Professional game engines such as Unreal Engine use C++ to build graphics engines, physics simulations, artificial intelligence systems and gameplay mechanics for high-end PC and console games.

Another major area is desktop application development. Applications such as web browsers, image editing software, CAD programs and multimedia tools often use C++ to provide fast performance and efficient resource management.

In embedded systems, C++ powers software running inside automobiles, medical devices, industrial robots, smart home products and Internet of Things (IoT) devices. Developers use C++ because it offers precise control over memory and hardware with minimal overhead.

C++ is also heavily used in scientific computing, financial systems, robotics, artificial intelligence, computer graphics and high-performance computing. Many simulations, rendering engines and real-time processing systems rely on C++ to achieve the speed required for complex calculations.

Because of its exceptional performance, portability and flexibility, C++ continues to be one of the most important programming languages in professional software development. From operating systems and video games to robotics and scientific research, C++ powers many of the technologies that shape the modern world.
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
Every programming language has its own syntax—a set of rules that defines how code is written and executed. C++ is known for its speed, flexibility and close interaction with computer hardware. Although it shares many similarities with the C programming language, C++ extends it with powerful features such as object-oriented programming, templates and the Standard Template Library (STL).

C++ applications are built using functions, classes and objects, allowing developers to create everything from simple console programs to complex operating systems and game engines.

Let's explore the core syntax that every C++ developer should understand.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables store information that can be used throughout your program." },
      { type: "p", text: "Every variable must be declared with a specific data type." },
      { type: "code", code: `#include <iostream>\n\nint main()\n{\n    std::string name = "Alex";\n    int age = 22;\n    bool isStudent = true;\n\n    return 0;\n}` },
      { type: "p", text: "Because C++ is a statically typed language, variables can only store values of their declared type." },
      { type: "code", code: `int age = 22;\n\nage = "Twenty-Two";` },
      { type: "p", text: "This produces a compilation error because a string cannot be assigned to an integer variable." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "C++ provides numerous built-in data types for storing different kinds of information." },
      { type: "p", text: "Common primitive data types include:" },
      { type: "ul", items: ["int – Whole numbers", "double – Decimal numbers", "float – Floating-point numbers", "char – Single characters", "bool – True or False"] },
      { type: "p", text: "C++ also provides more advanced types such as:" },
      { type: "ul", items: ["std::string – Text", "Arrays", "Pointers", "References", "Classes"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `double price = 499.99;\nchar grade = 'A';\nbool passed = true;\nstd::string language = "C++";` },
      { type: "p", text: "Selecting the correct data type improves both performance and memory efficiency." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators perform calculations, compare values and evaluate logical expressions." },
      { type: "p", text: "Arithmetic operators:" },
      { type: "code", code: `int a = 10;\nint b = 5;\n\nstd::cout << a + b << std::endl;\nstd::cout << a - b << std::endl;\nstd::cout << a * b << std::endl;\nstd::cout << a / b << std::endl;` },
      { type: "p", text: "Comparison operators:" },
      { type: "code", code: `int age = 18;\n\nstd::cout << (age >= 18) << std::endl;\nstd::cout << (age < 18) << std::endl;` },
      { type: "p", text: "Logical operators such as &&, || and ! combine multiple conditions into a single expression." },
      { type: "p", text: "Operators are fundamental to nearly every C++ program." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions while running." },
      { type: "p", text: "C++ uses if, else if and else statements to execute different code depending on whether a condition is true." },
      { type: "code", code: `int age = 20;\n\nif (age >= 18)\n{\n    std::cout << "Access granted.";\n}\nelse\n{\n    std::cout << "Access denied.";\n}` },
      { type: "p", text: "C++ also provides the switch statement for handling multiple possible values." },
      { type: "p", text: "Conditions allow applications to react dynamically to user input and changing data." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops execute code repeatedly, making programs more efficient." },
      { type: "p", text: "The most commonly used loop is the for loop." },
      { type: "code", code: `for (int i = 1; i <= 5; i++)\n{\n    std::cout << i << std::endl;\n}` },
      { type: "p", text: "C++ also supports:" },
      { type: "ul", items: ["while", "do...while", "Range-based for loops"] },
      { type: "p", text: "Loops are commonly used to process collections, perform calculations and automate repetitive tasks." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions are reusable blocks of code designed to perform specific tasks." },
      { type: "p", text: "Instead of repeating code, developers define a function once and call it whenever needed." },
      { type: "code", code: `#include <iostream>\n\nvoid Greet(std::string name)\n{\n    std::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main()\n{\n    Greet("Alex");\n}` },
      { type: "p", text: "Functions can also return values." },
      { type: "code", code: `int Square(int number)\n{\n    return number * number;\n}` },
      { type: "p", text: "Functions improve readability, organization and code reuse." },
    ],
  },
  {
    heading: "Classes",
    parts: [
      { type: "p", text: "C++ is an object-oriented programming language." },
      { type: "p", text: "Classes define the structure and behavior of objects." },
      { type: "code", code: `class Car\n{\npublic:\n    std::string brand;\n\n    void Drive()\n    {\n        std::cout << "Driving..." << std::endl;\n    }\n};` },
      { type: "p", text: "Classes group related data and functionality into reusable components." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "An object is an instance of a class." },
      { type: "p", text: "Once a class has been defined, multiple objects can be created from it." },
      { type: "code", code: `Car myCar;\n\nmyCar.brand = "Toyota";\n\nmyCar.Drive();` },
      { type: "p", text: "Objects represent real-world entities such as users, products, vehicles and customers." },
    ],
  },
  {
    heading: "Arrays & Vectors",
    parts: [
      { type: "p", text: "Arrays store multiple values of the same type." },
      { type: "code", code: `int numbers[5] = {1, 2, 3, 4, 5};` },
      { type: "p", text: "Modern C++ often uses std::vector, which automatically resizes as elements are added or removed." },
      { type: "code", code: `#include <vector>\n\nstd::vector<std::string> fruits =\n{\n    "Apple",\n    "Banana",\n    "Orange"\n};` },
      { type: "p", text: "Vectors are generally preferred over arrays because they are safer and more flexible." },
    ],
  },
  {
    heading: "Exception Handling",
    parts: [
      { type: "p", text: "Unexpected problems such as invalid input or missing files are called exceptions." },
      { type: "p", text: "C++ provides try, catch and throw to handle errors gracefully." },
      { type: "code", code: `try\n{\n    throw std::runtime_error("Something went wrong.");\n}\ncatch (const std::exception& e)\n{\n    std::cout << e.what();\n}` },
      { type: "p", text: "Exception handling helps applications remain stable and prevents unexpected crashes." },
    ],
  },
  {
    heading: "Pointers & References",
    parts: [
      { type: "p", text: "One of C++'s most powerful features is direct memory management through pointers and references." },
      { type: "p", text: "A pointer stores the memory address of another variable." },
      { type: "code", code: `int number = 10;\n\nint* ptr = &number;` },
      { type: "p", text: "A reference creates another name for an existing variable." },
      { type: "code", code: `int number = 10;\n\nint& ref = number;` },
      { type: "p", text: "Pointers and references are essential concepts for high-performance programming and efficient memory management." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every C++ application is built upon these core concepts. Variables store information, data types define how information is represented and operators perform calculations. Conditions allow programs to make decisions, while loops automate repetitive work. Functions organize reusable logic, and classes and objects form the foundation of object-oriented programming. Arrays and vectors efficiently manage collections of data, exception handling improves application reliability and pointers and references provide the low-level control that makes C++ one of the fastest and most powerful programming languages available." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for advanced C++ topics such as templates, the Standard Template Library (STL), smart pointers, multithreading, game development, graphics programming and system-level software development. These concepts appear in almost every professional C++ application and are essential for becoming a confident C++ developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "C++ has one of the largest and most mature ecosystems in software development. From game engines and GUI frameworks to build systems and debugging tools, developers have access to a wide range of technologies for building high-performance applications." },
      { type: "p", text: "Learning C++ is only the first step. Professional developers rely on these frameworks and tools to build desktop applications, games, embedded systems and enterprise software." },
    ],
  },
  {
    heading: "Visual Studio",
    parts: [
      { type: "p", text: "Visual Studio is one of the most popular Integrated Development Environments (IDEs) for C++ development, especially on Windows." },
      { type: "p", text: "It provides powerful features such as:" },
      { type: "ul", items: ["Intelligent Code Completion (IntelliSense)", "Integrated Debugger", "Performance Profiler", "Project Templates", "Git Integration", "Build & Deployment Tools"] },
      { type: "p", text: "Visual Studio is widely used for desktop applications, game development and enterprise software." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code is a lightweight, cross-platform code editor that supports C++ through extensions." },
      { type: "p", text: "Its features include:" },
      { type: "ul", items: ["Syntax Highlighting", "IntelliSense", "Integrated Terminal", "Git Integration", "Debugging Support", "Extension Marketplace"] },
      { type: "p", text: "VS Code is an excellent choice for developers who prefer a fast and customizable development environment." },
    ],
  },
  {
    heading: "CMake",
    parts: [
      { type: "p", text: "CMake is the most widely used build system for modern C++ projects." },
      { type: "p", text: "Instead of manually managing compiler commands, developers define build configurations that work across different operating systems and compilers." },
      { type: "p", text: "CMake simplifies:" },
      { type: "ul", items: ["Cross-Platform Builds", "Project Configuration", "Dependency Management", "Library Integration", "Build Automation"] },
      { type: "p", text: "Today, CMake is considered the industry standard for professional C++ development." },
    ],
  },
  {
    heading: "Qt",
    parts: [
      { type: "p", text: "Qt is one of the most popular frameworks for building graphical desktop applications." },
      { type: "p", text: "With Qt, developers can create modern applications for Windows, macOS and Linux using a single codebase." },
      { type: "p", text: "Qt provides:" },
      { type: "ul", items: ["Graphical User Interfaces (GUI)", "Widgets", "Networking", "Database Support", "Multimedia", "Cross-Platform Development"] },
      { type: "p", text: "Many professional desktop applications are built using Qt." },
    ],
  },
  {
    heading: "Unreal Engine",
    parts: [
      { type: "p", text: "Unreal Engine is one of the world's most advanced game engines and uses C++ as its primary programming language." },
      { type: "p", text: "Developers use Unreal Engine to build:" },
      { type: "ul", items: ["AAA Games", "3D Games", "Virtual Reality (VR)", "Augmented Reality (AR)", "Real-Time Simulations"] },
      { type: "p", text: "Many of today's most visually impressive games are powered by Unreal Engine." },
    ],
  },
  {
    heading: "Boost",
    parts: [
      { type: "p", text: "Boost is a collection of high-quality C++ libraries that extend the functionality of the standard library." },
      { type: "p", text: "It includes libraries for:" },
      { type: "ul", items: ["Smart Pointers", "File Systems", "Networking", "Multithreading", "Mathematics", "Algorithms"] },
      { type: "p", text: "Many Boost libraries have later become part of the official C++ Standard Library." },
    ],
  },
  {
    heading: "Standard Template Library (STL)",
    parts: [
      { type: "p", text: "The Standard Template Library (STL) is an essential part of modern C++." },
      { type: "p", text: "It provides reusable containers and algorithms that make development faster and more efficient." },
      { type: "p", text: "Some commonly used STL components include:" },
      { type: "ul", items: ["vector", "map", "set", "queue", "stack", "Algorithms (sort, find, count, etc.)"] },
      { type: "p", text: "Nearly every professional C++ application relies heavily on the STL." },
    ],
  },
  {
    heading: "Git & GitHub",
    parts: [
      { type: "p", text: "Although not specific to C++, Git and GitHub are essential tools for every software developer." },
      { type: "p", text: "Git allows developers to track changes to their code, while GitHub enables collaboration, version control and open-source development." },
      { type: "p", text: "Git makes it easy to:" },
      { type: "ul", items: ["Track Project History", "Collaborate in Teams", "Restore Previous Versions", "Manage Feature Branches", "Contribute to Open Source"] },
      { type: "p", text: "Version control is a fundamental skill for modern C++ development." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Learning the C++ language is only the beginning of becoming a professional developer. Real-world applications are built using an ecosystem of frameworks and tools that improve productivity, simplify project management and enable the development of complex software." },
      { type: "p", text: "Development environments like Visual Studio and Visual Studio Code provide powerful coding and debugging features, while CMake automates project builds across multiple platforms. Frameworks such as Qt and Unreal Engine allow developers to create desktop applications and AAA games, while Boost and the Standard Template Library (STL) provide reusable components that reduce development time. Finally, Git & GitHub make collaboration and version control possible for projects of every size." },
      { type: "p", text: "As you continue learning C++, you'll become familiar with these technologies and discover how they work together to build fast, reliable and professional software. They form the foundation of the modern C++ ecosystem and are used by developers around the world." },
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

const CPP_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with C++",
    goal: "Set up C++ and write your first program.",
    learn: ["What is C++?", "Installing a C++ Compiler", "Visual Studio & VS Code", "Your First C++ Program", "The main() Function", "Compiling & Running C++"],
    project: "Hello C++",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how C++ stores and manages data.",
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
    learn: ["for Loops", "while Loops", "do-while Loops", "Range-based for Loops", "break & continue"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Functions",
    goal: "Write reusable and organized code.",
    learn: ["Creating Functions", "Parameters", "Return Values", "Function Overloading", "Scope"],
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
    title: "Arrays & STL Containers",
    goal: "Store and organize groups of data efficiently.",
    learn: ["Arrays", "Vectors", "Maps", "Sets", "STL Containers"],
    project: "Student Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Pointers & Memory Management",
    goal: "Understand memory and resource management.",
    learn: ["Pointers", "References", "Dynamic Memory", "Smart Pointers", "Memory Safety"],
    project: "Dynamic Inventory System",
  },
  {
    level: 11,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["File Streams", "Reading Files", "Writing Files", "Binary Files", "File Paths"],
    project: "Note-Taking Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "Templates & STL Algorithms",
    goal: "Write generic and reusable code.",
    learn: ["Function Templates", "Class Templates", "STL Algorithms", "Iterators", "Lambda Expressions"],
    project: "Generic Data Processor",
  },
  {
    level: 13,
    color: "yellow",
    title: "Working with Databases",
    goal: "Store and retrieve application data.",
    learn: ["SQL Basics", "SQLite", "Database Connections", "CRUD Operations", "ORM Concepts"],
    project: "Library Management System",
  },
  {
    level: 14,
    color: "yellow",
    title: "Multithreading",
    goal: "Build fast and responsive applications.",
    learn: ["Threads", "Mutexes", "Synchronization", "Async Programming", "Concurrency"],
    project: "Parallel File Processor",
  },
  {
    level: 15,
    color: "orange",
    title: "Desktop Development",
    goal: "Build graphical desktop applications.",
    learn: ["Qt Framework", "GUI Basics", "Widgets", "Events", "User Interfaces"],
    project: "Personal Finance Manager",
  },
  {
    level: 16,
    color: "orange",
    title: "Game Development",
    goal: "Build games using C++.",
    learn: ["Unreal Engine Basics", "Game Objects", "Physics", "User Input", "Gameplay Programming"],
    project: "3D Adventure Game",
  },
  {
    level: 17,
    color: "orange",
    title: "Performance Optimization",
    goal: "Write fast and efficient C++ code.",
    learn: ["Profiling", "Memory Optimization", "Move Semantics", "Copy vs Move", "Compiler Optimizations"],
    project: "High-Performance Data Processor",
  },
  {
    level: 18,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "Google Test", "Assertions", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 19,
    color: "red",
    title: "Professional C++",
    goal: "Write clean and scalable production code.",
    learn: ["Clean Code", "Design Patterns", "Project Architecture", "Git & GitHub", "Modern C++ Best Practices"],
    project: "Enterprise Desktop Application",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering C++",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "Cross-Platform Deployment", "CI/CD", "Team Collaboration"],
    finalProjects: ["🎮 3D Game with Unreal Engine", "🖥️ Cross-Platform Desktop Application", "🌐 High-Performance REST Server", "🤖 Robotics Control System", "📊 Real-Time Data Processing Engine", "🚀 Custom Game Engine or Rendering Engine"],
  },
];

const CAREER = `
C++ is one of the most respected and widely used programming languages in the software industry. Its exceptional performance and direct access to system resources make it the preferred choice for building high-performance applications across many industries, including gaming, finance, aerospace, robotics and embedded systems.

One of the most common career paths is becoming a **C++ Developer**. These developers build and maintain performance-critical software such as desktop applications, simulation software, networking tools and system utilities.

C++ is also the industry standard for **Game Development**. Many professional game studios use Unreal Engine, where C++ is the primary programming language. Game developers create gameplay systems, graphics engines, physics simulations, artificial intelligence and multiplayer features for modern video games.

Another major career path is **Systems Programming**. Systems programmers develop operating systems, compilers, device drivers and low-level software that communicates directly with computer hardware. These roles require a deep understanding of memory management and computer architecture.

C++ is widely used in **Embedded Systems Engineering**, where developers create software for automobiles, medical devices, industrial machines, drones, robotics and Internet of Things (IoT) devices. These applications require fast execution and efficient memory usage.

The language is also highly valued in **Financial Technology (FinTech)**. High-frequency trading platforms, banking systems and real-time financial applications often rely on C++ because of its speed and low latency.

Many companies also hire C++ developers for Robotics, Artificial Intelligence, Scientific Computing, Computer Graphics and Cybersecurity, where performance and hardware-level control are essential.

Common C++ career paths include:

* C++ Developer
* Software Engineer
* Systems Programmer
* Game Developer
* Unreal Engine Developer
* Embedded Systems Engineer
* Robotics Engineer
* Graphics Programmer
* FinTech Developer
* AI Engineer
* Cybersecurity Engineer
* Performance Engineer

Because C++ is used in so many performance-critical applications, experienced C++ developers are highly valued across multiple industries. Whether you're interested in operating systems, game engines, robotics, finance or scientific computing, C++ provides the skills needed to build some of the world's most advanced software.
`;

const RESOURCES = `
Learning C++ becomes much easier when you combine consistent practice with high-quality learning resources. Thanks to its long history and large community, C++ offers an enormous collection of official documentation, tutorials, books and open-source projects for developers at every experience level.

### cppreference

cppreference is one of the most trusted references for modern C++. It provides detailed documentation for the C++ language, the Standard Library (STL) and modern language features introduced in recent standards.

### LearnCpp

LearnCpp.com is one of the most popular websites for learning C++. It offers structured, beginner-friendly lessons that gradually progress to advanced topics such as templates, smart pointers and multithreading.

### Microsoft Learn

Microsoft Learn provides free tutorials for C++ development using Visual Studio, Windows APIs and modern C++ tools. It also includes learning paths for desktop and game development.

### freeCodeCamp

freeCodeCamp offers free C++ courses, programming tutorials and project-based learning resources that help beginners build a strong foundation in software development.

### GeeksforGeeks

GeeksforGeeks contains thousands of C++ articles, coding problems, interview questions and algorithm tutorials ranging from beginner concepts to advanced data structures.

### GitHub

GitHub is the largest platform for open-source software. Exploring C++ repositories allows developers to study production-quality code, contribute to projects and collaborate with developers around the world.

### LeetCode

LeetCode is one of the best platforms for improving problem-solving and algorithm skills. Many software engineering interviews include C++ coding challenges similar to those found on LeetCode.

### Unreal Engine Documentation

For aspiring game developers, the official Unreal Engine documentation provides extensive tutorials covering C++, gameplay programming, graphics, physics and multiplayer game development.

### C++ Core Guidelines

The C++ Core Guidelines, created by Bjarne Stroustrup and Herb Sutter, provide best practices for writing modern, safe and efficient C++ code. They are widely followed by professional developers.

### C++ Community

The C++ community is one of the largest and most experienced programming communities in the world. Developers can learn through forums, blogs, YouTube channels, Discord servers, conferences and open-source projects. Staying connected with the community is an excellent way to discover modern C++ features and improve your programming skills.

By combining official documentation, structured tutorials and regular hands-on practice, you'll build a strong understanding of modern C++. The best way to become a skilled C++ developer is to write code consistently, build increasingly challenging projects and explore the powerful ecosystem that makes C++ one of the most important programming languages in the world.
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

export default function Cpp() {
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
                      { label: "First Released", value: "1985" },
                      { label: "Created By", value: "Bjarne Stroustrup" },
                      { label: "Latest Version", value: "C++23" },
                      { label: "Typing", value: "Static, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Procedural, Object-Oriented, Generic, Functional)" },
                      { label: "Primary Use", value: "System Programming, Game Development, High-Performance Applications" },
                      { label: "Runs On", value: "Windows, macOS, Linux and Embedded Systems" },
                      { label: "Compiled To", value: "Native Machine Code" },
                      { label: "Difficulty", value: "⭐⭐⭐⭐☆" },
                      { label: "Open Source", value: "Yes (ISO Standard)" },
                      { label: "Popular Frameworks", value: "Qt, Unreal Engine, Boost, wxWidgets, JUCE" },
                      { label: "Used By", value: "Google, Microsoft, Adobe, Epic Games, NVIDIA, Autodesk" },
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
                    {CPP_ROADMAP.map((lvl) => {
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
