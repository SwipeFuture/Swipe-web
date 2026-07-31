import type { Lesson } from "./types";

export const howTheInternetWorks: Lesson = {
  introduction: `
The internet connects billions of devices around the world, allowing people to share information, communicate and access websites instantly. Every time you visit a website, send a message or watch a video, your device exchanges data with servers through the internet.

As a programmer, understanding how the internet works helps you build websites, web applications and online services. While the technology behind it is complex, the basic concepts are surprisingly simple.
`,
  whyItMatters: `
Almost every modern application relies on the internet. Understanding how browsers, servers and networks communicate will make it much easier to learn web development and understand how online applications work behind the scenes.
`,
  keyPrinciples: `
* Browsers request information from servers.
* Servers store and deliver websites and applications.
* Data is transferred across networks using the internet.
* Every website has a unique address called a domain name.
`,
  examples: `
The internet powers many everyday activities:

* Visiting a website.
* Sending emails.
* Watching YouTube videos.
* Shopping online.
* Using cloud storage.
`,
  commonMistakes: `
* Thinking the internet and the World Wide Web are the same thing.
* Believing websites are stored on your computer.
* Assuming information travels instantly without servers.
* Ignoring how browsers and servers work together.
`,
  exercises: `
* Visit a website and identify its domain name.
* Research what happens when you enter a URL into your browser.
* List three online services that rely on servers.
`,
  summary: `
The internet allows devices around the world to communicate by exchanging information through networks and servers. Every website, application and online service depends on these connections. Understanding these fundamentals provides an important foundation for learning web development and modern programming.
`,
  resources: `
### Recommended Books

* *How the Internet Really Works* — Article 19 / EFF (free online guide)
* *Computer Networking: A Top-Down Approach* — Kurose & Ross

### Practical Resources

* MDN Web Docs — "How the web works"
* CrashCourse — Internet & Web basics (video series)

### Challenge

This week, open your browser's developer tools (usually F12) and look at the "Network" tab while loading a website — watch the requests happen in real time.
`,
};
