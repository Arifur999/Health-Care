export interface INewsArticle {
  slug: string
  title: string
  excerpt: string
  content: string[]
  date: string
  author: string
  category: string
}

export const newsArticles: INewsArticle[] = [
  {
    slug: "five-habits-healthy-heart",
    title: "Five habits that keep your heart healthy year-round.",
    excerpt:
      "Small, consistent choices protect your heart more than occasional intense efforts. Here are five habits our cardiology team recommends to every patient.",
    content: [
      "Cardiovascular health is built through daily habits, not once-a-year checkups. Regular movement, even a brisk 20-minute walk, keeps blood pressure and cholesterol in a healthier range over time.",
      "Sleep is just as important as diet. Consistently getting under six hours of sleep is linked to a higher risk of hypertension, so protecting your sleep schedule is a genuine cardiac intervention.",
      "Reducing sodium, managing stress, and scheduling regular checkups round out the habits our specialists see make the biggest long-term difference for patients.",
    ],
    date: "2026-06-08",
    author: "Care Team",
    category: "Health Care",
  },
  {
    slug: "first-specialist-visit",
    title: "What to expect during your first specialist visit.",
    excerpt:
      "Meeting a new specialist can feel overwhelming. Here's what actually happens during a first consultation and how to prepare.",
    content: [
      "Your first visit with a specialist usually starts with a review of your referral, medical history, and current symptoms in more depth than a general checkup allows.",
      "Bring a list of current medications, prior test results, and specific questions — specialists cover a lot of ground in a single visit and preparation makes it far more productive.",
      "Most first visits end with a plan: further diagnostics, a treatment approach, or a follow-up schedule, all of which are saved to your patient dashboard automatically.",
    ],
    date: "2026-06-13",
    author: "Care Team",
    category: "Medical",
  },
  {
    slug: "understanding-lab-results",
    title: "Understanding your lab results, explained simply.",
    excerpt:
      "Lab reports are full of abbreviations and reference ranges. Here's a plain-language guide to reading the most common ones.",
    content: [
      "Most lab reports list your result next to a 'reference range' — values outside that range aren't automatically alarming, they just prompt your doctor to look closer.",
      "Common panels like CBC (complete blood count) and lipid profiles each track a handful of markers; your care team reviews these together rather than in isolation.",
      "If anything is unclear, your digital prescription and health record make it easy to bring specific numbers into your next consultation for a direct explanation.",
    ],
    date: "2026-06-17",
    author: "Care Team",
    category: "Health Care",
  },
  {
    slug: "when-to-see-a-doctor",
    title: "When a symptom is worth booking an appointment for.",
    excerpt:
      "Not every ache needs a same-day visit, but some signs shouldn't wait. A quick guide to triaging your own symptoms responsibly.",
    content: [
      "Persistent symptoms — anything lasting more than a few days, or that steadily worsens — are generally worth a consultation rather than waiting it out.",
      "Sudden, severe, or unusual symptoms (chest pain, difficulty breathing, sudden vision changes) warrant emergency care immediately, not a scheduled appointment.",
      "For everything in between, booking a consultation early is almost always cheaper and less stressful than waiting until a condition becomes urgent.",
    ],
    date: "2026-06-22",
    author: "Care Team",
    category: "Surgery",
  },
  {
    slug: "digital-prescriptions-explained",
    title: "How digital prescriptions keep your care connected.",
    excerpt:
      "Paper prescriptions get lost. Here's how a digital record keeps your treatment history in one place across every doctor you see.",
    content: [
      "A digital prescription isn't just a copy of a paper one — it's tied to the specific appointment, doctor, and diagnosis it came from, so your history stays traceable.",
      "Follow-up dates attached to each prescription help you and your care team track when a treatment should be reviewed, rather than relying on memory.",
      "Because records live in your dashboard, any specialist you see next has the context they need without repeating tests or asking you to recall past treatments.",
    ],
    date: "2026-06-27",
    author: "Care Team",
    category: "Professional",
  },
  {
    slug: "preparing-for-diagnostics",
    title: "How to prepare for common diagnostic tests.",
    excerpt:
      "Fasting rules, timing, and what to bring — a short checklist before your next blood test or imaging appointment.",
    content: [
      "Many blood tests (like fasting glucose or lipid panels) require 8-12 hours without food — check your test order or ask your care team if you're unsure.",
      "For imaging like X-rays or ultrasounds, wearing loose clothing and avoiding metal accessories makes the appointment faster and more comfortable.",
      "Bringing your ID and any prior related results helps the technician compare against a baseline, which can speed up how quickly your doctor gets usable results.",
    ],
    date: "2026-07-02",
    author: "Care Team",
    category: "Medical",
  },
]

export const newsCategories = Array.from(
  newsArticles.reduce((map, article) => {
    map.set(article.category, (map.get(article.category) ?? 0) + 1)
    return map
  }, new Map<string, number>()),
).map(([label, count]) => ({ label, count }))
