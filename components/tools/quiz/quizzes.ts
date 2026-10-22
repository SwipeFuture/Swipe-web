import type { QuizData } from "./Quiz";

// Quiz content — plain data so server pages can pass it to the client <Quiz>.

export const PROGRAMMING_LANGUAGE_QUIZ: QuizData = {
  theme: "coding",
  backHref: "/coding",
  backLabel: "Back to Coding",
  eyebrow: "Coding Quiz",
  title: "Which Programming Language",
  highlight: "Should You Learn?",
  intro: "Seven quick questions about what you want to build and how you like to learn — and you'll know which language to start with.",
  questions: [
    {
      q: "What do you want to build first?",
      options: [
        { label: "Websites people can visit", scores: { html: 3, javascript: 2 } },
        { label: "Apps and interactive web tools", scores: { javascript: 3, typescript: 1 } },
        { label: "Games", scores: { csharp: 3, cpp: 1 } },
        { label: "AI, data or automation scripts", scores: { python: 3 } },
      ],
    },
    {
      q: "How much do you already know about coding?",
      options: [
        { label: "Nothing at all", scores: { python: 2, html: 2 } },
        { label: "I've tried a tutorial or two", scores: { javascript: 2, python: 1 } },
        { label: "I can write small programs", scores: { java: 1, csharp: 1, rust: 1 } },
        { label: "I want a real challenge", scores: { rust: 2, cpp: 2 } },
      ],
    },
    {
      q: "What sounds most exciting?",
      options: [
        { label: "Seeing something on screen instantly", scores: { html: 2, javascript: 2 } },
        { label: "Making the computer do boring work for me", scores: { python: 3 } },
        { label: "Building something huge and reliable", scores: { java: 2, typescript: 2 } },
        { label: "Making things run insanely fast", scores: { rust: 2, cpp: 2 } },
      ],
    },
    {
      q: "Where do you see yourself working one day?",
      options: [
        { label: "Startup or my own product", scores: { javascript: 2, typescript: 2 } },
        { label: "Data science or AI", scores: { python: 3 } },
        { label: "Game studio", scores: { csharp: 3 } },
        { label: "Big tech, banks or enterprise", scores: { java: 3, csharp: 1 } },
      ],
    },
    {
      q: "How do you feel about strict rules?",
      options: [
        { label: "Love them — tell me when I'm wrong", scores: { rust: 2, typescript: 2, java: 1 } },
        { label: "Fine, if they help me", scores: { csharp: 1, java: 1, typescript: 1 } },
        { label: "I'd rather just try things", scores: { python: 2, javascript: 2 } },
        { label: "Rules? Just show me the result", scores: { html: 2 } },
      ],
    },
    {
      q: "What device do you mostly use?",
      options: [
        { label: "Phone or tablet", scores: { html: 2, javascript: 1 } },
        { label: "Windows PC", scores: { csharp: 2, python: 1 } },
        { label: "Mac", scores: { javascript: 1, python: 1, typescript: 1 } },
        { label: "Linux / I like the terminal", scores: { rust: 2, cpp: 1, python: 1 } },
      ],
    },
    {
      q: "How much time can you give it each day?",
      options: [
        { label: "5–10 minutes", scores: { python: 2, html: 2 } },
        { label: "About 30 minutes", scores: { javascript: 2, python: 1 } },
        { label: "An hour or more", scores: { java: 1, csharp: 1, typescript: 1 } },
        { label: "As much as it takes", scores: { rust: 2, cpp: 2 } },
      ],
    },
  ],
  results: {
    python: {
      title: "Python",
      emoji: "🐍",
      summary: "Readable, beginner-friendly and everywhere in AI, data and automation. Python lets you focus on solving problems instead of fighting syntax — the classic first language.",
      strengths: ["You like practical results quickly", "AI, data and automation interest you", "You value clear, readable code"],
      next: ["Read “What is Python?” and “Where Is Python Used?”", "Write your first program with print()", "Automate one small boring task this week"],
      links: [{ href: "/learn/coding/python", label: "Start free Python lessons" }],
    },
    javascript: {
      title: "JavaScript",
      emoji: "⚡",
      summary: "The language of the web. Everything interactive in your browser runs on JavaScript — and with it you can build websites, web apps and even servers.",
      strengths: ["You want to see results on screen", "You like building things people use", "Startups and products excite you"],
      next: ["Learn how JavaScript fits next to HTML and CSS", "Make a button do something on a web page", "Build a tiny to-do list app"],
      links: [{ href: "/learn/coding/javascript", label: "Start free JavaScript lessons" }],
    },
    html: {
      title: "HTML & the Web",
      emoji: "🌐",
      summary: "Start where every website starts. HTML gives you visible results in minutes and is the perfect first step before JavaScript.",
      strengths: ["You think visually", "You want quick wins", "You'd like your own website"],
      next: ["Learn the structure of an HTML page", "Build a one-page site about yourself", "Then add JavaScript for interactivity"],
      links: [{ href: "/learn/coding/html", label: "Start free HTML lessons" }],
    },
    typescript: {
      title: "TypeScript",
      emoji: "🛡️",
      summary: "JavaScript with guardrails. TypeScript catches mistakes before your code runs — the favourite of serious web teams and product builders.",
      strengths: ["You like structure and safety", "You want to build bigger apps", "You think long-term"],
      next: ["Learn the JavaScript basics first", "Add types to a small project", "Explore how big teams use TypeScript"],
      links: [{ href: "/learn/coding/typescript", label: "Start free TypeScript lessons" }],
    },
    csharp: {
      title: "C#",
      emoji: "🎮",
      summary: "The language behind Unity games, Windows apps and many backends. C# is powerful, well-structured and a great choice if games are your thing.",
      strengths: ["Games excite you", "You're on Windows", "You like well-organised code"],
      next: ["Learn C# basics", "Install Unity and move a cube with code", "Build a tiny game loop"],
      links: [{ href: "/learn/coding/csharp", label: "Start free C# lessons" }],
    },
    java: {
      title: "Java",
      emoji: "☕",
      summary: "Stable, everywhere and loved by large companies. Java powers Android, banks and enterprise systems — a solid path to a reliable career.",
      strengths: ["You like reliable, proven tools", "Big companies appeal to you", "You don't mind some structure"],
      next: ["Learn how Java code is compiled and run", "Write your first class", "Explore object-oriented programming"],
      links: [{ href: "/learn/coding/java", label: "Start free Java lessons" }],
    },
    rust: {
      title: "Rust",
      emoji: "🦀",
      summary: "Fast, safe and challenging. Rust is the language developers love most — ideal if you want to understand how computers really work.",
      strengths: ["You love a challenge", "Performance matters to you", "You want to go deep"],
      next: ["Learn why Rust is memory-safe", "Write your first Rust program", "Explore ownership and borrowing"],
      links: [{ href: "/learn/coding/rust", label: "Start free Rust lessons" }],
    },
    cpp: {
      title: "C++",
      emoji: "🚀",
      summary: "Maximum control, maximum performance. C++ runs game engines, browsers and operating systems — steep, but incredibly powerful.",
      strengths: ["Speed fascinates you", "You want to know what's under the hood", "Game engines interest you"],
      next: ["Learn how C++ is compiled", "Write a small console program", "Explore memory and pointers"],
      links: [{ href: "/learn/coding/cpp", label: "Start free C++ lessons" }],
    },
  },
  faq: [
    { q: "What is the best first programming language?", a: "For most beginners it's Python (clear and versatile) or HTML + JavaScript (instant visible results on the web). The best first language is the one that matches what you want to build, so you stay motivated." },
    { q: "Does my first language matter that much?", a: "Less than people think. Variables, conditions, loops and functions work the same way in almost every language. Once you know one well, the second is much faster to learn." },
    { q: "How long does it take to learn to code?", a: "You can write useful small programs after a few weeks of daily practice. Becoming job-ready usually takes months of consistent learning and building real projects." },
  ],
  related: [
    { href: "/coding/programming-languages", label: "All languages compared" },
    { href: "/coding/typing-speed-test", label: "Code Typing Speed Test" },
    { href: "/advisor", label: "Find your learning path" },
  ],
};

export const MONEY_TYPE_QUIZ: QuizData = {
  theme: "finance",
  backHref: "/finance",
  backLabel: "Back to Finance",
  eyebrow: "Money Quiz",
  title: "What's Your",
  highlight: "Money Type?",
  intro: "Are you a saver, a spender, an investor or an avoider? Seven honest questions reveal how you handle money — and what to work on next.",
  questions: [
    {
      q: "You get €500 unexpectedly. What happens?",
      options: [
        { label: "Straight into savings", scores: { saver: 3 } },
        { label: "Something I've wanted for ages", scores: { spender: 3 } },
        { label: "I invest it", scores: { investor: 3 } },
        { label: "It just… disappears somehow", scores: { avoider: 3 } },
      ],
    },
    {
      q: "How often do you check your bank account?",
      options: [
        { label: "Daily — I know every cent", scores: { saver: 2, planner: 1 } },
        { label: "When I want to buy something", scores: { spender: 2 } },
        { label: "Weekly, along with my investments", scores: { investor: 2, planner: 1 } },
        { label: "I'd rather not look", scores: { avoider: 3 } },
      ],
    },
    {
      q: "Do you have a budget?",
      options: [
        { label: "Yes, and I stick to it", scores: { planner: 3 } },
        { label: "In my head, roughly", scores: { saver: 1, spender: 1 } },
        { label: "My budget is my investing plan", scores: { investor: 2 } },
        { label: "No", scores: { avoider: 2, spender: 1 } },
      ],
    },
    {
      q: "What does money mean to you?",
      options: [
        { label: "Safety", scores: { saver: 3 } },
        { label: "Fun and experiences", scores: { spender: 3 } },
        { label: "Freedom later", scores: { investor: 2, planner: 1 } },
        { label: "Stress", scores: { avoider: 3 } },
      ],
    },
    {
      q: "A friend talks about ETFs. You…",
      options: [
        { label: "Already own some", scores: { investor: 3 } },
        { label: "Feel it's too risky", scores: { saver: 2 } },
        { label: "Want to learn more", scores: { planner: 2 } },
        { label: "Change the topic", scores: { avoider: 2, spender: 1 } },
      ],
    },
    {
      q: "End of the month, your account usually…",
      options: [
        { label: "Has plenty left", scores: { saver: 2, planner: 1 } },
        { label: "Is basically empty", scores: { spender: 3 } },
        { label: "Was already invested on payday", scores: { investor: 3 } },
        { label: "No idea", scores: { avoider: 3 } },
      ],
    },
    {
      q: "Your biggest money goal?",
      options: [
        { label: "A solid safety net", scores: { saver: 2 } },
        { label: "Enjoying life now", scores: { spender: 2 } },
        { label: "Financial independence", scores: { investor: 2 } },
        { label: "Finally having a plan", scores: { planner: 2, avoider: 1 } },
      ],
    },
  ],
  results: {
    saver: {
      title: "The Saver",
      emoji: "🐿️",
      summary: "You love security and you're great at keeping money. The risk: cash that sits still loses value to inflation. Your next level is letting some of it grow.",
      strengths: ["Discipline", "A safety net", "No impulse buys"],
      next: ["Check your emergency fund is complete", "Learn how inflation eats cash", "Start a small, regular ETF savings plan"],
      links: [{ href: "/finance/inflation-calculator", label: "Inflation Calculator" }, { href: "/learn/finance/investing-fundamentals", label: "Free investing lessons" }],
    },
    spender: {
      title: "The Spender",
      emoji: "🛍️",
      summary: "You enjoy life and you're generous — but money tends to leave before it can work for you. A simple system can keep the fun and build your future.",
      strengths: ["You enjoy the present", "Generous", "Motivated by goals you can see"],
      next: ["Try the 50/30/20 split with your real income", "Automate savings on payday", "Give yourself a guilt-free fun budget"],
      links: [{ href: "/finance/budget-calculator", label: "Budget Calculator" }, { href: "/learn/finance/money-basics", label: "Free money basics lessons" }],
    },
    investor: {
      title: "The Investor",
      emoji: "📈",
      summary: "You think long-term and let money work for you. Keep an eye on diversification, costs and your emergency fund so one bad year can't knock you off track.",
      strengths: ["Long-term thinking", "Understands compounding", "Takes action"],
      next: ["Calculate your FIRE number", "Review costs and diversification", "Make sure your emergency fund is separate"],
      links: [{ href: "/finance/fire-calculator", label: "FIRE Calculator" }, { href: "/learn/finance/stock-market-and-trading", label: "Free stock market lessons" }],
    },
    planner: {
      title: "The Planner",
      emoji: "🗺️",
      summary: "You like a clear plan and you're ready to learn. You're one structure away from real financial momentum.",
      strengths: ["Organised", "Curious", "Ready to act"],
      next: ["Set one concrete savings goal", "Pick a budget split that fits", "Learn investing fundamentals"],
      links: [{ href: "/finance/savings-goal-calculator", label: "Savings Goal Calculator" }, { href: "/learn/finance/investing-fundamentals", label: "Free investing lessons" }],
    },
    avoider: {
      title: "The Avoider",
      emoji: "🙈",
      summary: "Money stresses you, so you'd rather not look — totally normal. The good news: a few minutes of clarity takes most of that stress away.",
      strengths: ["Honest with yourself (you took this quiz!)", "Lots of room to grow", "Small steps will feel big"],
      next: ["Look at your account once — just look", "Write down your fixed monthly costs", "Build a tiny starter emergency fund"],
      links: [{ href: "/finance/emergency-fund-calculator", label: "Emergency Fund Calculator" }, { href: "/learn/finance/money-basics", label: "Free money basics lessons" }],
    },
  },
  faq: [
    { q: "What are the main money personality types?", a: "Common types are the saver, the spender, the investor, the planner and the avoider. Most people are a mix — the quiz shows your strongest tendency and the runner-up." },
    { q: "Can my money type change?", a: "Yes. Money habits are learned, so they can be changed. Small systems like automating savings on payday work no matter which type you are." },
  ],
  related: [
    { href: "/finance/budget-calculator", label: "Budget Calculator" },
    { href: "/learn/finance/money-basics", label: "Free money lessons" },
  ],
};

export const HABIT_TYPE_QUIZ: QuizData = {
  theme: "growth",
  backHref: "/personal-growth",
  backLabel: "Back to Personal Growth",
  eyebrow: "Growth Quiz",
  title: "What's Your",
  highlight: "Habit Type?",
  intro: "Why do some habits stick and others die after a week? Find out how you build habits — and the one strategy that works for your type.",
  questions: [
    {
      q: "You start a new habit. What usually happens?",
      options: [
        { label: "I go all-in, then burn out", scores: { sprinter: 3 } },
        { label: "I plan it perfectly… and never start", scores: { planner: 3 } },
        { label: "It sticks if I do it with someone", scores: { social: 3 } },
        { label: "I keep going, slowly but surely", scores: { steady: 3 } },
      ],
    },
    {
      q: "What motivates you most?",
      options: [
        { label: "Big visible results", scores: { sprinter: 2 } },
        { label: "Having the perfect system", scores: { planner: 2 } },
        { label: "Not letting others down", scores: { social: 3 } },
        { label: "Not breaking my streak", scores: { steady: 2, starter: 1 } },
      ],
    },
    {
      q: "You miss a day. Then…",
      options: [
        { label: "Whole thing's ruined, I quit", scores: { sprinter: 3 } },
        { label: "I rethink the whole plan", scores: { planner: 2 } },
        { label: "My friend reminds me", scores: { social: 2 } },
        { label: "Just continue tomorrow", scores: { steady: 3 } },
      ],
    },
    {
      q: "Your to-do list is…",
      options: [
        { label: "Huge and ambitious", scores: { sprinter: 2 } },
        { label: "Beautifully organised", scores: { planner: 3 } },
        { label: "Shared with others", scores: { social: 2 } },
        { label: "Short — 2 or 3 things", scores: { steady: 2 } },
      ],
    },
    {
      q: "New year's resolutions?",
      options: [
        { label: "Many — gone by February", scores: { sprinter: 2, starter: 1 } },
        { label: "Researched for weeks", scores: { planner: 2 } },
        { label: "Only with a buddy", scores: { social: 2 } },
        { label: "Don't need them, I start any day", scores: { steady: 2, starter: 1 } },
      ],
    },
    {
      q: "Which sentence fits you best?",
      options: [
        { label: "“I'm great at starting things.”", scores: { starter: 3 } },
        { label: "“I need the full picture first.”", scores: { planner: 3 } },
        { label: "“I work best in a team.”", scores: { social: 3 } },
        { label: "“Slow and steady wins.”", scores: { steady: 3 } },
      ],
    },
  ],
  results: {
    sprinter: {
      title: "The Sprinter",
      emoji: "⚡",
      summary: "Huge energy, huge ambitions — and then the crash. Your superpower is intensity; your fix is making habits so small they survive bad days.",
      strengths: ["Massive motivation", "Fast progress early", "Not afraid of big goals"],
      next: ["Shrink every habit to 2 minutes", "Never miss twice — one miss is fine", "Track the streak, not the intensity"],
      links: [{ href: "/learn/personal-growth/habits-and-routines", label: "Free habit lessons" }, { href: "/personal-growth/one-percent-calculator", label: "1% Better Calculator" }],
    },
    planner: {
      title: "The Planner",
      emoji: "📋",
      summary: "You love the perfect system — so much that starting feels risky. Your fix: start badly today, improve the plan tomorrow.",
      strengths: ["Thoughtful", "Great systems", "You understand the why"],
      next: ["Pick one habit and start today, imperfectly", "Plan for 5 minutes max", "Review weekly, not daily"],
      links: [{ href: "/learn/personal-growth/focus-and-productivity", label: "Free focus lessons" }],
    },
    social: {
      title: "The Team Player",
      emoji: "🤝",
      summary: "Accountability is your engine. Habits stick when someone else is in on it — so use that on purpose.",
      strengths: ["Loyal", "Motivated by people", "Great at keeping promises"],
      next: ["Find a habit buddy or share your streak", "Make public commitments", "Join a community around your goal"],
      links: [{ href: "/learn/personal-growth/relationships-and-communication", label: "Free communication lessons" }],
    },
    steady: {
      title: "The Steady One",
      emoji: "🐢",
      summary: "Consistency is your superpower — the rarest one. Your next level: make sure your daily habits point at a goal that excites you.",
      strengths: ["Consistent", "Calm after setbacks", "Long-term thinker"],
      next: ["Level up one habit by 1%", "Set a bigger goal for your routine", "Teach your system to a friend"],
      links: [{ href: "/learn/personal-growth/purpose-and-direction", label: "Free purpose lessons" }],
    },
    starter: {
      title: "The Starter",
      emoji: "🚀",
      summary: "You never wait for the perfect moment — you just begin. Keep that, and add a simple way to remember why you started.",
      strengths: ["Action over overthinking", "Brave", "Curious"],
      next: ["Attach new habits to existing ones", "Write down your why", "Track a 30-day streak"],
      links: [{ href: "/learn/personal-growth/mindset-and-confidence", label: "Free mindset lessons" }],
    },
  },
  faq: [
    { q: "How long does it take to build a habit?", a: "Research suggests it varies a lot — from a few weeks to several months, about two months on average. Consistency matters far more than the exact number of days." },
    { q: "What is the best way to make a habit stick?", a: "Make it small, make it obvious (attach it to something you already do), and track it. Missing once is fine — the key is never missing twice in a row." },
  ],
  related: [
    { href: "/personal-growth/one-percent-calculator", label: "1% Better Every Day" },
    { href: "/personal-growth/sleep-calculator", label: "Sleep Calculator" },
  ],
};
