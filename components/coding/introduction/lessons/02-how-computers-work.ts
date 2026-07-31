import type { Lesson } from "./types";

export const howComputersWork: Lesson = {
  introduction: `
Every program you write runs on a computer, but before learning to code, it's helpful to understand what happens behind the scenes. A computer is a machine that receives input, processes information and produces output by following instructions. These instructions are executed by hardware components working together with software.

Although computers may seem incredibly intelligent, they simply perform millions of calculations every second based on the code they are given. Understanding these basic components will make it easier to learn how programming interacts with a computer.
`,
  whyItMatters: `
Knowing how computers work helps you become a better programmer. It explains why programs sometimes run slowly, why memory matters and how your code is processed. As you continue learning, these fundamentals will help you write more efficient and reliable software.
`,
  keyPrinciples: `
* The CPU processes instructions and performs calculations.
* Memory (RAM) temporarily stores data while programs are running.
* Storage keeps files and software even when the computer is turned off.
* Software tells the hardware exactly what to do.
`,
  examples: `
Computers are constantly processing information:

* Opening a website.
* Running a video game.
* Editing a photo.
* Streaming a movie.
* Saving a document.
`,
  commonMistakes: `
* Thinking computers can "think" like humans.
* Confusing memory (RAM) with storage.
* Believing faster hardware automatically makes bad code efficient.
* Ignoring how software and hardware work together.
`,
  exercises: `
* Identify the CPU, RAM and storage in your own computer.
* Research the difference between RAM and SSD storage.
* Think about what happens when you open your favorite application.
`,
  summary: `
Computers work by following instructions through a combination of hardware and software. The CPU processes calculations, memory stores temporary data and storage keeps files permanently. Understanding these fundamentals provides a strong foundation for learning programming and building software.
`,
  resources: `
### Recommended Books

* *But How Do It Know?* — J. Clark Scott
* *Code: The Hidden Language of Computer Hardware and Software* — Charles Petzold

### Practical Resources

* CrashCourse Computer Science (video series)
* Khan Academy — Computer Science basics

### Challenge

This week, open your device's system settings and find out how much RAM and storage it has — then notice how that connects to what you learned here.
`,
};
