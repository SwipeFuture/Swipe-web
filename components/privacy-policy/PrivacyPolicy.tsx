import PolicyView from "@/components/legal/PolicyView";

// Each block is either a paragraph (string) or a bullet list (string array),
// rendered in order so sections can mix prose and lists.
const SECTIONS: {
  title: string;
  blocks: (string | string[])[];
  link?: { label: string; href: string };
}[] = [
  {
    title: "Introduction",
    blocks: [
      "SwipeFuture (“we”, “our”, “us”) is a platform focused on helping people build knowledge in coding, artificial intelligence, finance and personal growth.",
      "We respect your privacy. This Privacy Policy explains what information may be collected when you visit this website and how it is used.",
      "The SwipeFuture app has its own privacy policy, which is linked inside the app.",
    ],
  },
  {
    title: "Who Is Responsible",
    blocks: [
      ["Roger Sigrist", "Jungfrauweg 4", "3053 Lätti", "Switzerland", "Email: swipefuture@icloud.com"],
    ],
  },
  {
    title: "Information We Collect",
    blocks: [
      "The website does not require an account and does not ask for personal information such as your name, email address or payment details. If you email us, we receive your address and whatever you write, and use them only to reply.",
      "Like most websites, basic technical information (such as your IP address, browser type and the pages requested) is processed automatically by our hosting provider so the website can be delivered and kept secure.",
    ],
  },
  {
    title: "How We Use Information",
    blocks: [
      "Any limited technical information is used only to:",
      [
        "keep the website running properly",
        "improve performance and user experience",
        "maintain the security and stability of SwipeFuture",
      ],
      "We do not sell or share personal information for advertising purposes.",
    ],
  },
  {
    title: "Analytics",
    blocks: [
      "We use Vercel Web Analytics to see how the website is used, in aggregated statistics only. For each page view it may record the time, the page, the referring site, your approximate location (country or region), your browser, your operating system and your device type.",
      "It does not use third-party cookies. According to Vercel, visits are recognised by a hash created from the incoming request, which is discarded after 24 hours, and the data is not tied to any individual or IP address.",
    ],
    link: { label: "How Vercel Web Analytics handles data", href: "https://vercel.com/docs/analytics/privacy-policy" },
  },
  {
    title: "Cookies",
    blocks: [
      "The website does not set its own tracking or advertising cookies. If that ever changes, this Privacy Policy will be updated first.",
    ],
  },
  {
    title: "Third-Party Services",
    blocks: [
      "The website is hosted by Vercel Inc., a US company, which also provides the analytics described above. Vercel may process technical information on servers outside your country, including in the United States. According to Vercel, such transfers are covered by its Data Privacy Framework certification and standard contractual clauses.",
      "Links to other sites, such as TikTok, Instagram or a helpline, are only followed if you click them. Those sites have their own privacy policies.",
    ],
  },
  {
    title: "Data Security",
    blocks: [
      "We take reasonable measures to protect the website and any information processed through it. However, no method of electronic transmission or storage can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Legal Basis (EU and EEA Visitors)",
    blocks: [
      "If the EU General Data Protection Regulation applies to you, we process this information based on our legitimate interests in delivering the website, keeping it secure and understanding how it is used in aggregated form.",
    ],
  },
  {
    title: "Your Rights",
    blocks: [
      "Depending on where you live, you may have the right to ask what personal information we hold about you and to have it corrected or deleted.",
      "For questions or requests about privacy, contact us using the link below.",
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      "Children under 13 should only use this website with a parent or guardian involved. The website does not ask for personal information, and we do not knowingly collect it from children.",
    ],
  },
  {
    title: "Changes to This Policy",
    blocks: [
      "We may update this Privacy Policy from time to time as SwipeFuture grows and new features become available. Any changes will be published on this page.",
    ],
  },
  {
    title: "Contact Us",
    blocks: [
      "If you have any questions about this Privacy Policy, feel free to contact us. If something seems wrong or you're worried about your data, just write to us. We're open to feedback and happy to look into it.",
    ],
    link: { label: "Get in touch", href: "/contact" },
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyView
      label="Legal"
      title="Privacy Policy"
      updated="November 5, 2026"
      intro="Your trust matters to us. Here's a clear, straightforward explanation of what data we collect, why we collect it, and how you stay in control."
      sections={SECTIONS}
    />
  );
}
