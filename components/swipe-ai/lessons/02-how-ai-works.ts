import type { Lesson } from "./types";

export const howAiWorks: Lesson = {
  introduction: `
Artificial Intelligence may seem almost magical when you first use it.

You ask a chatbot a question, upload an image or request a piece of code, and within seconds you receive a detailed response. It can feel as though the AI understands the world in the same way a human does.

In reality, AI works very differently.

Behind every AI system are mathematics, algorithms, enormous amounts of data and powerful computers working together.

AI does not think, reason or learn in the same way humans do.

Instead, it identifies patterns within data and uses those patterns to make predictions.

For example, when you type a question into an AI chatbot, the model doesn't search its memory like a person recalling a fact.

Instead, it predicts the most likely sequence of words that should come next based on everything it learned during training.

Understanding how AI works doesn't require a degree in computer science.

By learning a few fundamental concepts, you'll understand why AI is so powerful, why it sometimes makes mistakes and why high-quality data is essential.

These concepts form the foundation of almost every modern AI system.
`,
  whyItMatters: `
If you understand how AI works, you become a much better AI user.

Instead of treating AI like a mysterious black box, you'll understand:

* Why AI sometimes gives incorrect answers.
* Why better prompts produce better results.
* Why AI improves when trained with more data.
* Why different AI models have different strengths.

This knowledge also helps you choose the right AI tool for different tasks.

Some AI systems are designed for writing.

Others generate images.

Some recognize speech.

Others analyze medical scans.

Understanding the basic building blocks behind AI makes it easier to adapt as new technologies appear.

The tools will continue changing.

The underlying concepts will remain valuable.
`,
  keyPrinciples: `
### 1. Data is the foundation of AI.

Every AI model learns from data.

Data can include:

* Text
* Images
* Videos
* Audio
* Numbers
* Code

The quality of an AI system depends heavily on the quality and quantity of the data it learns from.

Poor data usually leads to poor results.

Better data often leads to better predictions.

---

### 2. Algorithms tell AI how to learn.

An algorithm is simply a set of instructions.

Think of it like a recipe.

A recipe tells you how to bake a cake.

An algorithm tells a computer how to solve a problem.

Different AI systems use different algorithms depending on the task.

Some are designed to recognize faces.

Others translate languages.

Others recommend movies or music.

---

### 3. A model is the AI's learned knowledge.

After training on large amounts of data, an AI creates what is called a **model**.

The model contains patterns that the AI has learned.

For example, a language model has learned relationships between words and sentences.

An image model has learned patterns that distinguish cats from dogs or cars from bicycles.

The model is what actually performs predictions after training is complete.

---

### 4. Training and inference are different.

AI works in two main stages.

**Training**

During training, the AI studies enormous amounts of data and gradually improves its predictions.

This process can take days, weeks or even months on powerful computers.

**Inference**

Inference happens after training.

This is when you ask ChatGPT a question, generate an image or translate text.

The AI is no longer learning.

It is simply using what it already learned to generate a response.

---

### 5. Neural Networks make modern AI possible.

Many modern AI systems use **Neural Networks**.

Despite the name, they are not real brains.

They are mathematical models inspired by the way neurons connect in the human brain.

Neural Networks process information through many connected layers.

Each layer identifies increasingly complex patterns.

For example, an image AI might first detect:

* Lines

Then:

* Shapes

Then:

* Eyes

Then:

* Faces

Then:

* Individual people

This layered approach allows AI to solve extremely complex problems.
`,
  examples: `
### Example 1 — Spam Filters

Email services use AI to identify spam.

The AI learns patterns from millions of emails.

When a new email arrives, it predicts whether it is likely to be spam or not.

---

### Example 2 — Self-Driving Cars

Autonomous vehicles constantly analyze data from cameras and sensors.

AI identifies:

* Roads
* Traffic signs
* Pedestrians
* Other vehicles

The system then predicts the safest action to take.

---

### Example 3 — ChatGPT

When you type:

*"Explain gravity."*

ChatGPT analyzes your prompt and predicts the most likely sequence of words that will produce a helpful explanation.

It does not search the internet in real time or remember a textbook.

It generates a response using patterns learned during training.

---

### Example 4 — Music Recommendations

Streaming platforms analyze your listening habits.

AI compares your preferences with millions of other users and predicts which songs you are most likely to enjoy next.
`,
  commonMistakes: `
### Thinking AI understands everything.

AI recognizes patterns.

It does not truly understand concepts the way humans do.

It predicts.

It does not "know."

---

### Believing AI is always learning.

Most AI models do not learn from every conversation.

Once training is complete, they generate responses using their existing model.

Training and using AI are two separate processes.

---

### Assuming more data always means better AI.

Large amounts of poor-quality data can create poor AI systems.

Quality matters just as much as quantity.

Reliable, diverse and accurate data produces better models.

---

### Confusing models with algorithms.

An algorithm is the method used for learning.

A model is the result of that learning.

One teaches.

The other performs.
`,
  exercises: `
## Exercise 1 — Identify the Components

Choose one AI application you use.

Identify:

* What data does it use?
* What is it trying to predict?
* What output does it produce?

This helps you understand how AI systems are built.

---

## Exercise 2 — Observe AI Predictions

Use an AI chatbot.

Ask it five different questions.

After each answer, ask yourself:

* Is this a prediction?
* Why might the AI have answered this way?
* Does the answer seem reliable?

Practice thinking critically about AI outputs.

---

## Exercise 3 — Research Neural Networks

Watch or read one beginner-friendly explanation of Neural Networks.

Write a short summary in your own words explaining how they identify patterns.

---

## Exercise 4 — Reflection

Answer these questions:

* Why is data important for AI?
* What is the difference between training and inference?
* What is a model?
* What surprised me most about how AI works?

Reflecting on these ideas will strengthen your understanding.
`,
  summary: `
Modern AI works by learning patterns from enormous amounts of data.

Algorithms guide the learning process.

Training creates a model.

Inference uses that model to generate predictions.

Neural Networks allow AI to recognize increasingly complex patterns and solve tasks that were once impossible for computers.

Remember:

AI doesn't think like humans.

It predicts based on patterns.

Understanding this simple idea helps explain both AI's incredible strengths and its important limitations.
`,
  resources: `
### Recommended Books

* *Artificial Intelligence: A Guide for Thinking Humans* — Melanie Mitchell
* *Deep Learning* — Ian Goodfellow, Yoshua Bengio & Aaron Courville
* *Grokking Deep Learning* — Andrew Trask
* *The Master Algorithm* — Pedro Domingos

### Practical Resources

* DeepLearning.AI
* Google AI Learning Resources
* Microsoft Learn AI
* Kaggle Learn
* OpenAI Documentation
* Coursera AI Fundamentals

### Challenge

For the next **7 days**, whenever you use an AI tool, ask yourself these four questions:

* **What data might this AI have learned from?**
* **What prediction is it making?**
* **Could the data contain biases or limitations?**
* **Should I verify this answer before relying on it?**

Understanding how AI works isn't about memorizing technical terms—it's about learning to think critically about the technology you use every day.
`,
};
