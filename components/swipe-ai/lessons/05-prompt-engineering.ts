import type { Lesson } from "./types";

export const promptEngineering: Lesson = {
  introduction: `
Large Language Models are incredibly powerful, but the quality of their responses depends heavily on the quality of the instructions they receive.

This is where **Prompt Engineering** comes in.

A **prompt** is simply the instruction, question or request you give to an AI model.

Prompt Engineering is the practice of writing clear, structured and effective prompts that help AI produce better results.

Think of AI like a highly knowledgeable assistant.

If you ask vague questions, you'll often receive vague answers.

If you provide clear instructions, enough context and a specific goal, the AI can generate responses that are far more accurate and useful.

Prompt Engineering is not about learning secret commands or magical phrases.

Instead, it's about communicating effectively with AI.

Whether you're writing emails, generating code, brainstorming ideas, analyzing data or learning a new topic, better prompts almost always lead to better outcomes.

As AI becomes a part of everyday work, Prompt Engineering is becoming an increasingly valuable skill for students, professionals and developers alike.
`,
  whyItMatters: `
Many people assume AI gives the best possible answer automatically.

In reality, AI responds based on the information you provide.

A poorly written prompt may lead to:

* Incomplete answers.
* Confusing explanations.
* Incorrect assumptions.
* Generic responses.

A well-written prompt can produce:

* Detailed explanations.
* Better code.
* More creative ideas.
* Higher-quality writing.
* More accurate answers.

Learning Prompt Engineering helps you save time, reduce frustration and unlock the full potential of AI.

It also teaches you an important skill beyond AI itself:

Learning how to communicate clearly.
`,
  keyPrinciples: `
### 1. Be clear and specific.

The more specific your request, the better the response is likely to be.

Instead of asking:

*"Tell me about programming."*

Try:

*"Explain object-oriented programming to a beginner using simple examples."*

Specific prompts reduce ambiguity and help the AI understand your goal.

---

### 2. Provide context.

AI performs better when it understands the situation.

For example:

Instead of saying:

*"Write an email."*

Provide context:

*"Write a professional email to a client explaining that our project will be delayed by two days while maintaining a positive tone."*

Context allows AI to generate responses that better match your needs.

---

### 3. Define the desired format.

Tell the AI how you want the answer presented.

Examples include:

* Bullet points.
* Tables.
* Step-by-step guides.
* Summaries.
* Checklists.
* JSON.
* Markdown.

For example:

*"Summarize this article in five bullet points."*

Formatting instructions often make responses much easier to use.

---

### 4. Assign a role.

Giving AI a role can improve the quality and style of its response.

Examples:

* "Act as a software engineer."
* "Act as a math teacher."
* "Act as a career coach."
* "Act as a marketing expert."

Role prompting helps AI tailor its explanations to a specific perspective.

---

### 5. Refine your prompts.

Your first prompt doesn't have to be perfect.

Prompt Engineering is an iterative process.

If the first answer isn't exactly what you wanted, improve your prompt by adding:

* More context.
* More details.
* Better constraints.
* Clearer objectives.

Treat the conversation as a collaboration.

Each refinement helps AI better understand your request.
`,
  examples: `
### Example 1 — Weak Prompt

*"Write about AI."*

This prompt is too broad.

The AI has to guess what you want.

---

### Better Prompt

*"Explain Artificial Intelligence to a high school student in simple language using real-world examples."*

The goal, audience and style are now much clearer.

---

### Example 2 — Coding

Instead of:

*"Fix my code."*

Try:

*"You're an experienced React developer. Explain why this component isn't rendering and provide a corrected version with comments."*

The second prompt gives the AI a role, context and a clear objective.

---

### Example 3 — Studying

Instead of:

*"Explain photosynthesis."*

Try:

*"Explain photosynthesis as if you were teaching a 12-year-old. Include simple examples and finish with a short quiz."*

The AI now knows your preferred teaching style.

---

### Example 4 — Content Creation

Instead of:

*"Write an Instagram post."*

Try:

*"Write an Instagram post promoting a fitness app. Use an encouraging tone, include a strong call to action and keep it under 150 words."*

Specific instructions produce more useful results.
`,
  commonMistakes: `
### Being too vague.

Short prompts often force AI to make assumptions.

Providing more detail usually leads to better answers.

---

### Forgetting context.

AI only knows what you tell it within the conversation.

Missing information often results in incomplete responses.

---

### Expecting perfection.

AI may still misunderstand your request.

Improving the prompt is often faster than starting over.

---

### Accepting the first answer without review.

Even excellent prompts can produce imperfect responses.

Always review and improve important work before using it.
`,
  exercises: `
## Exercise 1 — Improve the Prompt

Rewrite these prompts to make them more specific:

* "Write an essay."
* "Explain coding."
* "Help me study."
* "Create a business idea."

Focus on adding:

* Context.
* Audience.
* Goal.
* Format.

---

## Exercise 2 — Compare Results

Ask an AI:

*"Tell me about climate change."*

Then ask:

*"Explain climate change to a beginner using simple language, include three causes, three effects and three possible solutions."*

Compare both responses.

Which one is more useful?

Why?

---

## Exercise 3 — Experiment with Roles

Ask the same question multiple times while changing the AI's role.

For example:

* Teacher.
* Software Engineer.
* CEO.
* Scientist.
* Historian.

Observe how the answers change.

---

## Exercise 4 — Reflection

Answer these questions:

* What makes a good prompt?
* Why is context important?
* How can formatting improve AI responses?
* What changes will I make when writing prompts in the future?
`,
  summary: `
Prompt Engineering is the skill of communicating effectively with AI.

By writing clear, specific and well-structured prompts, you can dramatically improve the quality of AI-generated responses.

The five key principles are:

* Be specific.
* Provide context.
* Define the format.
* Assign a role.
* Refine your prompts.

Remember:

AI is only as helpful as the instructions it receives.

Learning to ask better questions is one of the most valuable AI skills you can develop.
`,
  resources: `
### Recommended Books

* *The Art of Prompt Engineering with ChatGPT* — Nathan Hunter
* *Prompt Engineering for Generative AI* — James Phoenix & Mike Taylor
* *Hands-On Large Language Models* — Jay Alammar & Maarten Grootendorst
* *Co-Intelligence* — Ethan Mollick

### Practical Resources

* OpenAI Prompt Guides
* Anthropic Prompt Library
* Google AI Prompting Resources
* Microsoft Learn AI
* DeepLearning.AI Short Courses

### Challenge

For the next **7 days**, rewrite every prompt you use before sending it to an AI.

Before pressing enter, ask yourself:

* **Is my goal clear?**
* **Did I provide enough context?**
* **Did I specify the format I want?**
* **Could I make the prompt more specific?**

You'll quickly notice that better prompts lead to better conversations—and better results.
`,
};
