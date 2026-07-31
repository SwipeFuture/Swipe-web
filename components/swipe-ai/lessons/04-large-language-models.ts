import type { Lesson } from "./types";

export const largeLanguageModels: Lesson = {
  introduction: `
Large Language Models (LLMs) are one of the biggest breakthroughs in modern Artificial Intelligence.

Tools like ChatGPT, Claude, Gemini and Microsoft Copilot are all powered by Large Language Models.

These systems can answer questions, explain complex topics, write essays, generate code, summarize documents, translate languages and even help brainstorm ideas.

At first glance, it may seem as though these AI models truly understand language like humans do.

However, the reality is quite different.

An LLM does not think, reason or understand words in the same way people do.

Instead, it has been trained on enormous amounts of text to recognize patterns in language.

When you ask an LLM a question, it predicts the most likely sequence of words that should come next based on everything it learned during training.

This prediction happens incredibly quickly, creating responses that often feel surprisingly natural and intelligent.

Understanding how Large Language Models work is essential because they are becoming one of the most widely used AI technologies in education, business, software development and everyday life.
`,
  whyItMatters: `
Large Language Models are changing how people interact with computers.

Instead of clicking through menus or learning complicated software, users can simply ask questions using natural language.

Students use LLMs to study.

Developers use them to write and debug code.

Businesses use them to automate customer support.

Writers use them to brainstorm ideas.

Researchers use them to summarize large amounts of information.

Understanding how LLMs work also helps you become a more responsible AI user.

You'll understand why these models sometimes make mistakes, why prompts matter and why you should always verify important information.

Rather than seeing AI as magic, you'll understand the technology behind it.
`,
  keyPrinciples: `
### 1. Tokens are the building blocks.

Large Language Models do not read sentences the way humans do.

Instead, they break text into smaller pieces called **tokens**.

A token may be:

* A whole word
* Part of a word
* A number
* A punctuation mark
* A symbol

For example:

*"Artificial Intelligence is amazing."*

may be split into several tokens before the model processes it.

Every response an LLM generates is built one token at a time.

---

### 2. Training teaches the model patterns.

Before you ever use ChatGPT or another LLM, it has already completed an enormous training process.

During training, the model analyzes massive collections of text from books, articles, websites, code and other publicly available sources.

Its goal is simple:

Predict the next token.

By repeating this process billions or even trillions of times, the model gradually learns grammar, facts, reasoning patterns and relationships between words.

Training can take weeks or even months using thousands of powerful GPUs.

---

### 3. Parameters store learned patterns.

Large Language Models contain billions—or even trillions—of **parameters**.

Parameters are numerical values that represent everything the model has learned during training.

They are not stored facts like pages in a textbook.

Instead, they encode patterns that help the model make predictions.

Generally speaking:

* More parameters can increase capability.
* Better training data improves quality.
* Better model architecture improves performance.

However, a larger model is not always a better model.

Efficiency and training quality matter just as much.

---

### 4. Context Windows determine memory.

Every conversation with an LLM has a limit called the **context window**.

The context window represents how much information the model can consider at one time.

A larger context window allows the AI to remember more of your conversation or process longer documents.

If the conversation becomes too long, older information may eventually fall outside the context window.

This is why AI may sometimes forget details from earlier in a conversation.

---

### 5. Hallucinations happen.

One of the biggest limitations of Large Language Models is **hallucination**.

A hallucination occurs when the AI generates information that sounds believable but is incorrect or completely made up.

For example, an LLM might:

* Invent a book that doesn't exist.
* Create fake statistics.
* Misquote a source.
* Generate incorrect code.
* Confidently answer a question with false information.

Hallucinations happen because the model predicts likely text—it does not verify every fact before responding.

This is why important information should always be checked using reliable sources.
`,
  examples: `
### Example 1 — ChatGPT

When you ask:

*"Explain photosynthesis."*

The model predicts the most likely sequence of words that forms a helpful explanation.

It is not searching the internet in real time.

It is generating text based on patterns learned during training.

---

### Example 2 — Code Generation

A developer asks:

*"Write a React component."*

The LLM predicts code based on millions of programming examples it learned during training.

It recognizes common coding patterns and generates a likely solution.

---

### Example 3 — Summarizing Documents

An LLM can read a long article and generate a shorter summary by identifying the most important ideas.

It does not simply copy sentences.

Instead, it predicts a concise version of the original content.

---

### Example 4 — Translation

When translating between languages, an LLM predicts the most natural wording rather than translating each word individually.

This usually produces more fluent and natural results.
`,
  commonMistakes: `
### Believing LLMs understand language like humans.

Large Language Models process patterns in text.

They do not truly understand meaning, emotions or experiences.

Their responses are based on prediction—not human comprehension.

---

### Assuming every answer is correct.

LLMs can generate incorrect information with great confidence.

Always verify important facts, especially in areas such as medicine, law, finance and scientific research.

---

### Confusing memory with intelligence.

An LLM may appear to "remember" previous messages, but it only works within its current context window.

It does not have perfect long-term memory in every conversation.

---

### Thinking bigger always means smarter.

A model with more parameters is not automatically better.

Training quality, safety, efficiency and architecture all play major roles in overall performance.
`,
  exercises: `
## Exercise 1 — Count the Tasks

Think about five things you could ask an LLM to do.

Examples:

* Explain a topic.
* Write code.
* Summarize an article.
* Translate text.
* Brainstorm ideas.

Notice how one model can perform many different tasks using natural language.

---

## Exercise 2 — Test Hallucinations

Ask an AI a question about a topic you know well.

Then verify its answer using trusted sources.

Did it make any mistakes?

Understanding AI's limitations is just as important as understanding its strengths.

---

## Exercise 3 — Experiment with Context

Start a conversation with an AI.

Ask several follow-up questions that build on previous answers.

Observe how the AI uses earlier information to maintain context.

---

## Exercise 4 — Reflection

Answer these questions:

* What is a Large Language Model?
* What is a token?
* Why do hallucinations occur?
* What is the purpose of a context window?
* Why should important information always be verified?

Writing your own explanations will deepen your understanding.
`,
  summary: `
Large Language Models have transformed how humans interact with computers.

They generate text by predicting one token at a time using patterns learned from enormous amounts of training data.

Concepts such as tokens, parameters, context windows and hallucinations help explain both the incredible capabilities and the important limitations of these systems.

Remember:

An LLM is an incredibly powerful assistant—but it is still a prediction engine, not a human mind.

The better you understand how it works, the more effectively and responsibly you can use it.
`,
  resources: `
### Recommended Books

* *Hands-On Large Language Models* — Jay Alammar & Maarten Grootendorst
* *Generative AI with LLMs* — AWS & DeepLearning.AI
* *Artificial Intelligence: A Guide for Thinking Humans* — Melanie Mitchell
* *Deep Learning* — Ian Goodfellow, Yoshua Bengio & Aaron Courville

### Practical Resources

* OpenAI Documentation
* Anthropic Documentation
* Google AI
* Hugging Face
* DeepLearning.AI
* Microsoft Learn AI

### Challenge

For the next **7 days**, use an LLM for a different real-world task each day:

* Summarize an article.
* Explain a difficult concept.
* Write or debug code.
* Brainstorm creative ideas.
* Translate text.
* Plan a project.
* Learn a new skill.

After each session, ask yourself:

* **Was the response accurate?**
* **Did I verify important information?**
* **Could a better prompt improve the answer?**

The more you understand how Large Language Models work, the better you'll be able to use them as powerful tools for learning, creativity and problem-solving.
`,
};
