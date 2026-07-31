import type { Lesson } from "./types";

export const machineLearning: Lesson = {
  introduction: `
Machine Learning (ML) is one of the most important branches of Artificial Intelligence.

When people talk about AI today, they are often referring to Machine Learning without realizing it.

Instead of programming a computer with every possible rule, Machine Learning allows computers to learn patterns from data and improve their performance over time.

Imagine you wanted a computer to recognize cats in photos.

One approach would be to manually program thousands of rules:

* Cats have ears.
* Cats have whiskers.
* Cats have fur.
* Cats have tails.

This quickly becomes impossible because every cat looks different.

Machine Learning takes a different approach.

Instead of writing every rule yourself, you provide the computer with thousands or even millions of labeled images.

Over time, the computer discovers the patterns on its own and learns how to recognize cats in new images.

This ability to learn from experience makes Machine Learning one of the most powerful technologies in modern AI.

Today, Machine Learning powers search engines, recommendation systems, voice assistants, fraud detection, medical research, autonomous vehicles and many other applications we use every day.
`,
  whyItMatters: `
Machine Learning is becoming one of the most valuable technologies in the world.

Companies use it to make better decisions.

Hospitals use it to help diagnose diseases.

Banks use it to detect fraudulent transactions.

Streaming services recommend movies based on your preferences.

Online stores suggest products you may want to buy.

Machine Learning allows computers to discover patterns that would be impossible for humans to analyze manually because of the enormous amount of data involved.

Understanding Machine Learning also helps you understand the strengths and limitations of modern AI.

It explains why AI becomes more accurate with better data and why poor-quality data often produces poor results.

As AI continues to evolve, Machine Learning will remain one of its most important foundations.
`,
  keyPrinciples: `
### 1. Machine Learning learns from data.

Unlike traditional programming, Machine Learning is not given every rule.

Instead, it studies data to discover patterns.

The more relevant and high-quality data it receives, the better it usually performs.

Learning begins with examples.

---

### 2. Supervised Learning

Supervised Learning uses **labeled data**.

This means every training example already contains the correct answer.

For example:

Email → Spam

Email → Not Spam

The AI learns the relationship between the input and the correct output.

Examples include:

* Spam detection
* Image classification
* House price prediction
* Medical diagnosis

Supervised Learning is one of the most common types of Machine Learning.

---

### 3. Unsupervised Learning

Unsupervised Learning works with **unlabeled data**.

The AI receives information but no correct answers.

Its goal is to find hidden patterns or groups within the data.

Examples include:

* Customer segmentation
* Grouping similar songs
* Detecting unusual behavior
* Organizing large datasets

The AI discovers relationships without human labels.

---

### 4. Reinforcement Learning

Reinforcement Learning is inspired by trial and error.

The AI learns by interacting with an environment.

Good decisions receive rewards.

Bad decisions receive penalties.

Over time, the AI learns which actions produce the best long-term results.

Examples include:

* Robotics
* Video game AI
* Self-driving vehicles
* Route optimization

This method allows AI to improve through experience.

---

### 5. Better data usually creates better models.

Machine Learning depends heavily on the quality of its training data.

If the data is:

* Accurate
* Diverse
* Balanced
* Well-labeled

the model usually performs better.

Poor or biased data often leads to inaccurate predictions.

A Machine Learning model can only learn from the information it is given.
`,
  examples: `
### Example 1 — Netflix Recommendations

Netflix analyzes the movies and shows you've watched.

Machine Learning compares your viewing habits with millions of other users and predicts what you're most likely to enjoy next.

The more you watch, the better the recommendations usually become.

---

### Example 2 — Email Spam Detection

Every day, billions of emails are analyzed.

Machine Learning studies patterns found in spam emails and predicts whether a new email should be placed in your inbox or spam folder.

The system improves as it processes more examples.

---

### Example 3 — Self-Driving Cars

Autonomous vehicles constantly collect information from cameras, radar and sensors.

Machine Learning helps the vehicle recognize:

* Roads
* Traffic signs
* Pedestrians
* Cyclists
* Other vehicles

The AI predicts the safest action based on what it has learned.

---

### Example 4 — Medical Diagnosis

Hospitals use Machine Learning to analyze medical images such as X-rays, CT scans and MRI scans.

The AI identifies patterns that may indicate diseases and assists doctors in making more informed decisions.

The final diagnosis, however, remains the responsibility of healthcare professionals.
`,
  commonMistakes: `
### Believing Machine Learning is the same as AI.

Machine Learning is one part of Artificial Intelligence.

Not every AI system uses Machine Learning, but many modern AI systems do.

Think of Machine Learning as one of the most important tools within the broader field of AI.

---

### Assuming AI understands what it learns.

Machine Learning identifies patterns.

It does not understand concepts the way humans do.

It predicts based on previous examples.

---

### Thinking more data always solves everything.

Large amounts of poor-quality or biased data can produce poor results.

Quality is just as important as quantity.

Better data creates better learning.

---

### Expecting perfect predictions.

Machine Learning makes predictions based on probability.

Even excellent models make mistakes.

The goal is continuous improvement—not perfection.
`,
  exercises: `
## Exercise 1 — Identify Machine Learning Around You

List five products or services you use that rely on Machine Learning.

Examples:

* YouTube
* Spotify
* Netflix
* Google Maps
* Instagram
* Amazon

Think about what predictions each system is making.

---

## Exercise 2 — Classify the Learning Type

Determine which type of Machine Learning best fits each example.

* Spam detection
* Music recommendations
* A robot learning to walk
* Customer grouping
* Predicting house prices

Try to identify whether each example uses:

* Supervised Learning
* Unsupervised Learning
* Reinforcement Learning

---

## Exercise 3 — Think About Data

Choose one Machine Learning application.

Ask yourself:

* What data is being collected?
* Who provides the data?
* Could the data contain bias?
* How might better data improve the system?

Understanding data helps you better understand AI.

---

## Exercise 4 — Reflection

Answer these questions:

* What is Machine Learning?
* What is the difference between Supervised and Unsupervised Learning?
* How does Reinforcement Learning work?
* Why is data so important?

Writing your own explanations strengthens your understanding.
`,
  summary: `
Machine Learning allows computers to learn from data instead of relying entirely on manually written rules.

It is one of the most important technologies behind modern Artificial Intelligence.

By understanding the three main types of Machine Learning—Supervised Learning, Unsupervised Learning and Reinforcement Learning—you gain a strong foundation for understanding how many AI systems work today.

Remember:

Machine Learning doesn't create intelligence on its own.

It learns patterns from data and uses those patterns to make predictions.

The quality of those predictions depends on the quality of the learning process.
`,
  resources: `
### Recommended Books

* *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow* — Aurélien Géron
* *The Hundred-Page Machine Learning Book* — Andriy Burkov
* *Machine Learning for Absolute Beginners* — Oliver Theobald
* *Artificial Intelligence: A Guide for Thinking Humans* — Melanie Mitchell

### Practical Resources

* Google Machine Learning Crash Course
* Kaggle Learn
* DeepLearning.AI
* Microsoft Learn AI
* TensorFlow Tutorials
* Scikit-learn Documentation

### Challenge

For the next **7 days**, every time you use an app or website, ask yourself:

* **Is Machine Learning being used here?**
* **What prediction is the system making?**
* **What data is it likely using?**
* **How could the model become more accurate?**

The more you recognize Machine Learning in everyday life, the easier it becomes to understand how modern AI systems make decisions and improve over time.
`,
};
