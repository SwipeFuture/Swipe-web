"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for Java — its own dedicated file/route rather
// than a shared template, matching how every other Coding sub-page works.
// Real per-language copy (what it is, why to learn it, syntax, roadmap,
// etc.) hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "Java";
const TAGLINE = "Write once, run anywhere.";
const LOGO = "/java-logo-green.png";
const SUMMARY =
  "Build a strong foundation with one of the most widely used programming languages in the world. Java is trusted for enterprise software, Android development and large-scale applications thanks to its performance, reliability and portability.";

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

const JAVA_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with Java",
    goal: "Set up Java and write your first program.",
    learn: ["What is Java?", "Installing the JDK", "IntelliJ IDEA / Eclipse", "Your First Java Program", "The main() Method", "Compiling & Running Java"],
    project: "Hello Java",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how Java stores and manages data.",
    learn: ["Variables", "Primitive Data Types", "Strings", "Constants (final)", "Type Casting"],
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
    learn: ["for Loop", "while Loop", "do-while Loop", "break & continue", "Nested Loops"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Methods",
    goal: "Organize code into reusable methods.",
    learn: ["Creating Methods", "Parameters", "Return Values", "Method Overloading", "Scope"],
    project: "Math Utility Library",
  },
  {
    level: 7,
    color: "green",
    title: "Classes & Objects",
    goal: "Understand Java's object-oriented foundation.",
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
    goal: "Store and manage groups of data.",
    learn: ["Arrays", "ArrayList", "LinkedList", "HashSet", "HashMap"],
    project: "Student Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Exception Handling",
    goal: "Build reliable applications.",
    learn: ["try & catch", "finally", "throw", "throws", "Custom Exceptions"],
    project: "Secure Login System",
  },
  {
    level: 11,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["File Class", "Reading Files", "Writing Files", "BufferedReader", "FileWriter"],
    project: "Note-Taking Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "Generics",
    goal: "Write flexible and reusable code.",
    learn: ["Generic Classes", "Generic Methods", "Type Parameters", "Bounded Types", "Collections with Generics"],
    project: "Inventory Manager",
  },
  {
    level: 13,
    color: "yellow",
    title: "Working with Databases",
    goal: "Store and retrieve data.",
    learn: ["JDBC", "SQL Basics", "CRUD Operations", "Prepared Statements", "Database Connections"],
    project: "Library Management System",
  },
  {
    level: 14,
    color: "yellow",
    title: "Multithreading",
    goal: "Build applications that perform multiple tasks simultaneously.",
    learn: ["Threads", "Runnable Interface", "Thread Synchronization", "Executors", "Concurrency Basics"],
    project: "Download Manager",
  },
  {
    level: 15,
    color: "orange",
    title: "Spring Boot",
    goal: "Build modern backend applications.",
    learn: ["Spring Boot", "Dependency Injection", "Controllers", "Services", "REST APIs"],
    project: "Task Manager API",
  },
  {
    level: 16,
    color: "orange",
    title: "Hibernate & JPA",
    goal: "Simplify database development.",
    learn: ["ORM", "Hibernate", "JPA", "Entity Relationships", "Repository Pattern"],
    project: "Employee Database System",
  },
  {
    level: 17,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "JUnit", "Assertions", "Mocking", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 18,
    color: "orange",
    title: "Professional Java Development",
    goal: "Write clean and scalable production code.",
    learn: ["Maven", "Gradle", "Clean Code", "SOLID Principles", "Design Patterns"],
    project: "Enterprise Backend Application",
  },
  {
    level: 19,
    color: "red",
    title: "Deployment & DevOps",
    goal: "Prepare Java applications for production.",
    learn: ["Building JAR Files", "Docker", "CI/CD", "Cloud Deployment", "Git & GitHub"],
    project: "Deploy a Spring Boot Application",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering Java",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "Microservices", "Project Architecture", "Team Collaboration"],
    finalProjects: ["🏦 Banking Management System", "🛒 E-Commerce Backend", "📚 Online Learning Platform API", "💬 Real-Time Chat Server", "📦 Inventory Management System", "☁️ Cloud-Based REST API with Authentication"],
  },
];

const CAREER = `
Java is one of the most established programming languages in the software industry, making it an excellent choice for anyone pursuing a long-term career in technology. For decades, businesses around the world have relied on Java to build secure, scalable and high-performance applications. As a result, experienced Java developers continue to be in high demand across industries such as finance, healthcare, e-commerce, telecommunications and cloud computing.

One of the most common career paths is becoming a **Java Developer**. Java developers design, build and maintain applications using the Java programming language. Depending on the company, they may work on desktop software, backend services, enterprise systems or cloud applications.

Another popular role is **Backend Developer**. Backend developers use Java and frameworks like Spring Boot to build the server-side logic that powers websites and applications. They develop REST APIs, connect applications to databases, implement authentication systems and ensure that software remains secure and scalable.

Java is also widely used in **Enterprise Software Development**. Enterprise Developers create large-scale business applications for organizations such as banks, insurance companies, hospitals and government agencies. These systems often process millions of transactions and require high levels of reliability and security.

Developers interested in mobile technology can pursue a career as an **Android Developer**. While Kotlin has become Google's preferred language, Java is still fully supported and continues to power millions of Android applications. Understanding Java is valuable for maintaining existing Android projects and working with legacy codebases.

As cloud computing continues to grow, Java developers are increasingly working as **Cloud Developers** or **Cloud Engineers**. Using technologies like Spring Boot, Docker and cloud platforms such as AWS, Azure and Google Cloud, they build scalable services that power modern web applications.

With additional experience, Java developers can advance into senior technical roles such as Software Engineer, Senior Java Developer, Technical Lead, Solutions Architect or Software Architect. These positions involve designing complex systems, mentoring other developers and making important architectural decisions.

Common Java career paths include:

* Java Developer
* Backend Developer
* Software Engineer
* Enterprise Application Developer
* Android Developer
* Spring Boot Developer
* Full-Stack Developer
* Cloud Developer
* DevOps Engineer
* Solutions Architect
* Software Architect
* Technical Lead

Because Java has remained one of the world's leading programming languages for many years, learning Java provides excellent long-term career opportunities. Whether you're interested in web development, enterprise software, cloud computing or mobile applications, Java offers a strong foundation for building a successful career in software engineering.
`;

const RESOURCES = `
Learning Java is much easier when you use high-quality resources alongside your practice. The Java community has created thousands of tutorials, books, documentation websites and open-source projects that help beginners and experienced developers alike. The following resources are among the most trusted places to learn Java and continue improving your skills.

### Official Java Documentation

The official Java documentation provides comprehensive information about the language, standard libraries and development tools. It is the best place to learn how Java works directly from the source.

### Dev.java

Dev.java is Oracle's modern learning platform for Java developers. It offers beginner-friendly tutorials, guides, documentation and updates about the Java ecosystem.

### Oracle Java Tutorials

Oracle's tutorials cover Java fundamentals, object-oriented programming, collections, file handling, concurrency and many other important topics. They are an excellent reference while learning the language.

### Baeldung

Baeldung is one of the most popular Java learning websites. It contains thousands of practical articles covering Spring Boot, Hibernate, Java Core, security, testing, databases and modern backend development.

### GeeksforGeeks

GeeksforGeeks provides beginner-friendly explanations, coding problems and interview preparation resources covering nearly every Java topic.

### freeCodeCamp

freeCodeCamp offers free Java courses, programming tutorials and project-based learning resources for developers of all skill levels.

### Codecademy

Codecademy provides interactive Java courses that allow beginners to learn by writing code directly in the browser.

### GitHub

GitHub is an excellent place to explore real-world Java projects, contribute to open-source software and learn from experienced developers. Reading production-quality code is one of the best ways to improve your programming skills.

### LeetCode

LeetCode helps developers strengthen their problem-solving and algorithm skills through hundreds of coding challenges. It is widely used to prepare for technical interviews at software companies.

### Java Community

The Java community is one of the largest and most active programming communities in the world. Forums, blogs, YouTube channels, Discord servers and developer conferences provide endless opportunities to learn, ask questions and stay up to date with the latest technologies.

By combining official documentation, structured tutorials and hands-on practice, you'll build a strong understanding of Java and develop the skills needed to create professional applications. The most effective way to learn is by consistently writing code, building projects and exploring real-world software created by other developers.
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

const WHAT_IS = `
Java is a high-level, object-oriented programming language designed to be reliable, secure and platform-independent. Unlike some programming languages that are built for a single purpose, Java can be used to create everything from desktop applications and enterprise software to Android apps, cloud services and backend systems.

One of Java's most important features is its "Write Once, Run Anywhere" philosophy. Instead of compiling code directly into machine code for a specific operating system, Java compiles source code into bytecode. This bytecode is then executed by the Java Virtual Machine (JVM), allowing the same program to run on Windows, macOS, Linux and many other platforms without changing the source code.

To understand how Java works, it's helpful to know the three main components of the Java platform:

* JDK (Java Development Kit) – The complete toolkit developers use to create Java applications. It includes the compiler, development tools and the Java Runtime Environment.
* JRE (Java Runtime Environment) – The software required to run Java applications. It contains the JVM and supporting libraries but does not include development tools.
* JVM (Java Virtual Machine) – The virtual machine responsible for executing Java bytecode and translating it into instructions that your operating system understands.

Think of it like translating a book. Instead of writing separate versions for every language, the book is first translated into a universal format. The JVM then translates that format into the language of the computer it's running on.

Java was created in 1995 by James Gosling and his team at Sun Microsystems. Their goal was to build a language that was simple, secure and capable of running on many different devices without modification. This idea quickly made Java one of the most successful programming languages in the world.

Today, Java is trusted by banks, governments, healthcare providers and many of the world's largest technology companies. It powers millions of applications behind the scenes and remains one of the most important languages for enterprise software and backend development.
`;

const WHY_LEARN = `
Java has remained one of the world's most popular programming languages for nearly three decades. While many newer languages have appeared over the years, Java continues to play a major role in software development because of its reliability, performance and long-term stability.

One of Java's greatest strengths is its versatility. Developers use Java to build enterprise applications, backend systems, Android applications, cloud services and desktop software. Its ability to run on multiple operating systems without changing the code makes it an excellent choice for companies that need reliable cross-platform solutions.

Java is also an excellent language for learning the fundamentals of programming. Its clear syntax and strong object-oriented design encourage developers to write organized, structured and maintainable code. Concepts such as classes, objects, inheritance and encapsulation are easier to understand in Java, making it a popular choice in universities and computer science courses around the world.

Another major advantage is Java's enormous ecosystem. Frameworks such as Spring Boot, Hibernate and JavaFX allow developers to build everything from web applications to enterprise software. Because Java has been around for many years, it also has one of the largest developer communities, offering countless tutorials, books, open-source libraries and learning resources.

Java is also an excellent career choice. Thousands of companies rely on Java to power their business-critical applications, creating strong demand for skilled Java developers across industries such as finance, healthcare, e-commerce, telecommunications and cloud computing.

Whether your goal is to become a backend developer, software engineer or enterprise application developer, Java provides a strong foundation that will remain valuable throughout your programming career.
`;

const WHERE_USED = `
Java is used in many different areas of software development and continues to power millions of applications around the world. Its combination of performance, reliability and platform independence makes it one of the most versatile programming languages available today.

One of Java's most common uses is backend development. Many websites and online services rely on Java to process user requests, connect to databases, handle authentication and manage business logic behind the scenes. Large-scale platforms often choose Java because it performs well under heavy workloads and remains stable even as applications grow.

Java is also well known for enterprise software development. Banks, insurance companies, governments and multinational organizations use Java to build secure systems that manage financial transactions, customer information, healthcare records and other mission-critical data. These applications often need to operate continuously and reliably for many years, making Java an ideal choice.

Another major area is Android application development. For many years, Java was the primary language for building Android apps, and although Kotlin has become Google's preferred language, Java is still widely supported and used in countless existing Android projects.

Beyond web and mobile development, Java is used for desktop applications, cloud computing, scientific software, embedded systems and large distributed applications. Technologies such as Spring Boot have also made Java a popular choice for building modern cloud-native services and REST APIs.

Because of its mature ecosystem, excellent performance and long-term stability, Java continues to be trusted by organizations of every size. From small business applications to global enterprise systems serving millions of users, Java remains one of the most widely used and respected programming languages in the software industry.
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
Every programming language has its own syntax—a set of rules that tells the computer how to read and execute your code. Java follows a clear and structured syntax that encourages developers to write organized, readable and maintainable programs. Although Java may seem more detailed than some modern languages, its strict structure helps reduce mistakes and makes large applications easier to understand.

One of Java's defining characteristics is that almost everything is built around classes and objects. Even the simplest Java program is written inside a class, making object-oriented programming a fundamental part of the language.

Let's explore the core syntax that every Java developer should understand.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables allow you to store information that can be used throughout your program. Before storing a value, Java requires you to specify the type of data the variable will contain." },
      { type: "p", text: "For example, you might store a person's name, age and whether they have an account." },
      { type: "code", code: `String name = "Alex";\nint age = 22;\nboolean hasAccount = true;` },
      { type: "p", text: "Here, String stores text, int stores whole numbers and boolean stores either true or false." },
      { type: "p", text: "Java is a statically typed language, meaning once a variable has been declared with a specific type, it can only store values of that type." },
      { type: "code", code: `int age = 22;\n\nage = "Twenty-Two";` },
      { type: "p", text: "This produces a compilation error because a string cannot be stored inside an integer variable." },
      { type: "p", text: "Strong typing helps developers catch mistakes before the program even runs." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "Java supports many different data types, each designed to store a specific kind of information." },
      { type: "p", text: "Some of the most common primitive data types include:" },
      { type: "ul", items: ["int – Whole numbers", "double – Decimal numbers", "float – Decimal numbers with lower precision", "boolean – true or false", "char – A single character"] },
      { type: "p", text: "Java also includes reference types, such as:" },
      { type: "ul", items: ["String – Text", "Arrays – Collections of values", "Objects – Instances of classes"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `double price = 999.99;\nchar grade = 'A';\nString language = "Java";` },
      { type: "p", text: "Choosing the correct data type improves performance, reduces memory usage and makes programs easier to understand." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators allow Java to perform calculations, compare values and evaluate logical conditions." },
      { type: "p", text: "Arithmetic operators perform mathematical calculations." },
      { type: "code", code: `int a = 10;\nint b = 5;\n\nSystem.out.println(a + b);\nSystem.out.println(a - b);\nSystem.out.println(a * b);\nSystem.out.println(a / b);` },
      { type: "p", text: "Comparison operators determine whether conditions are true or false." },
      { type: "code", code: `int age = 18;\n\nSystem.out.println(age >= 18);\nSystem.out.println(age < 18);` },
      { type: "p", text: "Java also provides logical operators such as && (AND), || (OR) and ! (NOT), allowing developers to combine multiple conditions into a single expression." },
      { type: "p", text: "Operators are essential for calculations, decision-making and controlling program behavior." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions based on different situations." },
      { type: "p", text: "Java uses if, else if and else statements to execute different blocks of code depending on whether a condition is true." },
      { type: "code", code: `int age = 20;\n\nif (age >= 18) {\n    System.out.println("Access granted.");\n} else {\n    System.out.println("Access denied.");\n}` },
      { type: "p", text: "Java also provides the switch statement, which is useful when comparing one value against multiple possible options." },
      { type: "p", text: "Conditions allow programs to react intelligently to user input and changing data." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops allow developers to repeat code automatically instead of writing the same instructions many times." },
      { type: "p", text: "The most common loop in Java is the for loop." },
      { type: "code", code: `for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}` },
      { type: "p", text: "Java also supports while and do...while loops for situations where the number of repetitions is not known in advance." },
      { type: "p", text: "Loops are commonly used for processing files, displaying lists, searching data and performing repetitive calculations." },
    ],
  },
  {
    heading: "Methods",
    parts: [
      { type: "p", text: "Methods are reusable blocks of code that perform a specific task." },
      { type: "p", text: "Instead of writing the same instructions multiple times, you define a method once and call it whenever you need it." },
      { type: "code", code: `public static void greet(String name) {\n    System.out.println("Hello " + name + "!");\n}\n\ngreet("Alex");\ngreet("Emma");` },
      { type: "p", text: "Methods can receive parameters, perform calculations and optionally return values." },
      { type: "code", code: `public static int square(int number) {\n    return number * number;\n}` },
      { type: "p", text: "Using methods keeps programs organized, reduces duplicated code and makes applications much easier to maintain." },
    ],
  },
  {
    heading: "Classes",
    parts: [
      { type: "p", text: "Everything in Java revolves around classes." },
      { type: "p", text: "A class acts as a blueprint that defines what information an object should store and what actions it can perform." },
      { type: "code", code: `public class Car {\n\n    String brand;\n\n    public void drive() {\n        System.out.println("Driving...");\n    }\n\n}` },
      { type: "p", text: "Classes allow developers to organize related data and functionality into reusable structures, making programs more modular and easier to expand." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "An object is an instance of a class." },
      { type: "p", text: "Once a class has been created, you can create as many objects from it as you need." },
      { type: "code", code: `Car myCar = new Car();\n\nmyCar.brand = "Toyota";\n\nmyCar.drive();` },
      { type: "p", text: "Each object has its own data while sharing the same structure defined by its class." },
      { type: "p", text: "Objects are used throughout Java applications to represent people, products, orders, vehicles, bank accounts and many other real-world entities." },
    ],
  },
  {
    heading: "Arrays",
    parts: [
      { type: "p", text: "Arrays allow developers to store multiple values of the same type inside a single variable." },
      { type: "p", text: "Instead of creating many separate variables, you can keep related data together." },
      { type: "code", code: `String[] fruits = {\n    "Apple",\n    "Banana",\n    "Orange"\n};` },
      { type: "p", text: "Individual values can be accessed using their position in the array." },
      { type: "code", code: `System.out.println(fruits[0]);` },
      { type: "p", text: "Arrays are commonly used for storing lists of names, products, scores and many other collections of information." },
    ],
  },
  {
    heading: "Exception Handling",
    parts: [
      { type: "p", text: "Sometimes programs encounter unexpected situations, such as trying to open a file that doesn't exist or dividing a number by zero. These situations are called exceptions." },
      { type: "p", text: "Java provides exception handling to prevent programs from crashing unexpectedly." },
      { type: "code", code: `try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("An error occurred.");\n}` },
      { type: "p", text: "Using try and catch allows developers to handle errors gracefully and provide meaningful feedback to users." },
      { type: "p", text: "Exception handling is an essential part of writing reliable and professional Java applications." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Every Java application is built using these core concepts. Variables store information, data types define what kind of data can be stored, operators perform calculations, conditions make decisions, loops automate repetitive tasks and methods organize reusable logic. Classes and objects form the foundation of Java's object-oriented design, while arrays help organize collections of data and exception handling ensures programs remain stable even when unexpected errors occur." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for learning more advanced Java topics such as inheritance, interfaces, collections, multithreading, databases and frameworks like Spring Boot. These core concepts appear in almost every Java application and are essential for becoming a confident and professional Java developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "Java has one of the largest and most mature ecosystems in the programming world. Over the past three decades, developers have created powerful frameworks, build tools and development environments that make building modern Java applications faster, easier and more efficient." },
      { type: "p", text: "Whether you're developing web applications, enterprise software, desktop programs or cloud services, you'll use a variety of tools alongside the Java language itself. Learning these tools is an important step toward becoming a professional Java developer." },
    ],
  },
  {
    heading: "IntelliJ IDEA",
    parts: [
      { type: "p", text: "IntelliJ IDEA is one of the most popular Integrated Development Environments (IDEs) for Java development. Created by JetBrains, it provides powerful features that help developers write, test and debug code more efficiently." },
      { type: "p", text: "Some of its key features include:" },
      { type: "ul", items: ["Intelligent code completion", "Automatic error detection", "Refactoring tools", "Integrated debugger", "Git integration", "Maven and Gradle support"] },
      { type: "p", text: "Because of its productivity features and excellent user experience, IntelliJ IDEA is widely used by professional Java developers around the world." },
    ],
  },
  {
    heading: "Eclipse",
    parts: [
      { type: "p", text: "Eclipse is another well-known Java IDE that has been used for many years in education and enterprise development." },
      { type: "p", text: "It offers:" },
      { type: "ul", items: ["Java code editing", "Debugging tools", "Plugin support", "Version control integration", "Project management"] },
      { type: "p", text: "Although IntelliJ IDEA has become more popular in recent years, Eclipse is still used by many companies and universities." },
    ],
  },
  {
    heading: "Maven",
    parts: [
      { type: "p", text: "Maven is a build automation and dependency management tool." },
      { type: "p", text: "Instead of manually downloading libraries, Maven automatically installs and manages the dependencies your project needs." },
      { type: "p", text: "For example, adding the Spring Boot framework can be as simple as including it in your project configuration." },
      { type: "p", text: "Maven also helps developers:" },
      { type: "ul", items: ["Compile applications", "Run tests", "Package projects", "Manage project versions", "Download third-party libraries automatically"] },
      { type: "p", text: "Nearly every professional Java project uses either Maven or Gradle." },
    ],
  },
  {
    heading: "Gradle",
    parts: [
      { type: "p", text: "Gradle is another popular build tool that is known for its speed and flexibility." },
      { type: "p", text: "Like Maven, Gradle manages project dependencies and automates tasks such as compiling, testing and packaging applications." },
      { type: "p", text: "Many modern Java projects—including Android applications—use Gradle because of its powerful and customizable build system." },
    ],
  },
  {
    heading: "Spring Boot",
    parts: [
      { type: "p", text: "Spring Boot is the most popular Java framework for backend and enterprise development." },
      { type: "p", text: "It allows developers to build web applications, REST APIs and cloud services with minimal configuration." },
      { type: "p", text: "Spring Boot provides features such as:" },
      { type: "ul", items: ["Dependency Injection", "REST API development", "Database integration", "Security", "Microservices support", "Cloud deployment"] },
      { type: "p", text: "Because of its scalability and ease of use, Spring Boot has become the industry standard for modern Java backend development." },
    ],
  },
  {
    heading: "Hibernate",
    parts: [
      { type: "p", text: "Hibernate is an Object-Relational Mapping (ORM) framework." },
      { type: "p", text: "Instead of writing large amounts of SQL code, Hibernate allows developers to work directly with Java objects while automatically handling communication with the database." },
      { type: "p", text: "This simplifies tasks such as:" },
      { type: "ul", items: ["Saving data", "Updating records", "Deleting information", "Retrieving objects from databases"] },
      { type: "p", text: "Hibernate is commonly used together with Spring Boot in enterprise applications." },
    ],
  },
  {
    heading: "JavaFX",
    parts: [
      { type: "p", text: "JavaFX is Java's modern framework for building desktop applications with graphical user interfaces." },
      { type: "p", text: "Developers can create applications containing:" },
      { type: "ul", items: ["Buttons", "Menus", "Tables", "Charts", "Forms", "Animations"] },
      { type: "p", text: "JavaFX is widely used for educational software, business applications and desktop tools." },
    ],
  },
  {
    heading: "JUnit",
    parts: [
      { type: "p", text: "JUnit is the standard testing framework for Java." },
      { type: "p", text: "Instead of manually checking whether code works correctly, developers can write automated tests that verify their applications behave as expected." },
      { type: "p", text: "Automated testing helps:" },
      { type: "ul", items: ["Prevent bugs", "Improve code quality", "Simplify maintenance", "Increase confidence when making changes"] },
      { type: "p", text: "Testing is an essential part of professional software development, and JUnit is one of the most widely used testing frameworks in the Java ecosystem." },
    ],
  },
  {
    heading: "Git & GitHub",
    parts: [
      { type: "p", text: "Although not exclusive to Java, Git and GitHub are essential tools for every Java developer." },
      { type: "p", text: "Git is a version control system that tracks changes to your code, while GitHub provides an online platform for storing repositories and collaborating with other developers." },
      { type: "p", text: "Using Git allows developers to:" },
      { type: "ul", items: ["Track project history", "Work in teams", "Restore previous versions", "Create feature branches", "Contribute to open-source projects"] },
      { type: "p", text: "Version control is considered a fundamental skill for professional software engineers." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Learning Java is only the beginning of becoming a professional developer. Real-world applications are built using an ecosystem of frameworks and tools that simplify development, improve code quality and make collaboration easier." },
      { type: "p", text: "IDEs like IntelliJ IDEA and Eclipse help you write code efficiently, while Maven and Gradle automate building and managing projects. Frameworks such as Spring Boot and Hibernate enable developers to create powerful web applications and enterprise systems with less effort. JavaFX provides tools for building desktop applications, JUnit ensures software remains reliable through automated testing, and Git & GitHub make collaboration and version control possible." },
      { type: "p", text: "As you progress through your Java journey, you'll gradually become familiar with these tools. Together, they form the foundation of the modern Java ecosystem and are used daily by millions of developers around the world." },
    ],
  },
];

export default function Java() {
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
                      { label: "Created By", value: "James Gosling (Sun Microsystems)" },
                      { label: "Latest Version", value: "Java 24" },
                      { label: "Typing", value: "Static" },
                      { label: "Paradigm", value: "Object-Oriented, Class-Based" },
                      { label: "Primary Use", value: "Enterprise Software, Backend, Android" },
                      { label: "Runs On", value: "JVM (Java Virtual Machine)" },
                      { label: "Compiled To", value: "Java Bytecode" },
                      { label: "Difficulty", value: "⭐⭐⭐☆☆ Intermediate" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "Spring Boot, Jakarta EE, Hibernate, JavaFX" },
                      { label: "Used By", value: "Netflix, LinkedIn, Uber, Amazon, Spotify" },
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
                    {JAVA_ROADMAP.map((lvl) => {
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
