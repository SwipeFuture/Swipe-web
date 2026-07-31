// Shared language data for the Programming Languages overview page and each
// individual language's detail page (app/coding/programming-languages/[slug]).

export type Language = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  bestFor: string;
  difficulty: string;
  // Logo assets follow the "language-logo-green.png" naming convention —
  // set once the file exists in /public; languages without one show a
  // placeholder on the empty side of their section instead.
  logo?: string;
};

export const LANGUAGES: Language[] = [
  {
    slug: "javascript",
    name: "JavaScript",
    tagline: "The language of the web.",
    summary:
      "JavaScript is the programming language that powers interactivity across the internet, running natively in every web browser without any extra setup. It was originally created to make simple webpages more dynamic, but has since grown into one of the most versatile languages in the world, used for everything from small UI animations to massive full-stack applications. Because it runs on both the frontend and, through Node.js, the backend, JavaScript lets developers build entire products using a single language. Its massive ecosystem of libraries and frameworks — React, Vue, Express and countless others — means there's almost always a tool ready for whatever you're trying to build. JavaScript's flexible, forgiving syntax makes it approachable for beginners, while its depth keeps experienced developers engaged for years. If you want to build anything that lives in a browser, JavaScript is where you start.",
    bestFor: "Websites, web apps, browser interactivity, full-stack development",
    difficulty: "Beginner-Friendly",
    logo: "/java-script-logo-green.png",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    tagline: "JavaScript, with guardrails.",
    summary:
      "TypeScript is a superset of JavaScript that adds static typing, catching errors before your code ever runs instead of after it breaks in production. It was created by Microsoft to help developers manage large, complex codebases where plain JavaScript's flexibility can quickly turn into a liability. Every valid JavaScript file is technically valid TypeScript, so developers can adopt it gradually rather than rewriting an entire project overnight. Modern frameworks like Next.js, Angular and most enterprise-grade React projects default to TypeScript because of the safety and clarity it brings to teams working on the same codebase. Features like autocomplete, inline documentation and compile-time error checking make development faster and far less error-prone. While it adds a small learning curve on top of JavaScript, most developers find that curve pays for itself the moment a project grows past a handful of files.",
    bestFor: "Large applications, team projects, professional frontend & full-stack development",
    difficulty: "Beginner-Intermediate",
    logo: "/type-script-logo-green.png",
  },
  {
    slug: "python",
    name: "Python",
    tagline: "Simple to read, powerful to use.",
    summary:
      "Python is famous for its clean, readable syntax that often looks close to plain English, making it one of the most beginner-friendly programming languages ever created. Despite its simplicity, Python is a serious, general-purpose language used to build everything from simple scripts to massive machine learning systems. It dominates the fields of data science, artificial intelligence and automation thanks to libraries like NumPy, Pandas and TensorFlow. Python is also a popular choice for backend web development through frameworks like Django and Flask, and it's frequently used to automate repetitive tasks that would otherwise eat up hours of manual work. Its huge, welcoming community means that almost any problem you run into already has an answer, tutorial or library waiting for you. For many people, Python is the friendliest possible entry point into programming.",
    bestFor: "Data science, AI & machine learning, automation, backend development, beginners",
    difficulty: "Beginner-Friendly",
    logo: "/pytho-logo-green.png",
  },
  {
    slug: "java",
    name: "Java",
    tagline: "Write once, run anywhere.",
    summary:
      "Java has been a cornerstone of enterprise software for over two decades, prized for its stability, scalability and platform independence. Code written in Java runs on the Java Virtual Machine (JVM), which means the same application can run on Windows, macOS, Linux or virtually any device without modification. It's the primary language behind Android app development and remains deeply embedded in banking systems, large-scale enterprise software and backend infrastructure at major corporations. Java's strict, statically typed structure encourages organized, predictable code, which is part of why it's so widely used in large teams and long-lived systems. While its syntax is more verbose than languages like Python, that verbosity often makes intentions explicit and bugs easier to catch early. Frameworks like Spring Boot have modernized Java development considerably, making it faster and more pleasant to build with than it once was.",
    bestFor: "Enterprise software, Android apps, large-scale backend systems",
    difficulty: "Intermediate",
    logo: "/java-logo-green.png",
  },
  {
    slug: "csharp",
    name: "C#",
    tagline: "Microsoft's powerhouse language.",
    summary:
      "C# (pronounced \"C sharp\") is a modern, object-oriented language developed by Microsoft that powers everything from business applications to blockbuster video games. It's the primary language for the .NET ecosystem, making it a natural choice for building web APIs, desktop applications and enterprise software on Windows and beyond. C# is also the language behind Unity, one of the world's most popular game engines, which makes it a favorite among aspiring game developers. Its syntax is similar to Java's, but many developers find it slightly more expressive and modern, especially with newer .NET features. Strong tooling support through Visual Studio makes C# development smooth, with excellent debugging, autocomplete and error detection built right in. Whether you're building enterprise software or your first video game, C# is a genuinely versatile choice.",
    bestFor: "Game development (Unity), enterprise software, Windows applications",
    difficulty: "Intermediate",
    logo: "/c-sharp-logo-green.png",
  },
  {
    slug: "cpp",
    name: "C++",
    tagline: "Maximum control, maximum performance.",
    summary:
      "C++ gives developers extremely fine-grained control over memory and system resources, making it one of the fastest and most performance-critical languages in existence. It's the language behind game engines, operating systems, browsers and countless applications where every millisecond and every byte of memory matters. Unlike higher-level languages that manage memory automatically, C++ requires developers to understand exactly how their program uses memory, which is powerful but also unforgiving of mistakes. This makes C++ a steeper language to learn than Python or JavaScript, but that depth is exactly why it remains essential in fields like game development, embedded systems and high-frequency trading. Major game engines like Unreal Engine are built in C++, and much of the software you use every day relies on it under the hood. It's a demanding language, but one that rewards patience with real technical mastery.",
    bestFor: "Game engines, operating systems, embedded systems, performance-critical software",
    difficulty: "Advanced",
    logo: "/c-plusplus-logo-green.png",
  },
  {
    slug: "go",
    name: "Go",
    tagline: "Simplicity built for scale.",
    summary:
      "Go, often called Golang, was created at Google to solve a very specific problem: building fast, reliable software that's simple enough for large teams to maintain. It strips away much of the complexity found in older systems languages while keeping impressive performance, making it a favorite for backend services and infrastructure tools. Go's built-in support for concurrency makes it exceptionally good at handling many tasks at once, which is why it's become a go-to choice for cloud infrastructure, APIs and distributed systems. Companies like Google, Uber and Docker rely on Go to power services that need to run reliably at massive scale. Its small, deliberately minimal syntax means there's less to memorize and less room for the kind of ambiguity that can slow teams down. Go compiles to a single, fast binary with no external dependencies required, making deployment refreshingly simple.",
    bestFor: "Backend services, cloud infrastructure, DevOps tooling, distributed systems",
    difficulty: "Intermediate",
    logo: "/go-logo-green.png",
  },
  {
    slug: "rust",
    name: "Rust",
    tagline: "Speed without sacrificing safety.",
    summary:
      "Rust is a systems programming language designed to deliver the raw performance of C++ while eliminating entire categories of bugs — like memory leaks and data races — at compile time. Its standout feature, the \"borrow checker,\" enforces strict rules about how memory is used, forcing developers to write safer code without needing a garbage collector slowing things down. This combination of speed and safety has made Rust one of the most loved languages among developers, consistently topping developer surveys year after year. It's increasingly used for building browsers, game engines, blockchain systems and performance-critical backend services where reliability truly matters. Companies like Mozilla, Discord and Microsoft use Rust for systems where a single crash or security vulnerability could be catastrophic. The learning curve is real, but developers who push through often say it fundamentally changed how they write code in every other language too.",
    bestFor: "Systems programming, performance-critical applications, security-focused software",
    difficulty: "Advanced",
    logo: "/rust-logo-green.png",
  },
];
