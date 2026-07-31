"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ================= Content =================
//
// Standalone detail page for Python — its own dedicated file/route rather
// than a shared template, matching how every other Coding sub-page works.
// Real per-language copy (what it is, why to learn it, syntax, roadmap,
// etc.) hasn't been written yet, so every prose section falls back to
// PLACEHOLDER.

const NAME = "Python";
const TAGLINE = "Simple to read, powerful to use.";
const LOGO = "/pytho-logo-green.png";
const SUMMARY =
  "Discover one of the world's most versatile programming languages. Python's simple syntax and powerful ecosystem make it an excellent choice for beginners, automation, artificial intelligence, data science and backend development.";

const PLACEHOLDER = "Content for this section is coming soon.";

const WHAT_IS = `
Python is a high-level, interpreted programming language known for its simple syntax, readability and versatility. It was designed to help developers write clear, efficient code while reducing unnecessary complexity. Because of its beginner-friendly design, Python is often one of the first programming languages people learn, but it is also powerful enough to build large-scale professional applications.

Unlike compiled languages, Python is an interpreted language. This means your code is executed line by line by the Python interpreter instead of being compiled into machine code before running. This makes development faster, simplifies testing and allows developers to quickly experiment with new ideas.

One of Python's greatest strengths is its clean and readable syntax. Programs written in Python often require fewer lines of code than many other programming languages, making them easier to understand and maintain. Instead of focusing on complex syntax, developers can spend more time solving real-world problems.

Python was created by Guido van Rossum and first released in 1991. His goal was to create a language that emphasized readability, simplicity and developer productivity. Over the years, Python has grown into one of the world's most popular programming languages.

Today, Python is used in many different fields, including web development, data science, artificial intelligence, machine learning, automation, cybersecurity and scientific computing. Companies such as Google, Netflix, Spotify, NASA and OpenAI use Python to build reliable applications and process large amounts of data.

Thanks to its massive ecosystem of libraries and frameworks, Python allows developers to build almost any type of software—from simple scripts to advanced AI systems—making it one of the most versatile programming languages available today.
`;

const WHY_LEARN = `
Python has become one of the most popular programming languages in the world, and for good reason. Its simple syntax, powerful features and enormous ecosystem make it an excellent choice for beginners and experienced developers alike.

One of Python's biggest advantages is its readability. The language is designed to resemble plain English, making code easier to understand and write. Beginners can focus on learning programming concepts without getting overwhelmed by complicated syntax, while experienced developers benefit from cleaner and more maintainable code.

Python is also incredibly versatile. Developers use it to build websites, automate repetitive tasks, analyze data, create desktop applications, develop artificial intelligence systems and much more. Instead of learning several specialized languages, Python allows you to work across many different areas of software development.

Another major advantage is Python's extensive collection of libraries and frameworks. Tools like Django, Flask, FastAPI, NumPy, Pandas, TensorFlow and PyTorch make it possible to build professional applications with less code and greater efficiency. These libraries save developers time by providing ready-made solutions for common programming tasks.

Python also has one of the largest programming communities in the world. Millions of developers contribute tutorials, open-source projects, documentation and educational resources, making it easy to find help whenever you encounter a problem.

From a career perspective, Python is one of the most valuable programming languages to learn. It is widely used in industries such as software development, finance, healthcare, robotics, cybersecurity, cloud computing and artificial intelligence. As technology continues to evolve, the demand for skilled Python developers remains consistently high.

Whether your goal is to become a software engineer, data scientist, AI engineer or automation specialist, Python provides an excellent foundation for a successful career in technology.
`;

const WHERE_USED = `
Python is one of the most versatile programming languages in the world and is used across nearly every area of software development. Its simplicity, flexibility and powerful ecosystem make it suitable for projects ranging from small automation scripts to large-scale enterprise applications.

One of Python's most common uses is web development. Frameworks such as Django, Flask and FastAPI allow developers to build secure websites, REST APIs and scalable backend services. Many modern web applications rely on Python to handle databases, user authentication and server-side logic.

Python is also the leading language for data science and data analysis. Libraries like NumPy, Pandas and Matplotlib help developers process, analyze and visualize large amounts of data. Businesses use Python to gain insights, generate reports and make data-driven decisions.

Another major area is artificial intelligence and machine learning. Frameworks such as TensorFlow, PyTorch and scikit-learn enable developers to build intelligent systems capable of image recognition, natural language processing, recommendation systems and predictive analytics. Because of these powerful tools, Python has become the industry standard for AI development.

Python is also widely used for automation and scripting. Developers write Python scripts to automate repetitive tasks such as renaming files, processing documents, managing servers and interacting with APIs. This helps save time and improve productivity.

Beyond these fields, Python is used in cybersecurity, cloud computing, scientific research, robotics, game development, desktop applications and Internet of Things (IoT) projects. Its cross-platform compatibility allows applications to run on Windows, macOS and Linux with minimal changes.

Because of its flexibility and enormous ecosystem, Python continues to be one of the most widely used programming languages in the world. Whether you're building websites, training AI models, analyzing data or automating everyday tasks, Python provides the tools needed to create powerful and efficient software.
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

const CORE_SYNTAX_INTRO = `
Every programming language has its own syntax—a set of rules that defines how code is written and executed. Python is well known for having one of the simplest and most readable syntaxes of any programming language. Instead of using lots of punctuation or complex keywords, Python focuses on clean, easy-to-read code.

One of Python's unique features is that it uses indentation to define blocks of code. Rather than using curly braces, Python relies on consistent spacing, making programs more organized and easier to understand.

Let's explore the core syntax that every Python developer should know.
`;

const CORE_SYNTAX_BLOCKS: ContentBlock[] = [
  {
    heading: "Variables",
    parts: [
      { type: "p", text: "Variables allow you to store information that can be used throughout your program." },
      { type: "p", text: "Unlike many programming languages, Python does not require you to specify a variable's data type when creating it. Python automatically determines the correct type based on the assigned value." },
      { type: "code", code: `name = "Alex"\nage = 22\nis_student = True` },
      { type: "p", text: "Variables can be updated at any time by assigning a new value." },
      { type: "code", code: `age = 23` },
      { type: "p", text: "This flexibility makes Python easy to learn while still being powerful enough for professional development." },
    ],
  },
  {
    heading: "Data Types",
    parts: [
      { type: "p", text: "Python supports several built-in data types for storing different kinds of information." },
      { type: "p", text: "Some of the most common data types include:" },
      { type: "ul", items: ["int – Whole numbers", "float – Decimal numbers", "str – Text", "bool – True or False", "list – Ordered collections", "tuple – Immutable collections", "dict – Key-value pairs", "set – Unique values"] },
      { type: "p", text: "Example:" },
      { type: "code", code: `price = 999.99\nlanguage = "Python"\nrating = 4.8` },
      { type: "p", text: "Choosing the appropriate data type helps keep programs efficient and easy to understand." },
    ],
  },
  {
    heading: "Operators",
    parts: [
      { type: "p", text: "Operators allow Python to perform calculations, compare values and evaluate logical expressions." },
      { type: "p", text: "Arithmetic operators perform mathematical operations." },
      { type: "code", code: `a = 10\nb = 5\n\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)` },
      { type: "p", text: "Comparison operators compare values." },
      { type: "code", code: `age = 18\n\nprint(age >= 18)\nprint(age < 18)` },
      { type: "p", text: "Logical operators such as and, or and not allow multiple conditions to be combined into a single expression." },
      { type: "p", text: "Operators are used throughout nearly every Python application." },
    ],
  },
  {
    heading: "Conditions",
    parts: [
      { type: "p", text: "Programs often need to make decisions based on different situations." },
      { type: "p", text: "Python uses if, elif and else statements for conditional logic." },
      { type: "code", code: `age = 20\n\nif age >= 18:\n    print("Access granted")\nelse:\n    print("Access denied")` },
      { type: "p", text: "Notice that Python uses indentation instead of curly braces to define code blocks." },
      { type: "p", text: "Conditions allow applications to respond intelligently to user input and changing data." },
    ],
  },
  {
    heading: "Loops",
    parts: [
      { type: "p", text: "Loops repeat code automatically, making programs shorter and more efficient." },
      { type: "p", text: "The for loop is commonly used to iterate through sequences." },
      { type: "code", code: `for i in range(5):\n    print(i)` },
      { type: "p", text: "Python also supports while loops." },
      { type: "code", code: `count = 1\n\nwhile count <= 5:\n    print(count)\n    count += 1` },
      { type: "p", text: "Loops are useful for processing files, displaying data, performing calculations and automating repetitive tasks." },
    ],
  },
  {
    heading: "Functions",
    parts: [
      { type: "p", text: "Functions are reusable blocks of code that perform specific tasks." },
      { type: "p", text: "Instead of repeating the same code multiple times, you define a function once and call it whenever needed." },
      { type: "code", code: `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alex")` },
      { type: "p", text: "Functions can receive parameters and return values." },
      { type: "code", code: `def square(number):\n    return number * number` },
      { type: "p", text: "Using functions makes programs cleaner, more organized and easier to maintain." },
    ],
  },
  {
    heading: "Classes",
    parts: [
      { type: "p", text: "Python supports object-oriented programming through classes." },
      { type: "p", text: "A class acts as a blueprint that defines the properties and behavior of objects." },
      { type: "code", code: `class Car:\n    def drive(self):\n        print("Driving...")` },
      { type: "p", text: "Classes help organize related data and functionality into reusable structures." },
    ],
  },
  {
    heading: "Objects",
    parts: [
      { type: "p", text: "An object is an instance of a class." },
      { type: "p", text: "Once a class has been created, you can create multiple objects from it." },
      { type: "code", code: `my_car = Car()\n\nmy_car.drive()` },
      { type: "p", text: "Objects are used to represent real-world entities such as users, products, vehicles and orders." },
    ],
  },
  {
    heading: "Lists",
    parts: [
      { type: "p", text: "Lists allow developers to store multiple values inside a single variable." },
      { type: "code", code: `fruits = ["Apple", "Banana", "Orange"]` },
      { type: "p", text: "Individual items can be accessed using their index." },
      { type: "code", code: `print(fruits[0])` },
      { type: "p", text: "Lists are one of Python's most commonly used data structures because they are flexible, dynamic and easy to work with." },
    ],
  },
  {
    heading: "Exception Handling",
    parts: [
      { type: "p", text: "Sometimes programs encounter unexpected errors. Python provides exception handling so applications can continue running instead of crashing." },
      { type: "code", code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("An error occurred.")` },
      { type: "p", text: "Using try and except allows developers to handle errors gracefully and improve the reliability of their applications." },
    ],
  },
  {
    heading: "Bringing Everything Together",
    parts: [
      { type: "p", text: "Python applications are built using these core concepts. Variables store information, data types define the kind of data being used, operators perform calculations, conditions make decisions and loops automate repetitive tasks. Functions organize reusable logic, while classes and objects support object-oriented programming. Lists help manage collections of data, and exception handling ensures programs can respond safely to unexpected situations." },
      { type: "p", text: "By mastering these fundamentals, you'll build a strong foundation for learning more advanced Python topics such as web development, data analysis, artificial intelligence, automation and machine learning. These concepts appear in almost every Python application and are essential for becoming a confident and professional Python developer." },
    ],
  },
];

const FRAMEWORKS_BLOCKS: ContentBlock[] = [
  {
    parts: [
      { type: "p", text: "Python has one of the largest and most diverse ecosystems of any programming language. Thousands of libraries, frameworks and development tools allow developers to build everything from websites and desktop applications to artificial intelligence systems and data analysis software." },
      { type: "p", text: "Learning Python is only the beginning. As you progress, you'll use different frameworks and tools depending on the type of applications you want to build. Together, these technologies make Python one of the most powerful and versatile programming languages in the world." },
    ],
  },
  {
    heading: "Django",
    parts: [
      { type: "p", text: "Django is one of the most popular Python web frameworks. It is designed to help developers build secure, scalable and feature-rich web applications quickly." },
      { type: "p", text: "Django includes many built-in features such as:" },
      { type: "ul", items: ["User Authentication", "Database Management", "Admin Dashboard", "URL Routing", "Security Features", "Template Engine"] },
      { type: "p", text: "Because of its \"batteries included\" philosophy, Django is widely used for large web applications and enterprise projects." },
    ],
  },
  {
    heading: "Flask",
    parts: [
      { type: "p", text: "Flask is a lightweight Python web framework that gives developers more flexibility and control." },
      { type: "p", text: "Unlike Django, Flask provides only the essentials, allowing developers to choose their own libraries and project structure." },
      { type: "p", text: "Flask is commonly used for:" },
      { type: "ul", items: ["REST APIs", "Small Web Applications", "Backend Services", "Learning Web Development", "Prototypes"] },
      { type: "p", text: "Its simplicity makes it a popular choice for beginners and experienced developers alike." },
    ],
  },
  {
    heading: "FastAPI",
    parts: [
      { type: "p", text: "FastAPI is a modern Python framework for building high-performance APIs." },
      { type: "p", text: "It automatically generates interactive API documentation and provides excellent performance while remaining easy to use." },
      { type: "p", text: "FastAPI offers features such as:" },
      { type: "ul", items: ["REST API Development", "Automatic Documentation", "Data Validation", "Type Hints", "High Performance", "Asynchronous Programming"] },
      { type: "p", text: "Today, FastAPI is one of the fastest-growing backend frameworks in the Python ecosystem." },
    ],
  },
  {
    heading: "NumPy",
    parts: [
      { type: "p", text: "NumPy is the foundation of scientific computing in Python." },
      { type: "p", text: "It provides powerful tools for working with numerical data, including multi-dimensional arrays and advanced mathematical operations." },
      { type: "p", text: "NumPy is commonly used for:" },
      { type: "ul", items: ["Mathematical Calculations", "Scientific Computing", "Data Processing", "Linear Algebra", "Machine Learning"] },
      { type: "p", text: "Many other Python libraries are built on top of NumPy." },
    ],
  },
  {
    heading: "Pandas",
    parts: [
      { type: "p", text: "Pandas is one of the most widely used libraries for data analysis and manipulation." },
      { type: "p", text: "It allows developers to organize, clean, filter and analyze large datasets efficiently." },
      { type: "p", text: "Pandas is frequently used for:" },
      { type: "ul", items: ["Data Analysis", "Data Cleaning", "CSV & Excel Files", "Reporting", "Business Intelligence"] },
      { type: "p", text: "It is considered an essential tool for data scientists and analysts." },
    ],
  },
  {
    heading: "TensorFlow",
    parts: [
      { type: "p", text: "TensorFlow is an open-source machine learning framework developed by Google." },
      { type: "p", text: "It allows developers to build and train artificial intelligence models for tasks such as image recognition, speech processing and natural language processing." },
      { type: "p", text: "TensorFlow is widely used in:" },
      { type: "ul", items: ["Machine Learning", "Deep Learning", "Computer Vision", "AI Research", "Neural Networks"] },
      { type: "p", text: "It powers many modern AI applications." },
    ],
  },
  {
    heading: "PyTorch",
    parts: [
      { type: "p", text: "PyTorch is another leading machine learning framework, developed by Meta." },
      { type: "p", text: "Known for its flexibility and ease of use, PyTorch has become one of the most popular frameworks for deep learning research and AI development." },
      { type: "p", text: "Developers use PyTorch for:" },
      { type: "ul", items: ["Neural Networks", "Deep Learning", "AI Research", "Computer Vision", "Natural Language Processing"] },
      { type: "p", text: "Many universities and research organizations prefer PyTorch because of its intuitive design." },
    ],
  },
  {
    heading: "Visual Studio Code",
    parts: [
      { type: "p", text: "Visual Studio Code is one of the most popular code editors for Python development." },
      { type: "p", text: "With the Python extension installed, it provides features such as:" },
      { type: "ul", items: ["Intelligent Code Completion", "Integrated Debugging", "Syntax Highlighting", "Git Integration", "Terminal Support", "Extension Marketplace"] },
      { type: "p", text: "Its lightweight design and extensive customization make it a favorite among Python developers." },
    ],
  },
  {
    heading: "pip",
    parts: [
      { type: "p", text: "pip is Python's official package manager." },
      { type: "p", text: "It allows developers to install, update and manage thousands of third-party libraries from the Python Package Index (PyPI)." },
      { type: "p", text: "Using pip, installing a library often requires only a single command, making dependency management simple and efficient." },
    ],
  },
  {
    heading: "Why These Tools Matter",
    parts: [
      { type: "p", text: "Python's success comes not only from the language itself but also from its incredible ecosystem of frameworks and libraries. Tools like Django, Flask and FastAPI simplify web development, while NumPy and Pandas make data analysis fast and efficient. Frameworks such as TensorFlow and PyTorch power modern artificial intelligence and machine learning applications, and development tools like Visual Studio Code and pip help developers write, manage and maintain professional Python projects." },
      { type: "p", text: "As you continue learning Python, you'll gradually discover which frameworks best match your interests. Whether you want to build websites, automate tasks, analyze data or create AI systems, Python provides an ecosystem of tools that supports nearly every area of modern software development." },
    ],
  },
];

const PY_ROADMAP: RoadmapLevel[] = [
  {
    level: 1,
    color: "green",
    title: "Getting Started with Python",
    goal: "Set up Python and write your first program.",
    learn: ["What is Python?", "Installing Python", "Python Interpreter", "VS Code Setup", "Running Python Programs", "Your First Python Script"],
    project: "Hello Python",
  },
  {
    level: 2,
    color: "green",
    title: "Variables & Data Types",
    goal: "Learn how Python stores and manages data.",
    learn: ["Variables", "Primitive Data Types", "Strings", "Type Conversion", "User Input"],
    project: "Student Information System",
  },
  {
    level: 3,
    color: "green",
    title: "Operators",
    goal: "Perform calculations and compare values.",
    learn: ["Arithmetic Operators", "Comparison Operators", "Logical Operators", "Assignment Operators", "Membership Operators"],
    project: "Simple Calculator",
  },
  {
    level: 4,
    color: "green",
    title: "Conditions",
    goal: "Control the flow of your applications.",
    learn: ["if Statements", "elif", "else", "Nested Conditions", "Match Statement"],
    project: "Grade Calculator",
  },
  {
    level: 5,
    color: "green",
    title: "Loops",
    goal: "Automate repetitive tasks.",
    learn: ["for Loops", "while Loops", "range()", "break & continue", "Nested Loops"],
    project: "Number Guessing Game",
  },
  {
    level: 6,
    color: "green",
    title: "Functions",
    goal: "Write reusable and organized code.",
    learn: ["Creating Functions", "Parameters", "Return Values", "Default Arguments", "Lambda Functions"],
    project: "Math Utility Library",
  },
  {
    level: 7,
    color: "green",
    title: "Lists, Tuples & Sets",
    goal: "Organize collections of data.",
    learn: ["Lists", "Tuples", "Sets", "List Methods", "List Comprehensions"],
    project: "Shopping List Manager",
  },
  {
    level: 8,
    color: "green",
    title: "Dictionaries",
    goal: "Store structured key-value data.",
    learn: ["Dictionaries", "Keys & Values", "Dictionary Methods", "Nested Dictionaries", "Iterating Dictionaries"],
    project: "Contact Book",
  },
  {
    level: 9,
    color: "yellow",
    title: "Object-Oriented Programming",
    goal: "Build reusable object-oriented applications.",
    learn: ["Classes", "Objects", "Constructors", "Inheritance", "Encapsulation"],
    project: "Library Management System",
  },
  {
    level: 10,
    color: "yellow",
    title: "Modules & Packages",
    goal: "Organize large Python projects.",
    learn: ["Importing Modules", "Creating Modules", "Packages", "Standard Library", "pip"],
    project: "Multi-Module Calculator",
  },
  {
    level: 11,
    color: "yellow",
    title: "File Handling",
    goal: "Read and write files.",
    learn: ["Reading Files", "Writing Files", "CSV Files", "JSON Files", "File Paths"],
    project: "Note-Taking Application",
  },
  {
    level: 12,
    color: "yellow",
    title: "Exception Handling",
    goal: "Build reliable applications.",
    learn: ["try", "except", "finally", "Raising Exceptions", "Custom Exceptions"],
    project: "Login System",
  },
  {
    level: 13,
    color: "yellow",
    title: "Working with APIs",
    goal: "Build applications that communicate with external services.",
    learn: ["HTTP Requests", "REST APIs", "JSON", "Authentication", "API Responses"],
    project: "Weather Dashboard",
  },
  {
    level: 14,
    color: "yellow",
    title: "Working with Databases",
    goal: "Store and retrieve application data.",
    learn: ["SQLite", "SQL Basics", "CRUD Operations", "Database Connections", "ORM Basics"],
    project: "Inventory Management System",
  },
  {
    level: 15,
    color: "orange",
    title: "Web Development",
    goal: "Build modern web applications.",
    learn: ["Flask", "Django", "FastAPI", "Routing", "Templates"],
    project: "Personal Portfolio Website",
  },
  {
    level: 16,
    color: "orange",
    title: "Data Science & Machine Learning",
    goal: "Analyze data and build intelligent applications.",
    learn: ["NumPy", "Pandas", "Matplotlib", "TensorFlow", "PyTorch"],
    project: "Sales Data Analyzer",
  },
  {
    level: 17,
    color: "orange",
    title: "Automation & Scripting",
    goal: "Automate repetitive tasks.",
    learn: ["File Automation", "Web Scraping", "Scheduling Tasks", "Email Automation", "Selenium"],
    project: "File Organizer",
  },
  {
    level: 18,
    color: "orange",
    title: "Testing",
    goal: "Ensure your applications work correctly.",
    learn: ["Unit Testing", "pytest", "Mocking", "Assertions", "Test Coverage"],
    project: "Test Suite for an Existing Project",
  },
  {
    level: 19,
    color: "red",
    title: "Professional Python",
    goal: "Write clean and scalable production code.",
    learn: ["Clean Code", "SOLID Principles", "Design Patterns", "Project Structure", "Git & GitHub"],
    project: "Enterprise Automation Tool",
  },
  {
    level: 20,
    color: "red",
    title: "Mastering Python",
    goal: "Apply everything you've learned by building real-world applications.",
    learn: ["Performance Optimization", "Security Best Practices", "Deployment", "CI/CD", "Team Collaboration"],
    finalProjects: ["🤖 AI Chatbot", "🌐 Full-Stack Web Application", "📊 Data Analytics Dashboard", "🛒 E-Commerce Backend", "📋 Task Management Platform", "☁️ Cloud-Based REST API with Authentication"],
  },
];

const CAREER = `
Python is one of the most in-demand programming languages in the world and is used across a wide range of industries. Its versatility allows developers to work in web development, data science, artificial intelligence, automation, cybersecurity and many other fields. Because of its broad adoption, learning Python can open the door to numerous exciting career opportunities.

One of the most common career paths is becoming a **Python Developer**. Python developers build, maintain and improve applications using the Python programming language. Depending on the company, they may develop websites, backend systems, automation tools or desktop applications.

Python is also the leading language for **Data Science and Machine Learning**. Data Scientists analyze large datasets to uncover patterns and generate insights that help organizations make better decisions. Machine Learning Engineers build intelligent systems capable of making predictions, recognizing images, understanding speech and processing natural language.

Another popular role is **Backend Developer**. Using frameworks such as Django, Flask and FastAPI, backend developers build REST APIs, manage databases, implement authentication systems and develop the server-side logic that powers modern web applications.

Python is widely used in **Automation Engineering**, where developers create scripts that automate repetitive tasks, manage servers, process files and integrate different software systems. Businesses rely on automation to improve productivity and reduce manual work.

In the field of **Cybersecurity**, Python is used for penetration testing, security analysis, vulnerability scanning and forensic investigations. Its simplicity and extensive libraries make it a favorite language among security professionals.

As organizations increasingly adopt cloud technologies, Python developers are also working as **Cloud Engineers**, building scalable cloud services, serverless applications and deployment pipelines on platforms such as AWS, Microsoft Azure and Google Cloud.

Common Python career paths include:

* Python Developer
* Backend Developer
* Software Engineer
* Data Scientist
* Machine Learning Engineer
* AI Engineer
* Data Analyst
* Automation Engineer
* Cloud Engineer
* Cybersecurity Engineer
* DevOps Engineer
* Full-Stack Developer

Because Python is used in so many different industries, it provides excellent long-term career opportunities. Whether you're interested in web development, artificial intelligence, automation or data science, Python offers a strong foundation for building a successful career in modern software development.
`;

const RESOURCES = `
Learning Python becomes much easier when you combine hands-on practice with high-quality learning resources. Thanks to its enormous community, Python has one of the largest collections of tutorials, documentation, books and open-source projects available for developers of all experience levels.

### Official Python Documentation

The official Python documentation is the best place to learn the language directly from its creators. It covers everything from basic syntax to advanced language features and the Python Standard Library.

### Python.org

Python.org provides downloads, documentation, tutorials, release notes and information about the Python ecosystem. It is the official home of the Python programming language.

### Real Python

Real Python is one of the most popular learning platforms for Python developers. It offers in-depth tutorials, practical guides and real-world projects covering topics such as web development, automation, data science and software engineering.

### freeCodeCamp

freeCodeCamp provides free Python courses, programming tutorials and project-based learning resources for beginners and experienced developers alike.

### Codecademy

Codecademy offers interactive Python courses that allow you to practice coding directly in your browser while learning fundamental programming concepts.

### GeeksforGeeks

GeeksforGeeks contains thousands of Python articles, coding problems and interview preparation resources covering everything from beginner topics to advanced algorithms.

### GitHub

GitHub is an excellent place to explore open-source Python projects, contribute to the community and learn by reading production-quality code written by experienced developers.

### LeetCode

LeetCode helps developers improve their problem-solving and algorithm skills through hundreds of coding challenges. It is widely used to prepare for software engineering interviews.

### Kaggle

Kaggle is one of the world's largest communities for data science and machine learning. It offers datasets, notebooks, competitions and tutorials that help developers practice real-world data analysis and AI projects.

### Python Community

The Python community is one of the largest and most welcoming programming communities in the world. Countless forums, blogs, YouTube channels, Discord servers and conferences provide opportunities to ask questions, learn from others and stay up to date with the latest developments.

By combining official documentation, interactive tutorials and consistent hands-on practice, you'll develop a strong understanding of Python and the skills needed to build professional applications. The best way to improve is by writing code regularly, building real-world projects and continuously exploring the rich Python ecosystem.
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

export default function Python() {
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
                      { label: "First Released", value: "1991" },
                      { label: "Created By", value: "Guido van Rossum" },
                      { label: "Latest Version", value: "Python 3.13" },
                      { label: "Typing", value: "Dynamic, Strong" },
                      { label: "Paradigm", value: "Multi-Paradigm (Object-Oriented, Procedural, Functional)" },
                      { label: "Primary Use", value: "General-Purpose Programming, AI, Data Science & Web Development" },
                      { label: "Runs On", value: "Windows, macOS, Linux and many other platforms" },
                      { label: "Compiled To", value: "Bytecode (executed by the Python Interpreter)" },
                      { label: "Difficulty", value: "⭐⭐☆☆☆" },
                      { label: "Open Source", value: "Yes" },
                      { label: "Popular Frameworks", value: "Django, Flask, FastAPI, NumPy, Pandas, TensorFlow, PyTorch" },
                      { label: "Used By", value: "Google, Netflix, Spotify, NASA, OpenAI, Instagram, Dropbox" },
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
                    {PY_ROADMAP.map((lvl) => {
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
