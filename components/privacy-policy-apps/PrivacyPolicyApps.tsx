import PolicyView from "@/components/legal/PolicyView";

// Content mirrors each app's own in-app Privacy Policy (lib/privacyPolicy.js
// in every one of the 4 apps' repos) — this page is the public web copy of
// that same document, not a separate/different policy. Keep the two in sync:
// whenever an app's in-app copy changes, update the matching section here
// too. This is a solid starting draft, not legal advice — have an actual
// lawyer review it before relying on it for a real App Store/Play Store
// submission, especially the children's-privacy section.
//
// Each block is either a paragraph (string) or a bullet list (string array),
// rendered in order so sections can mix prose and lists — same shape as the
// website's own general Privacy Policy component.
const SECTIONS: {
  title: string;
  blocks: (string | string[])[];
  link?: { label: string; href: string };
}[] = [
  {
    title: "Introduction",
    blocks: [
      "This Privacy Policy covers the SwipeFuture app for iPhone, with its four learning areas Coding, Finance, Personal Growth, and AI. All areas share one account and one backend, so this single policy applies to the whole app. It also still applies to the earlier single apps SwipeFuture Coding, SwipeFuture Finance, SwipeFuture Personal Growth, and SwipeFuture AI, which use the same account and backend.",
      "This is different from swipefuture.dev's own general Privacy Policy, which covers this website itself, not the apps.",
    ],
  },
  {
    title: "Who Is Responsible for Your Data",
    blocks: [
      "The SwipeFuture app is offered by, and the party responsible for processing your personal data is:",
      ["Roger Sigrist", "Jungfrauweg 4", "3053 Lätti", "Switzerland", "Email: swipefuture@icloud.com"],
      "For any questions about your data or to exercise your rights (see \"Your Rights\" below), contact us at swipefuture@icloud.com.",
    ],
  },
  {
    title: "Information We Collect",
    blocks: [
      "Account information: your email address and password, used only to sign you in (your password is hashed and never visible to us).",
      "Sign in with Apple: if you choose to sign in with Apple, Apple shares a unique account identifier and, if you allow it, your name and email address with us. If you choose \"Hide My Email\", we only receive a private relay address from Apple, never your real one. We also keep a sign-in token from Apple, used only to revoke your Apple sign-in for the SwipeFuture apps when you delete your account.",
      "Optional recovery email: a separate email address you can add in Settings, used only to send you a password-reset link if you forget your password.",
      "Optional profile information: display name, bio, avatar photo, country, age group, gender, what you're most interested in learning, and one just-for-fun preference question — you choose whether to provide any of this. Gender/age/interest/preference answers are never shown to other users; they are used for aggregated statistics about who uses SwipeFuture, and are visible only to the SwipeFuture team for running the service and handling support or moderation requests.",
      "Learning data: which lessons, quizzes, and tests you have completed in each area, your XP, and your daily streak.",
      "Plan and usage data: which plan you're on (Free or a paid plan) and how many daily lesson tokens you have left, used only to apply that plan's daily limit.",
      "App usage time: how much time you spend with the SwipeFuture app open in the foreground, and how often you open it, totaled per month. We do not record what you tap, type, or look at — only these two totals.",
    ],
  },
  {
    title: "How We Use Your Information",
    blocks: [
      "To run your account and keep your learning progress in sync across your devices and areas.",
      "To personalize your profile and certificate.",
      "To apply your plan's daily lesson-token limit and let you switch plans.",
      "To show you your own usage statistics, such as how much time you've spent learning with SwipeFuture over a month or a year. Your usage time is only ever shown to you, never to other users.",
      "To send you a password-reset link if you request one, and a one-time confirmation link when you add a recovery email.",
      "To send you an optional streak-reminder notification if you turn that on in Settings — this is scheduled on your own device and does not involve sending your data anywhere.",
      "We do not use your data for advertising, do not build advertising profiles from it, and do not sell it to anyone.",
    ],
  },
  {
    title: "Public Leaderboard & Other Users",
    blocks: [
      "The app includes leaderboards and a name search so you can see how you compare to other users. If you have a profile, your display name, avatar photo, country, bio, badges, and your level/streak/progress in each area are visible to other signed-in SwipeFuture users through this leaderboard and search — that is how these features work.",
      "Your email address, recovery email, password, plan/billing status, survey answers, and app usage time are never shown to any other user, on the leaderboard or anywhere else.",
      "You can turn this off completely at any time in Settings → Privacy → \"Hide From Leaderboard\" — this does not just remove you from the leaderboard rankings, it removes you from name search too and stops anyone from viewing your public profile at all, at every rank, for every query. With that setting on, it is the same as never having had a public profile in the first place, and you can turn it back off again whenever you want.",
      "You can change or clear your display name, avatar, bio, and country at any time in your profile, and permanently removing your account (Settings → Delete Account) also permanently removes you from the leaderboard and search.",
    ],
  },
  {
    title: "Educational Content, Not Financial Advice",
    blocks: [
      "The Finance area of SwipeFuture is educational. Everything in it — lessons, quizzes, the Money Advisor, and every other feature — is provided for general informational and educational purposes only, to help you understand financial concepts. It is not financial, investment, tax, legal, or other professional advice, and it is not a personalized recommendation to buy, sell, or hold any security, cryptocurrency, or other asset.",
      "Tax and retirement content in particular describes general concepts only, since exact rules vary by country and change over time — always check your own country's current rules or a qualified professional before acting on them.",
      "We do not know your personal financial situation, and nothing in the Finance area should be treated as a substitute for advice from a licensed financial advisor, tax professional, or attorney. Investing and trading involve risk, including the possible loss of money; past performance shown in any example does not guarantee future results. You are solely responsible for any financial decisions you make.",
      "The same applies to the Personal Growth area: lessons about topics like sleep, stress, fitness, or mental well-being are general educational information only. They are not medical, psychological, or therapeutic advice, do not diagnose or treat any condition, and are not a substitute for a doctor or other qualified professional. If you are struggling, please reach out to a professional or a local support service.",
    ],
  },
  {
    title: "Community Rules & Account Removal",
    blocks: [
      "SwipeFuture has zero tolerance for objectionable content or abusive users. By creating an account, you agree not to post or display — in your display name, bio, profile photo, or anywhere else in the app — any content that is:",
      [
        "hateful, discriminatory, harassing, bullying, or threatening toward anyone",
        "sexual, pornographic, or sexually suggestive",
        "violent, graphic, or glorifying self-harm",
        "illegal, or promoting illegal activity or drugs",
        "impersonating another person, brand, or the SwipeFuture team",
        "spam, advertising, scams, or links meant to mislead other users",
        "someone else's private information, or anything that infringes someone else's rights",
      ],
      "You can report or block any user directly from their profile. Every report is reviewed by the SwipeFuture team, and we aim to act on reports within 24 hours.",
      "If content or behavior breaks these rules, we may remove the content, hide the profile from the leaderboard and search, or suspend or permanently delete the account — at our discretion and, where necessary to protect other users, without prior notice. Serious or repeated violations lead to permanent deletion of the account and all data tied to it.",
      "Deleting an account this way does not cancel an active App Store subscription; subscriptions are managed and refunded only by Apple, through your Apple ID settings.",
    ],
  },
  {
    title: "Subscriptions & Payment",
    blocks: [
      "Go and Pro are auto-renewable subscriptions bought through the Apple App Store. All payment is handled entirely by Apple — we never see, receive, or store your card details or any other payment information. We only store which plan you're currently on, so the app can apply the right daily token limit in all four apps.",
      "We use RevenueCat, a subscription-management service, to verify purchases and keep your plan in sync with your account. RevenueCat receives your SwipeFuture account ID (a random identifier) and your App Store purchase records for the SwipeFuture app — which plan, when it was bought, renewed, or cancelled — but never your name, email address, or payment details.",
      "Managing or cancelling a subscription is done in your Apple ID subscription settings, not within the SwipeFuture app.",
    ],
  },
  {
    title: "Where Your Data Is Stored",
    blocks: [
      "Your data is stored with Supabase, the third-party backend provider that hosts our database, authentication, and file storage, on servers in the European Union (Ireland).",
      "Password-reset and recovery-email confirmation emails are sent through Brevo, a third-party email delivery provider. Brevo receives the address the email is sent to and the email itself, and may record delivery, opens and link clicks for these emails as part of its service.",
      "Subscription purchase records are processed by RevenueCat, as described in \"Subscriptions & Payment\" above.",
      "App updates are delivered by Expo (650 Industries, Inc., USA). When the app checks for an update, Expo may receive your IP address, your device's operating system and a random update token.",
      "To prevent abuse of password-reset and recovery emails, we store scrambled (hashed) versions of email addresses and IP addresses for about a day.",
      "If you sign in with Apple, Apple handles that sign-in under its own privacy policy; when you delete your account, we ask Apple to revoke the SwipeFuture app's access to your Apple ID.",
      "Some of these providers (for example RevenueCat and Expo) may process data outside Switzerland and the European Union, such as in the United States. Where that happens, it is covered by the providers' standard data-protection safeguards (such as the EU Standard Contractual Clauses).",
      "We share data with these providers only to run the app, and they must give your data the same or equal protection as described in this policy. We do not share your data with any other third party.",
    ],
  },
  {
    title: "How Long We Keep Your Data",
    blocks: [
      "We keep your data for as long as your account exists. When you delete your account (Settings → Delete Account), your profile, learning progress, usage statistics, survey answers, and profile photo are permanently deleted, and you disappear from the leaderboard and search immediately.",
      "Reports you made about other users, or that others made about you, are deleted together with the account they belong to.",
    ],
  },
  {
    title: "Legal Bases (EU and EEA Users)",
    blocks: [
      "If the EU General Data Protection Regulation applies to you, we rely on these legal bases:",
      [
        "Contract: running your account, your learning progress and your plan.",
        "Consent: optional profile details and survey answers, and streak reminders. You can withdraw consent at any time by removing the details or turning reminders off in the app.",
        "Legitimate interests: keeping the app secure, preventing abuse, moderating reports, and understanding usage in aggregated form.",
        "Legal obligations: where the law requires us to keep or disclose data.",
      ],
    ],
  },
  {
    title: "Your Rights",
    blocks: [
      "Depending on where you live (for example under the Swiss Federal Act on Data Protection or the EU General Data Protection Regulation), you have the right to:",
      [
        "access the personal data we hold about you and get a copy of it",
        "have incorrect data corrected",
        "have your data deleted — you can also do this yourself at any time via Settings → Delete Account",
        "object to or restrict certain processing of your data",
        "lodge a complaint with a data protection authority, such as the Swiss Federal Data Protection and Information Commissioner (FDPIC) or the authority in your EU country",
      ],
      "To exercise any of these rights, email us at swipefuture@icloud.com.",
    ],
  },
  {
    title: "Your Choices",
    blocks: [
      "You can edit or remove most profile fields (including your display name, avatar, bio, and country — everything shown on the leaderboard) at any time in the app.",
      "You can hide your profile from the leaderboard and search entirely, making it completely private, at any time in Settings → Privacy → \"Hide From Leaderboard\" — see \"Public Leaderboard & Other Users\" above for exactly what this does.",
      "You can report or block another user directly from their profile if their content is inappropriate; reported profiles are reviewed and can be removed.",
      "You can upgrade your plan in the app, and change or cancel a subscription at any time in your Apple ID subscription settings.",
      "You can turn streak-reminder notifications and lesson sounds on or off at any time in Settings.",
      "You can permanently delete your account and everything tied to it, including removing yourself from the leaderboard and search, at any time via Settings → Delete Account — this cannot be undone.",
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      "The SwipeFuture app is intended for a general audience and are not directed at children under 13 without the involvement of a parent or guardian.",
    ],
  },
  {
    title: "Changes to This Policy",
    blocks: [
      "We may update this policy from time to time. Continuing to use the app after a change means you accept the updated policy.",
    ],
  },
  {
    title: "Contact",
    blocks: ["Questions about this policy? Email us at swipefuture@icloud.com or reach out via swipefuture.dev. If something seems wrong or you're worried about your data, just write to us. We're open to feedback and happy to look into it."],
    link: { label: "Get in touch", href: "/contact" },
  },
];

export default function PrivacyPolicyApps() {
  return (
    <PolicyView
      label="Legal · App"
      title="App Privacy Policy"
      updated="November 13, 2026"
      intro="This page covers the SwipeFuture app and its four areas: Coding, Finance, Personal Growth, and AI, all with one SwipeFuture account. Here's a clear, straightforward explanation of what data we collect, why we collect it, and how you stay in control."
      sections={SECTIONS}
    />
  );
}
