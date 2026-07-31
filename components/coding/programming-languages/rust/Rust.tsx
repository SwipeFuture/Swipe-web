"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for Rust — its own dedicated file/route rather
// than a shared template, matching how every other Coding sub-page works.
// Real per-language copy (what it is, why to learn it, syntax, roadmap,
// etc.) hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "Rust";
const TAGLINE = "Speed without sacrificing safety.";
const LOGO = "/rust-logo-green.png";
const SUMMARY =
  "Discover a modern systems programming language focused on performance, reliability and memory safety. Rust helps developers build secure, efficient software without sacrificing speed, making it increasingly popular for systems programming and cloud infrastructure.";

const PLACEHOLDER = "Content for this section is coming soon.";

const WHAT_IS = `
Rust is a modern systems programming language designed to deliver the performance of C and C++ while providing much stronger guarantees about memory safety and reliability. It was originally created by **Graydon Hoare** and later developed by **Mozilla**, with its first stable release arriving in **2015** after years of development.

Unlike many traditional systems languages, Rust helps developers prevent common programming mistakes before their programs even run. Its unique **ownership**, **borrowing** and **lifetime** system ensures memory is managed safely without requiring a garbage collector. This allows Rust applications to achieve excellent performance while avoiding many of the crashes and security vulnerabilities caused by memory errors.

Rust is compiled directly into **native machine code**, allowing applications to run extremely fast with minimal overhead. Because there is no runtime garbage collector constantly managing memory, developers have greater control over system resources while still benefiting from strong compile-time safety checks.

Rust has become increasingly popular for building operating systems, command-line tools, web servers, game engines, embedded software and cloud infrastructure. It is also used to develop networking software, browsers, databases and other performance-critical applications where speed and reliability are equally important.

Today, Rust is considered one of the fastest-growing programming languages in the software industry. Its combination of safety, speed and modern language features has made it a favorite among developers building reliable software for the future.
`;

const WHY_LEARN = `
Rust has earned a reputation as one of the most innovative programming languages of the modern era. It combines high performance with memory safety, allowing developers to build reliable applications without sacrificing speed. For many years, Rust has consistently ranked among the most loved programming languages in developer surveys because of its powerful features and modern design.

One of Rust's greatest advantages is **memory safety**. Traditional systems languages often allow memory leaks, null pointer errors and data races that can cause applications to crash or become vulnerable to security attacks. Rust prevents many of these problems during compilation through its ownership system, helping developers write safer code before it ever reaches production.

Another major benefit is performance. Since Rust compiles directly into native machine code, applications can achieve speeds comparable to C and C++. This makes Rust an excellent choice for software where efficiency, low latency and resource management are critical.

Rust also offers excellent support for **concurrent programming**. Its ownership model helps eliminate many common threading mistakes, making it easier to build applications that efficiently utilize modern multi-core processors.

The language is increasingly used in cloud computing, networking, cybersecurity and systems programming. Companies such as Microsoft, Amazon, Cloudflare and Discord use Rust to improve the reliability and performance of critical software components.

Whether your goal is to become a systems programmer, backend developer, security engineer or cloud engineer, learning Rust provides valuable skills that are becoming increasingly important in modern software development.
`;

const WHERE_USED = `
Rust is used wherever software requires high performance, reliability and memory safety. Its ability to compile into efficient native machine code while preventing many common programming errors has made it one of the leading languages for modern systems programming.

One of Rust's primary application areas is **systems programming**. Developers use Rust to build operating system components, command-line utilities, compilers and low-level software that interacts directly with computer hardware while maintaining strong safety guarantees.

Rust is also becoming increasingly popular for **backend development**. Frameworks such as **Axum**, **Actix Web** and **Rocket** allow developers to build fast REST APIs, web servers and microservices capable of handling thousands of concurrent requests with excellent performance.

Another major area is **cloud computing** and **distributed systems**. Rust is used to develop cloud infrastructure, networking software, serverless platforms and container technologies where performance, scalability and reliability are essential.

In **cybersecurity**, Rust's memory safety significantly reduces vulnerabilities caused by buffer overflows, dangling pointers and memory corruption. For this reason, many security-focused applications and networking tools are now being developed in Rust.

Rust is also widely used in **embedded systems**, **game development**, **blockchain technology**, **artificial intelligence**, **network programming** and **high-performance computing**. Its combination of speed and safety makes it suitable for applications where every millisecond and every byte of memory matter.

Because of its modern design, excellent performance and industry-leading safety features, Rust continues to gain popularity across the technology industry. From cloud infrastructure and web servers to operating systems and embedded devices, Rust is helping developers build faster, safer and more reliable software.
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
Every programming language has its own syntax—a set of rules that defines how code is written and executed. Rust is known for combining the performance of low-level languages like C++ with modern safety features that help developers write reliable and secure software.

One of Rust's most unique features is its **ownership system**, which manages memory automatically without using a garbage collector. Although this concept takes time to master, it allows Rust to provide exceptional performance while preventing many common programming errors.

Let's explore the core syntax that every Rust developer should understand.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables store information that can be used throughout your program." },
      { type: "p", text: "By default, variables in Rust are immutable, meaning their values cannot be changed after they are created." },
      { type: "code", code: `fn main() {\n    let name = "Alex";\n    let age = 22;\n\n    println!("{} {}", name, age);\n}` },
      { type: "p", text: "If you want a variable to be changeable, you must use the mut keyword." },
      { type: "code", code: `fn main() {\n    let mut age = 22;\n\n    age = 23;\n}` },
      { type: "p", text: "This design helps prevent accidental modifications and makes programs safer." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "Rust provides several built-in data types." },
      { type: "p", text: "Some of the most common primitive types include:" },
      { type: "ul", items: ["i32 – Integer", "f64 – Decimal Number", "bool – True or False", "char – Single Character", "String – Dynamic Text", "&str – String Slice"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `let price: f64 = 999.99;\nlet grade: char = 'A';\nlet active: bool = true;\nlet language = "Rust";` },
      { type: "p", text: "Rust's strong type system catches many programming errors during compilation." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators perform calculations, compare values and evaluate logical expressions." },
      { type: "p", text: "Arithmetic operators:" },
      { type: "code", code: `let a = 10;\nlet b = 5;\n\nprintln!("{}", a + b);\nprintln!("{}", a - b);\nprintln!("{}", a * b);\nprintln!("{}", a / b);` },
      { type: "p", text: "Comparison operators:" },
      { type: "code", code: `let age = 18;\n\nprintln!("{}", age >= 18);\nprintln!("{}", age < 18);` },
      { type: "p", text: "Logical operators such as &&, || and ! allow multiple conditions to be combined into a single expression." },
      { type: "p", text: "Operators are fundamental to every Rust application." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions while running." },
      { type: "p", text: "Rust uses if, else if and else statements." },
      { type: "code", code: `let age = 20;\n\nif age >= 18 {\n    println!("Access granted.");\n} else {\n    println!("Access denied.");\n}` },
      { type: "p", text: "Rust also provides powerful match expressions that allow developers to handle multiple possible values in a clean and readable way." },
      { type: "p", text: "Conditions make applications dynamic and responsive to different situations." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops repeat code automatically." },
      { type: "p", text: "Rust supports several loop types." },
      { type: "p", text: "A for loop:" },
      { type: "code", code: `for i in 1..6 {\n    println!("{}", i);\n}` },
      { type: "p", text: "A while loop:" },
      { type: "code", code: `let mut count = 1;\n\nwhile count <= 5 {\n    println!("{}", count);\n    count += 1;\n}` },
      { type: "p", text: "Rust also includes the loop keyword for creating infinite loops." },
      { type: "p", text: "Loops are commonly used for processing collections, calculations and automation." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions organize reusable blocks of code." },
      { type: "code", code: `fn greet(name: &str) {\n    println!("Hello, {}!", name);\n}\n\nfn main() {\n    greet("Alex");\n}` },
      { type: "p", text: "Functions can return values." },
      { type: "code", code: `fn square(number: i32) -> i32 {\n    number * number\n}` },
      { type: "p", text: "Functions improve readability and help organize large applications." },
    ],
  },
  {
    heading: "Structs",
    parts: [
      { type: "p", text: "Instead of traditional classes, Rust uses structs to group related data together." },
      { type: "code", code: `struct Car {\n    brand: String,\n    year: u32,\n}` },
      { type: "p", text: "Structs allow developers to model real-world objects such as users, products and vehicles." },
    ],
  },
  {
    heading: "Struct Instances",
    parts: [
      { type: "p", text: "A struct can be instantiated to create an object-like value." },
      { type: "code", code: `let car = Car {\n    brand: String::from("Toyota"),\n    year: 2024,\n};\n\nprintln!("{}", car.brand);` },
      { type: "p", text: "Methods can also be attached to structs using impl blocks, allowing them to contain both data and behavior." },
    ],
  },
  {
    heading: "Vectors",
    parts: [
      { type: "p", text: "Rust's most commonly used collection is the Vector (Vec<T>)." },
      { type: "p", text: "Unlike arrays, vectors can grow and shrink dynamically." },
      { type: "code", code: `let fruits = vec![\n    "Apple",\n    "Banana",\n    "Orange",\n];` },
      { type: "p", text: "Developers frequently use vectors to store lists of users, products, messages and other collections of data." },
    ],
  },
  {
    heading: "Ownership & Borrowing",
    parts: [
      { type: "p", text: "The feature that makes Rust unique is its ownership system." },
      { type: "p", text: "Every value has exactly one owner." },
      { type: "code", code: `let text = String::from("Hello");` },
      { type: "p", text: "Instead of copying large amounts of data, Rust often uses borrowing, which temporarily allows another part of the program to access a value without taking ownership." },
      { type: "code", code: `fn print_text(text: &String) {\n    println!("{}", text);\n}` },
      { type: "p", text: "Ownership and borrowing eliminate many memory-related bugs while maintaining excellent performance." },
    ],
  },
  {
    heading: "Error Handling",
    parts: [
      { type: "p", text: "Rust uses the Result type instead of traditional exceptions." },
      { type: "p", text: "A function can return either a successful value or an error." },
      { type: "code", code: `use std::fs;\n\nfn main() {\n    let file = fs::read_to_string("data.txt");\n\n    match file {\n        Ok(content) => println!("{}", content),\n        Err(error) => println!("Error: {}", error),\n    }\n}` },
      { type: "p", text: "Rust encourages developers to handle errors explicitly, making applications more reliable and predictable." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every Rust application is built upon these core concepts. Variables store information, data types define how values are represented and operators perform calculations. Conditions control program flow, while loops automate repetitive work. Functions organize reusable logic, and structs provide a clean way to model real-world data. Vectors efficiently manage collections, while Rust's ownership and borrowing system ensures memory safety without sacrificing performance. Finally, explicit error handling helps developers build robust applications that fail gracefully instead of crashing unexpectedly." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for advanced Rust topics such as traits, enums, lifetimes, asynchronous programming, multithreading, web development with Axum and Actix, and systems programming. These concepts appear in almost every professional Rust application and are essential for becoming a confident Rust developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "Rust has one of the fastest-growing ecosystems in modern software development. While the language itself provides outstanding performance and memory safety, developers also rely on powerful frameworks and tools to build web servers, cloud applications, games and command-line utilities." },
      { type: "p", text: "Learning Rust is only the beginning. Professional Rust developers use these frameworks and tools every day to build scalable, reliable and high-performance software." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code is one of the most popular editors for Rust development." },
      { type: "p", text: "With the rust-analyzer extension installed, it provides powerful features such as:" },
      { type: "ul", items: ["Intelligent Code Completion", "Syntax Highlighting", "Error Detection", "Integrated Debugger", "Git Integration", "Integrated Terminal"] },
      { type: "p", text: "VS Code is lightweight, highly customizable and widely used throughout the Rust community." },
    ],
  },
  {
    heading: "RustRover",
    parts: [
      { type: "p", text: "RustRover is JetBrains' professional IDE built specifically for Rust." },
      { type: "p", text: "It offers advanced development tools including:" },
      { type: "ul", items: ["Smart Code Completion", "Refactoring Tools", "Integrated Debugging", "Cargo Support", "Testing Tools", "Database Integration"] },
      { type: "p", text: "RustRover is an excellent choice for developers working on large and complex Rust projects." },
    ],
  },
  {
    heading: "Cargo",
    parts: [
      { type: "p", text: "Cargo is Rust's official build system and package manager." },
      { type: "p", text: "It simplifies project management by handling compilation, dependencies, testing and documentation automatically." },
      { type: "p", text: "Cargo allows developers to:" },
      { type: "ul", items: ["Create New Projects", "Build Applications", "Run Programs", "Manage Dependencies", "Execute Tests", "Publish Packages"] },
      { type: "p", text: "Nearly every Rust project uses Cargo." },
    ],
  },
  {
    heading: "Axum",
    parts: [
      { type: "p", text: "Axum is one of the most popular frameworks for building modern web applications and REST APIs in Rust." },
      { type: "p", text: "Built on top of Tokio, Axum provides:" },
      { type: "ul", items: ["HTTP Routing", "REST API Development", "Middleware", "JSON Handling", "Authentication", "High Performance"] },
      { type: "p", text: "Axum has become one of the preferred frameworks for backend development in Rust." },
    ],
  },
  {
    heading: "Actix Web",
    parts: [
      { type: "p", text: "Actix Web is a powerful and extremely fast web framework designed for high-performance applications." },
      { type: "p", text: "Developers commonly use Actix Web to build:" },
      { type: "ul", items: ["REST APIs", "Backend Services", "Microservices", "Authentication Systems", "High-Traffic Web Applications"] },
      { type: "p", text: "Its excellent performance makes it one of the fastest web frameworks available." },
    ],
  },
  {
    heading: "Tokio",
    parts: [
      { type: "p", text: "Tokio is Rust's most widely used asynchronous runtime." },
      { type: "p", text: "It provides the foundation for many networking and backend applications by allowing programs to perform many tasks concurrently without blocking." },
      { type: "p", text: "Tokio is commonly used for:" },
      { type: "ul", items: ["Asynchronous Programming", "Networking", "Web Servers", "Cloud Services", "Distributed Systems"] },
      { type: "p", text: "Many Rust frameworks, including Axum, rely on Tokio." },
    ],
  },
  {
    heading: "Bevy",
    parts: [
      { type: "p", text: "Bevy is one of the most popular game engines written entirely in Rust." },
      { type: "p", text: "It provides modern tools for developing:" },
      { type: "ul", items: ["2D Games", "3D Games", "Simulations", "Interactive Applications"] },
      { type: "p", text: "Bevy is rapidly growing within the Rust game development community." },
    ],
  },
  {
    heading: "Git & GitHub",
    parts: [
      { type: "p", text: "Although not exclusive to Rust, Git and GitHub are essential tools for every Rust developer." },
      { type: "p", text: "Git tracks changes to source code, while GitHub enables collaboration, version control and open-source development." },
      { type: "p", text: "Using Git allows developers to:" },
      { type: "ul", items: ["Track Project History", "Collaborate in Teams", "Restore Previous Versions", "Manage Feature Branches", "Contribute to Open Source"] },
      { type: "p", text: "Version control is an essential skill for professional Rust development." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Learning Rust is only the beginning of becoming a professional developer. Real-world applications are built using an ecosystem of frameworks and tools that simplify development, improve productivity and support scalable software architecture." },
      { type: "p", text: "Development environments like Visual Studio Code and RustRover provide excellent coding and debugging features, while Cargo automates building, dependency management and testing. Frameworks such as Axum and Actix Web make it easy to create high-performance web applications and REST APIs, while Tokio powers asynchronous and concurrent programming. Bevy enables modern game development, and Git & GitHub provide essential version control and collaboration tools." },
      { type: "p", text: "As you continue learning Rust, you'll become familiar with these technologies and discover how they work together to build fast, secure and reliable software. Together, they form the foundation of the modern Rust ecosystem and are used by developers around the world to create everything from web services and cloud platforms to games and system-level applications." },
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

const RUST_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with Rust",
    goal: "Set up Rust and write your first program.",
    learn: ["What is Rust?", "Installing Rust", "Cargo", "Your First Rust Program", "The main() Function", "Compiling & Running Rust"],
    project: "Hello Rust",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how Rust stores and manages data.",
    learn: ["Variables", "Mutable vs Immutable", "Primitive Data Types", "Strings", "Type Annotations"],
    project: "Student Information System",
  },
  {
    level: 3,
    color: "green",
    title: "Operators",
    goal: "Perform calculations and compare values.",
    learn: ["Arithmetic Operators", "Comparison Operators", "Logical Operators", "Assignment Operators", "Pattern Matching Basics"],
    project: "Simple Calculator",
  },
  {
    level: 4,
    color: "green",
    title: "Conditions",
    goal: "Control the flow of your applications.",
    learn: ["if Expressions", "else", "match", "if let", "Nested Conditions"],
    project: "Grade Calculator",
  },
  {
    level: 5,
    color: "green",
    title: "Loops",
    goal: "Automate repetitive tasks.",
    learn: ["loop", "while", "for", "break", "continue"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Functions",
    goal: "Write reusable and organized code.",
    learn: ["Creating Functions", "Parameters", "Return Values", "Expressions", "Scope"],
    project: "Math Utility Library",
  },
  {
    level: 7,
    color: "green",
    title: "Structs",
    goal: "Model real-world data.",
    learn: ["Structs", "Methods", "Associated Functions", "Tuple Structs", "Update Syntax"],
    project: "Car Management System",
  },
  {
    level: 8,
    color: "green",
    title: "Enums & Pattern Matching",
    goal: "Build flexible applications.",
    learn: ["Enums", "match", "Option", "Result", "Pattern Matching"],
    project: "Order Status Tracker",
  },
  {
    level: 9,
    color: "yellow",
    title: "Ownership & Borrowing",
    goal: "Master Rust's unique memory system.",
    learn: ["Ownership", "Borrowing", "References", "Mutable References", "Lifetimes Basics"],
    project: "Inventory Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Collections",
    goal: "Store and organize data efficiently.",
    learn: ["Vectors", "Strings", "HashMaps", "Iterators", "Collections API"],
    project: "Student Management System",
  },
  {
    level: 11,
    color: "yellow",
    title: "Error Handling",
    goal: "Build reliable applications.",
    learn: ["Result", "Option", "match", "unwrap()", "Error Propagation"],
    project: "Secure Login System",
  },
  {
    level: 12,
    color: "yellow",
    title: "Traits & Generics",
    goal: "Write reusable and flexible code.",
    learn: ["Traits", "Generic Functions", "Generic Structs", "Trait Bounds", "Derive Macros"],
    project: "Generic Data Manager",
  },
  {
    level: 13,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["Reading Files", "Writing Files", "JSON Files", "CSV Files", "File Paths"],
    project: "Note-Taking Application",
  },
  {
    level: 14,
    color: "yellow",
    title: "Concurrency",
    goal: "Build fast and scalable applications.",
    learn: ["Threads", "Channels", "Mutexes", "Arc", "Shared State"],
    project: "Concurrent Task Processor",
  },
  {
    level: 15,
    color: "orange",
    title: "Async Rust",
    goal: "Handle asynchronous operations efficiently.",
    learn: ["async", "await", "Tokio", "Futures", "Async Tasks"],
    project: "Weather API Client",
  },
  {
    level: 16,
    color: "orange",
    title: "Web Development",
    goal: "Build modern backend applications.",
    learn: ["Axum", "Actix Web", "Routing", "REST APIs", "Authentication"],
    project: "Task Manager API",
  },
  {
    level: 17,
    color: "orange",
    title: "Systems Programming",
    goal: "Build low-level, high-performance software.",
    learn: ["Memory Management", "Smart Pointers", "Unsafe Rust", "FFI", "Performance"],
    project: "Command-Line File Manager",
  },
  {
    level: 18,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "Integration Testing", "Benchmarking", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 19,
    color: "red",
    title: "Professional Rust",
    goal: "Write clean and scalable production code.",
    learn: ["Clean Code", "Project Structure", "Design Patterns", "Git & GitHub", "Best Practices"],
    project: "Enterprise Backend Service",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering Rust",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "Cloud Deployment", "CI/CD", "Team Collaboration"],
    finalProjects: ["🌐 High-Performance REST API", "☁️ Cloud-Native Backend Service", "💬 Real-Time Chat Application", "🔒 Secure Password Manager", "🎮 2D Game with Bevy", "🚀 High-Performance CLI Application"],
  },
];

const CAREER = `
Rust has rapidly become one of the most respected programming languages in the software industry. Its combination of memory safety, high performance and modern language features has made it increasingly popular for building reliable software in areas where speed and security are essential.

One of the most common career paths is becoming a **Rust Developer**. Rust developers build backend services, command-line tools, cloud applications and system software that require both excellent performance and strong reliability.

Rust is also widely used in **Systems Programming**. Systems programmers develop operating systems, networking software, databases, compilers and other low-level applications that interact closely with computer hardware. Rust's ownership system allows developers to write efficient code while preventing many common memory-related bugs.

Another growing field is **Backend Development**. Frameworks such as **Axum**, **Actix Web** and **Rocket** enable developers to build fast REST APIs, microservices and cloud-native applications capable of handling large numbers of concurrent users.

Rust is becoming increasingly important in **Cloud Computing** and **Infrastructure Engineering**. Companies use Rust to build distributed systems, networking tools, container platforms and cloud services where performance, scalability and reliability are critical.

Because of its memory safety guarantees, Rust is also widely adopted in **Cybersecurity**. Security engineers use Rust to build networking tools, encryption software and security-critical applications that are less vulnerable to memory-related attacks.

Rust is also gaining popularity in **Embedded Systems**, **Blockchain Development**, **Game Development**, **Artificial Intelligence** and **High-Performance Computing**, where developers need maximum efficiency without sacrificing safety.

Common Rust career paths include:

* Rust Developer
* Software Engineer
* Backend Developer
* Systems Programmer
* Cloud Engineer
* Infrastructure Engineer
* Cybersecurity Engineer
* Blockchain Developer
* Embedded Systems Engineer
* DevOps Engineer
* Platform Engineer
* Performance Engineer

As more companies adopt Rust for performance-critical and security-sensitive software, demand for skilled Rust developers continues to grow. Whether you want to build cloud infrastructure, backend services, operating systems or embedded applications, Rust provides an excellent foundation for a modern software engineering career.
`;

const RESOURCES = `
Learning Rust becomes much easier when you combine consistent coding practice with high-quality learning resources. Although Rust is a relatively young language, it has one of the most active and welcoming developer communities, with excellent documentation and educational material available for developers of all experience levels.

### The Rust Programming Language

Often called "The Rust Book," this is the official guide to Rust and one of the best programming books available. It covers everything from beginner concepts to advanced topics such as ownership, lifetimes, concurrency and smart pointers.

### Rust by Example

Rust by Example teaches the language through practical code examples. Each topic includes runnable programs that help developers understand Rust by experimenting with real code.

### Rust Documentation

The official Rust documentation includes language references, the standard library, package documentation and detailed guides covering every part of the Rust ecosystem.

### Rustlings

Rustlings is an interactive collection of small programming exercises designed to help beginners practice Rust by fixing and completing real code. It is one of the most popular ways to learn the language.

### freeCodeCamp

freeCodeCamp provides free Rust courses, tutorials and project-based learning resources that help developers build practical experience with modern Rust development.

### GeeksforGeeks

GeeksforGeeks offers tutorials, coding problems and interview preparation covering Rust fundamentals, algorithms and systems programming concepts.

### GitHub

GitHub is an excellent place to explore open-source Rust projects, contribute to community libraries and learn by reading production-quality code written by experienced Rust developers.

### LeetCode

LeetCode helps developers improve their problem-solving and algorithm skills through hundreds of programming challenges. Rust is fully supported and is becoming increasingly popular for technical interview preparation.

### crates.io

crates.io is Rust's official package registry. Developers use it to discover, install and publish libraries (called crates) that extend the functionality of Rust applications. Nearly every professional Rust project depends on crates from this ecosystem.

### Rust Community

The Rust community is widely known for being welcoming, collaborative and focused on helping developers learn. Through forums, Discord servers, blogs, YouTube channels, conferences and open-source projects, developers can continuously improve their skills and stay up to date with the latest features and best practices.

By combining official documentation, interactive exercises and regular hands-on practice, you'll develop a strong understanding of Rust and its ecosystem. The best way to become a skilled Rust developer is to build increasingly challenging projects, contribute to open-source software and explore the powerful tools that make Rust one of the fastest-growing programming languages in the world.
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

export default function Rust() {
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
                      { label: "First Released", value: "2010" },
                      { label: "Created By", value: "Graydon Hoare (Mozilla)" },
                      { label: "Latest Version", value: "Rust 1.89" },
                      { label: "Typing", value: "Static, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Systems, Functional, Concurrent)" },
                      { label: "Primary Use", value: "Systems Programming, Backend Development & Performance-Critical Software" },
                      { label: "Runs On", value: "Windows, macOS, Linux and Embedded Systems" },
                      { label: "Compiled To", value: "Native Machine Code" },
                      { label: "Difficulty", value: "⭐⭐⭐⭐☆" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "Axum, Actix Web, Rocket, Tokio, Bevy" },
                      { label: "Used By", value: "Microsoft, Amazon, Cloudflare, Discord, Mozilla, Dropbox" },
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
                    {RUST_ROADMAP.map((lvl) => {
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
