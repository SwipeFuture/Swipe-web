"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for Go — its own dedicated file/route rather than
// a shared template, matching how every other Coding sub-page works. Real
// per-language copy (what it is, why to learn it, syntax, roadmap, etc.)
// hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "Go";
const TAGLINE = "Simplicity built for scale.";
const LOGO = "/go-logo-green.png";
const SUMMARY =
  "Explore Google's modern programming language designed for simplicity and speed. Go is widely used for cloud computing, networking, scalable backend systems and high-performance server applications.";

const PLACEHOLDER = "Content for this section is coming soon.";

const WHAT_IS = `
Go, also known as Golang, is a modern, statically typed programming language developed by Google. It was created by Robert Griesemer, Rob Pike and Ken Thompson, and was officially released in 2009. Go was designed to simplify software development while providing the performance of compiled languages like C++ with a much simpler syntax.

One of Go's defining characteristics is its focus on simplicity. The language intentionally avoids unnecessary complexity, making code easier to read, write and maintain. At the same time, Go delivers excellent performance by compiling directly into native machine code, producing fast and efficient applications.

Go was specifically designed for building scalable server-side applications. It includes built-in support for concurrency through goroutines and channels, allowing developers to write programs that efficiently handle thousands of simultaneous tasks without the complexity often found in traditional multithreaded programming.

Another major strength of Go is its powerful standard library. Developers can build web servers, REST APIs, networking tools, file systems and cloud services without relying heavily on third-party libraries.

Today, Go is widely used for cloud computing, microservices, DevOps tools, networking software and distributed systems. Many of the world's most important cloud technologies, including Docker and Kubernetes, are written primarily in Go. Thanks to its simplicity, speed and reliability, Go has become one of the fastest-growing programming languages in modern software development.
`;

const WHY_LEARN = `
Go has become one of the most popular programming languages for backend development and cloud computing. Its simple syntax, excellent performance and built-in concurrency make it an outstanding choice for developers who want to build fast, scalable and reliable software.

One of Go's greatest advantages is its simplicity. The language was designed with readability and maintainability in mind, allowing developers to write clean code without the complexity found in many other programming languages. This makes Go relatively easy to learn while remaining powerful enough for large-scale production systems.

Another major benefit is performance. Because Go compiles directly into native machine code, applications run much faster than those written in many interpreted languages. At the same time, Go offers fast compilation speeds, allowing developers to build and test applications quickly.

Go is particularly well known for its built-in support for concurrency. Using goroutines and channels, developers can easily build applications capable of handling thousands of simultaneous requests, making Go ideal for web servers, APIs, networking applications and cloud services.

The language is also the backbone of many modern cloud technologies. Projects such as Docker, Kubernetes, Terraform and numerous DevOps tools are built with Go, making it one of the most valuable languages for cloud engineering and infrastructure development.

Whether your goal is to become a backend developer, cloud engineer, DevOps engineer or software engineer, Go provides an excellent foundation for building modern, scalable applications.
`;

const WHERE_USED = `
Go is primarily used for building high-performance backend systems, cloud services and distributed applications. Its combination of simplicity, speed and concurrency has made it one of the most widely adopted languages for modern server-side development.

One of the most common uses of Go is backend development. Developers use Go to build REST APIs, web servers, authentication systems and microservices capable of handling large numbers of concurrent users with excellent performance.

Go is also one of the leading languages in cloud computing. Many cloud platforms and infrastructure tools are written in Go because of its efficiency, portability and strong networking capabilities. It is commonly used to build scalable cloud services and containerized applications.

Another major application area is DevOps and Infrastructure Engineering. Popular tools such as Docker, Kubernetes, Terraform and Prometheus rely heavily on Go. Developers use the language to automate deployments, manage cloud infrastructure and build monitoring systems.

Go is also widely used in network programming, where developers create proxies, load balancers, messaging systems and distributed services that require high performance and low latency.

Beyond cloud computing, Go is increasingly used for command-line applications, cybersecurity tools, data processing, network servers and real-time systems. Its ability to produce small, self-contained executables makes deployment simple across different operating systems.

Because of its excellent performance, clean syntax and strong support for concurrency, Go has become one of the most important programming languages for modern backend development and cloud-native software. It is an ideal choice for developers building scalable, reliable and high-performance systems.
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
Every programming language has its own syntax—a set of rules that defines how code is written and executed. Go is known for its clean, minimal and easy-to-read syntax. The language was designed to reduce complexity while maintaining excellent performance, making it a favorite choice for building scalable backend services and cloud applications.

Unlike many object-oriented languages, Go focuses on simplicity. It avoids unnecessary language features while providing powerful built-in support for concurrency, networking and error handling.

Let's explore the core syntax that every Go developer should understand.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables store information that can be used throughout your program." },
      { type: "p", text: "Go allows variables to be declared using either the var keyword or the short declaration operator :=." },
      { type: "code", code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var name string = "Alex"\n    age := 22\n    isStudent := true\n\n    fmt.Println(name, age, isStudent)\n}` },
      { type: "p", text: "Because Go is a statically typed language, every variable has a specific type." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "Go provides several built-in data types." },
      { type: "p", text: "Common primitive data types include:" },
      { type: "ul", items: ["int – Whole numbers", "float64 – Decimal numbers", "bool – True or False", "string – Text", "byte – Single byte", "rune – Unicode character"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `price := 999.99\ngrade := 'A'\nlanguage := "Go"\npassed := true` },
      { type: "p", text: "Go automatically infers the variable type when using :=." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators perform calculations, compare values and evaluate logical expressions." },
      { type: "p", text: "Arithmetic operators:" },
      { type: "code", code: `a := 10\nb := 5\n\nfmt.Println(a + b)\nfmt.Println(a - b)\nfmt.Println(a * b)\nfmt.Println(a / b)` },
      { type: "p", text: "Comparison operators:" },
      { type: "code", code: `age := 18\n\nfmt.Println(age >= 18)\nfmt.Println(age < 18)` },
      { type: "p", text: "Logical operators such as &&, || and ! combine multiple conditions into a single expression." },
      { type: "p", text: "Operators are used throughout every Go application." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions based on different situations." },
      { type: "p", text: "Go uses if statements to execute code when a condition is true." },
      { type: "code", code: `age := 20\n\nif age >= 18 {\n    fmt.Println("Access granted.")\n} else {\n    fmt.Println("Access denied.")\n}` },
      { type: "p", text: "Go also provides the switch statement for handling multiple possible values." },
      { type: "p", text: "Conditions allow applications to respond dynamically to user input and changing data." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Go has only one looping keyword: for." },
      { type: "p", text: "Despite its simplicity, it can be used as a traditional loop, a while loop or an infinite loop." },
      { type: "code", code: `for i := 1; i <= 5; i++ {\n    fmt.Println(i)\n}` },
      { type: "p", text: "Go also supports the range keyword for iterating over collections." },
      { type: "code", code: `numbers := []int{1, 2, 3}\n\nfor index, value := range numbers {\n    fmt.Println(index, value)\n}` },
      { type: "p", text: "Loops are commonly used for processing data and handling repetitive tasks." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions are reusable blocks of code that perform specific tasks." },
      { type: "p", text: "They help organize applications into smaller, reusable components." },
      { type: "code", code: `package main\n\nimport "fmt"\n\nfunc greet(name string) {\n    fmt.Println("Hello,", name)\n}\n\nfunc main() {\n    greet("Alex")\n}` },
      { type: "p", text: "Functions can also return values." },
      { type: "code", code: `func square(number int) int {\n    return number * number\n}` },
      { type: "p", text: "Functions are one of the most important building blocks in Go." },
    ],
  },
  {
    heading: "Structs",
    parts: [
      { type: "p", text: "Instead of traditional classes, Go uses structs to group related data together." },
      { type: "code", code: `type Car struct {\n    Brand string\n    Year  int\n}` },
      { type: "p", text: "Structs define custom data types that can represent real-world objects." },
    ],
  },
  {
    heading: "Struct Instances",
    parts: [
      { type: "p", text: "A struct can be instantiated to create an object-like value." },
      { type: "code", code: `car := Car{\n    Brand: "Toyota",\n    Year:  2024,\n}\n\nfmt.Println(car.Brand)` },
      { type: "p", text: "Structs are commonly used to represent users, products, orders and many other data models." },
    ],
  },
  {
    heading: "Slices & Arrays",
    parts: [
      { type: "p", text: "Arrays store a fixed number of values." },
      { type: "code", code: `numbers := [5]int{1, 2, 3, 4, 5}` },
      { type: "p", text: "More commonly, Go developers use slices, which are flexible and automatically resizable." },
      { type: "code", code: `fruits := []string{\n    "Apple",\n    "Banana",\n    "Orange",\n}` },
      { type: "p", text: "Slices are one of the most frequently used data structures in Go." },
    ],
  },
  {
    heading: "Error Handling",
    parts: [
      { type: "p", text: "Unlike many languages, Go does not use exceptions for ordinary error handling." },
      { type: "p", text: "Instead, functions commonly return an error value that should be checked." },
      { type: "code", code: `result, err := os.ReadFile("data.txt")\n\nif err != nil {\n    fmt.Println("Error:", err)\n    return\n}\n\nfmt.Println(string(result))` },
      { type: "p", text: "Explicit error handling is one of Go's core design principles and helps make applications more reliable." },
    ],
  },
  {
    heading: "Goroutines",
    parts: [
      { type: "p", text: "One of Go's most powerful features is goroutines, which allow functions to run concurrently." },
      { type: "p", text: "Creating a goroutine requires only the go keyword." },
      { type: "code", code: `go func() {\n    fmt.Println("Running concurrently")\n}()` },
      { type: "p", text: "Goroutines make it easy to build highly scalable applications capable of handling thousands of simultaneous tasks." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every Go application is built upon these core concepts. Variables store information, data types define how values are represented and operators perform calculations. Conditions control program flow, while loops automate repetitive tasks. Functions organize reusable logic, structs model real-world data and slices efficiently manage collections of values. Go's explicit error handling improves application reliability, while goroutines provide powerful built-in concurrency that makes the language ideal for modern backend and cloud applications." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for advanced Go topics such as channels, interfaces, packages, REST APIs, databases, microservices and cloud-native development. These concepts appear in almost every professional Go application and are essential for becoming a confident Go developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "Go has a modern and rapidly growing ecosystem designed for building fast, scalable and reliable applications. Although Go includes an extensive standard library, developers also rely on popular frameworks and tools to simplify web development, cloud computing and deployment." },
      { type: "p", text: "Learning Go is only the first step. Professional Go developers use these frameworks and tools every day to build APIs, cloud services, microservices and distributed systems." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code is one of the most popular editors for Go development." },
      { type: "p", text: "With the official Go extension, developers gain access to powerful features such as:" },
      { type: "ul", items: ["Intelligent Code Completion", "Syntax Highlighting", "Integrated Debugger", "Code Formatting", "Git Integration", "Integrated Terminal"] },
      { type: "p", text: "VS Code is lightweight, cross-platform and widely used throughout the Go community." },
    ],
  },
  {
    heading: "GoLand",
    parts: [
      { type: "p", text: "GoLand is JetBrains' professional IDE designed specifically for Go." },
      { type: "p", text: "It provides advanced development features including:" },
      { type: "ul", items: ["Smart Code Completion", "Refactoring Tools", "Debugging", "Built-in Testing", "Database Support", "Git Integration"] },
      { type: "p", text: "GoLand is commonly used by professional developers working on large Go projects." },
    ],
  },
  {
    heading: "Gin",
    parts: [
      { type: "p", text: "Gin is one of the most popular web frameworks for Go." },
      { type: "p", text: "It is designed to build fast, lightweight and scalable REST APIs with minimal code." },
      { type: "p", text: "Gin provides:" },
      { type: "ul", items: ["HTTP Routing", "Middleware", "JSON Handling", "Request Validation", "Authentication Support"] },
      { type: "p", text: "Gin is widely used for backend services and microservices." },
    ],
  },
  {
    heading: "Fiber",
    parts: [
      { type: "p", text: "Fiber is a modern web framework inspired by Express.js." },
      { type: "p", text: "It focuses on performance and developer productivity while maintaining a clean and simple API." },
      { type: "p", text: "Fiber is commonly used for:" },
      { type: "ul", items: ["REST APIs", "Backend Services", "Microservices", "High-Performance Web Applications"] },
      { type: "p", text: "Its speed makes it one of the fastest Go web frameworks available." },
    ],
  },
  {
    heading: "Echo",
    parts: [
      { type: "p", text: "Echo is another popular Go framework for web development." },
      { type: "p", text: "It offers a clean architecture and powerful built-in features, including:" },
      { type: "ul", items: ["Routing", "Middleware", "JWT Authentication", "Data Binding", "Template Rendering"] },
      { type: "p", text: "Echo is widely used for building production-ready web applications." },
    ],
  },
  {
    heading: "GORM",
    parts: [
      { type: "p", text: "GORM is the most popular Object-Relational Mapping (ORM) library for Go." },
      { type: "p", text: "It simplifies database development by allowing developers to work with Go structs instead of writing SQL queries manually." },
      { type: "p", text: "GORM supports:" },
      { type: "ul", items: ["CRUD Operations", "Database Migrations", "Relationships", "Transactions", "Multiple SQL Databases"] },
      { type: "p", text: "It is commonly used together with Gin and Fiber." },
    ],
  },
  {
    heading: "Docker",
    parts: [
      { type: "p", text: "Docker plays a major role in the Go ecosystem." },
      { type: "p", text: "Because Go produces small, standalone executables, it integrates perfectly with containerized applications." },
      { type: "p", text: "Developers use Docker for:" },
      { type: "ul", items: ["Application Deployment", "Microservices", "Containerization", "Development Environments", "Cloud Infrastructure"] },
      { type: "p", text: "Many cloud-native Go applications are deployed using Docker containers." },
    ],
  },
  {
    heading: "Git & GitHub",
    parts: [
      { type: "p", text: "Although not exclusive to Go, Git and GitHub are essential tools for every Go developer." },
      { type: "p", text: "Git tracks changes to source code, while GitHub enables collaboration, version control and open-source development." },
      { type: "p", text: "Using Git allows developers to:" },
      { type: "ul", items: ["Track Project History", "Collaborate in Teams", "Restore Previous Versions", "Manage Feature Branches", "Contribute to Open Source"] },
      { type: "p", text: "Version control is a fundamental skill for professional Go development." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Learning Go is only the beginning of becoming a professional developer. Real-world applications are built using an ecosystem of frameworks and tools that simplify development, improve productivity and support scalable software architecture." },
      { type: "p", text: "Development environments like Visual Studio Code and GoLand provide powerful coding and debugging features, while frameworks such as Gin, Fiber and Echo make it easy to build fast REST APIs and backend services. GORM simplifies database management, Docker enables containerized deployments and Git & GitHub provide essential version control and collaboration tools." },
      { type: "p", text: "As you continue learning Go, you'll become familiar with these technologies and discover how they work together to build modern cloud-native applications. Together, they form the foundation of the Go ecosystem and are used by companies around the world to build fast, reliable and scalable software." },
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

const GO_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with Go",
    goal: "Set up Go and write your first program.",
    learn: ["What is Go?", "Installing Go", "Go Workspace", "Your First Go Program", "The main() Function", "Compiling & Running Go"],
    project: "Hello Go",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how Go stores and manages data.",
    learn: ["Variables", "Primitive Data Types", "Strings", "Constants (const)", "Type Inference"],
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
    learn: ["if Statements", "else", "switch Statements", "Nested Conditions", "Short Statements"],
    project: "Grade Calculator",
  },
  {
    level: 5,
    color: "green",
    title: "Loops",
    goal: "Automate repetitive tasks.",
    learn: ["for Loops", "Range Loops", "Infinite Loops", "break & continue", "Loop Patterns"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Functions",
    goal: "Write reusable and organized code.",
    learn: ["Creating Functions", "Parameters", "Multiple Return Values", "Named Returns", "Scope"],
    project: "Math Utility Library",
  },
  {
    level: 7,
    color: "green",
    title: "Structs",
    goal: "Build custom data types.",
    learn: ["Structs", "Struct Fields", "Struct Methods", "Constructors", "Composition"],
    project: "Car Management System",
  },
  {
    level: 8,
    color: "green",
    title: "Interfaces",
    goal: "Write flexible and reusable applications.",
    learn: ["Interfaces", "Method Sets", "Polymorphism", "Composition", "Type Assertions"],
    project: "Payment Processing System",
  },
  {
    level: 9,
    color: "yellow",
    title: "Arrays, Slices & Maps",
    goal: "Store and organize groups of data.",
    learn: ["Arrays", "Slices", "Maps", "Range", "Built-in Functions"],
    project: "Student Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Error Handling",
    goal: "Build reliable applications.",
    learn: ["Errors", "Custom Errors", "Panic", "Recover", "Best Practices"],
    project: "Secure Login System",
  },
  {
    level: 11,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["Reading Files", "Writing Files", "JSON Files", "CSV Files", "File Paths"],
    project: "Note-Taking Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "Concurrency",
    goal: "Build highly scalable applications.",
    learn: ["Goroutines", "Channels", "Select", "WaitGroups", "Mutexes"],
    project: "Concurrent Task Processor",
  },
  {
    level: 13,
    color: "yellow",
    title: "Working with Databases",
    goal: "Store and retrieve application data.",
    learn: ["SQL Basics", "GORM", "CRUD Operations", "Migrations", "Database Connections"],
    project: "Library Management System",
  },
  {
    level: 14,
    color: "yellow",
    title: "REST APIs",
    goal: "Build modern backend services.",
    learn: ["HTTP Package", "Routing", "JSON", "Middleware", "Authentication"],
    project: "Task Manager API",
  },
  {
    level: 15,
    color: "orange",
    title: "Web Frameworks",
    goal: "Build scalable web applications.",
    learn: ["Gin", "Fiber", "Echo", "Dependency Injection", "API Design"],
    project: "E-Commerce Backend",
  },
  {
    level: 16,
    color: "orange",
    title: "Cloud & Microservices",
    goal: "Develop cloud-native applications.",
    learn: ["Docker", "Kubernetes Basics", "Microservices", "Configuration", "Service Communication"],
    project: "URL Shortener Service",
  },
  {
    level: 17,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "Benchmark Testing", "Table-Driven Tests", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 18,
    color: "orange",
    title: "Performance Optimization",
    goal: "Write fast and efficient Go applications.",
    learn: ["Profiling", "Memory Optimization", "Efficient Concurrency", "Performance Tuning", "Best Practices"],
    project: "High-Performance File Processor",
  },
  {
    level: 19,
    color: "red",
    title: "Professional Go",
    goal: "Write clean and scalable production code.",
    learn: ["Clean Code", "Project Structure", "Design Patterns", "Git & GitHub", "Production Best Practices"],
    project: "Enterprise Backend Service",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering Go",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Cloud Deployment", "Security Best Practices", "CI/CD", "Scalability", "Team Collaboration"],
    finalProjects: ["🌐 REST API with Authentication", "☁️ Cloud-Native Microservice", "💬 Real-Time Chat Application", "📊 Analytics Dashboard Backend", "🛒 E-Commerce Backend", "🚀 Distributed Task Processing System"],
  },
];

const CAREER = `
Go has become one of the most sought-after programming languages for backend development, cloud computing and distributed systems. Its simplicity, performance and built-in concurrency make it the preferred language for many companies building modern internet infrastructure and cloud-native applications.

One of the most common career paths is becoming a **Go Developer**. Go developers build high-performance backend systems, REST APIs, microservices and scalable web applications. They focus on creating reliable software that can efficiently handle thousands or even millions of users.

Many Go developers work as **Backend Developers**, using Go to build APIs, authentication systems, business logic and database-driven applications. Frameworks such as Gin, Fiber and Echo are commonly used to develop fast and maintainable backend services.

Go is also one of the leading languages in **Cloud Engineering**. Companies use Go to develop cloud platforms, serverless applications and distributed systems that power large-scale infrastructure. Many engineers working with Microsoft Azure, Google Cloud and Amazon Web Services (AWS) use Go to build cloud-native solutions.

Another major career path is **DevOps Engineering**. Many of the world's most popular DevOps tools—including Docker, Kubernetes and Terraform—are written in Go. DevOps engineers use Go to automate deployments, manage infrastructure and improve software delivery pipelines.

Go is also widely used in Networking, Cybersecurity, Infrastructure Engineering and Platform Engineering, where high performance and efficient concurrency are essential.

Common Go career paths include:

* Go Developer
* Backend Developer
* Software Engineer
* Cloud Engineer
* DevOps Engineer
* Platform Engineer
* Site Reliability Engineer (SRE)
* Infrastructure Engineer
* API Developer
* Distributed Systems Engineer
* Cybersecurity Engineer
* Systems Engineer

Because Go is at the core of modern cloud infrastructure, skilled Go developers are in high demand across the technology industry. Whether you want to build scalable APIs, cloud platforms or distributed systems, Go provides an excellent foundation for a successful software engineering career.
`;

const RESOURCES = `
Learning Go becomes much easier when you combine regular coding practice with high-quality learning resources. The Go community emphasizes simplicity and clean code, and there are many excellent tutorials, official guides and open-source projects available for developers of all skill levels.

### Go Documentation

The official Go documentation is the best place to learn the language directly from its creators. It includes tutorials, language specifications, package documentation and practical examples covering everything from beginner concepts to advanced concurrency.

### A Tour of Go

A Tour of Go is the official interactive tutorial that teaches the fundamentals of the language directly in the browser. It is one of the best starting points for beginners learning Go.

### Go by Example

Go by Example provides practical, example-based lessons covering nearly every important feature of the language. Each topic includes concise explanations and runnable code examples.

### Golang Tutorial

The official Go tutorial introduces developers to Go syntax, packages, modules and best practices through hands-on examples and guided lessons.

### freeCodeCamp

freeCodeCamp offers free Go courses, backend development tutorials and project-based learning resources that help developers gain practical experience.

### GeeksforGeeks

GeeksforGeeks contains thousands of Go articles, coding problems, interview questions and programming tutorials covering beginner to advanced topics.

### GitHub

GitHub is an excellent place to explore open-source Go projects, contribute to community libraries and study production-quality code written by experienced Go developers.

### LeetCode

LeetCode helps developers strengthen their problem-solving and algorithm skills through hundreds of coding challenges. It is widely used to prepare for software engineering interviews.

### Awesome Go

Awesome Go is a carefully curated collection of high-quality Go libraries, frameworks, tools and learning resources. It is one of the most popular community resources for discovering the Go ecosystem.

### Go Community

The Go community is known for its focus on simplicity, collaboration and open-source development. Developers can learn through blogs, YouTube channels, Discord servers, forums, conferences and community meetups. Participating in the community is an excellent way to stay up to date with new language features and best practices.

By combining official documentation, interactive tutorials and consistent hands-on practice, you'll develop a strong understanding of Go and its ecosystem. The best way to become a skilled Go developer is to build real-world projects, contribute to open-source software and continuously explore the tools and technologies that power modern cloud-native applications.
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

export default function Go() {
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
                      { label: "First Released", value: "2009" },
                      { label: "Created By", value: "Robert Griesemer, Rob Pike & Ken Thompson (Google)" },
                      { label: "Latest Version", value: "Go 1.24" },
                      { label: "Typing", value: "Static, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Procedural, Concurrent)" },
                      { label: "Primary Use", value: "Backend Development, Cloud Computing & Distributed Systems" },
                      { label: "Runs On", value: "Windows, macOS, Linux and many other platforms" },
                      { label: "Compiled To", value: "Native Machine Code" },
                      { label: "Difficulty", value: "⭐⭐☆☆☆" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "Gin, Fiber, Echo, Beego, Buffalo" },
                      { label: "Used By", value: "Google, Uber, Docker, Kubernetes, Cloudflare, Twitch" },
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
                    {GO_ROADMAP.map((lvl) => {
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
