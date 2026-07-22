// Lightweight bilingual dictionary for the public marketing surface
// (navbar, homepage hero/welcome, footer). Functional/dashboard UI stays in
// English. Add keys here and to both locales to extend coverage.
export type Locale = "en" | "bn"

export const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About us",
    "nav.services": "Services",
    "nav.doctors": "Doctors",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.appointment": "Appointment",
    "nav.login": "Login",
    "nav.dashboard": "Dashboard",
    "topbar.emergency": "Emergency",
    "topbar.workHour": "Work Hour",
    "topbar.location": "Location",

    "hero.tagline": "Caring for Life",
    "hero.title": "Leading the Way\nin Medical Excellence",
    "hero.cta": "Our Services",
    "hero.bookAppointment": "Book an Appointment",
    "hero.expertDoctors": "Expert Doctors",
    "hero.affordableCare": "Affordable Care",

    "welcome.eyebrow": "Welcome to MEDdical",
    "welcome.title": "A Great Place to Receive Care",
    "welcome.body":
      "Meddical connects you with qualified specialists, digital prescriptions, and diagnostic services so your care team stays coordinated from the very first visit.",
    "welcome.learnMore": "Learn More",

    "footer.tagline": "Leading the Way in Medical Excellence, Trusted Care.",
    "footer.importantLinks": "Important Links",
    "footer.contactUs": "Contact Us",
    "footer.newsletter": "Newsletter",
    "footer.emailPlaceholder": "Enter your email address",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved.",
  },
  bn: {
    "nav.home": "হোম",
    "nav.about": "আমাদের সম্পর্কে",
    "nav.services": "সেবাসমূহ",
    "nav.doctors": "ডাক্তারগণ",
    "nav.news": "খবর",
    "nav.contact": "যোগাযোগ",
    "nav.appointment": "অ্যাপয়েন্টমেন্ট",
    "nav.login": "লগইন",
    "nav.dashboard": "ড্যাশবোর্ড",
    "topbar.emergency": "জরুরি",
    "topbar.workHour": "কর্মঘণ্টা",
    "topbar.location": "ঠিকানা",

    "hero.tagline": "জীবনের যত্নে",
    "hero.title": "চিকিৎসা সেবায়\nআমরা এগিয়ে",
    "hero.cta": "আমাদের সেবা",
    "hero.bookAppointment": "অ্যাপয়েন্টমেন্ট নিন",
    "hero.expertDoctors": "অভিজ্ঞ ডাক্তার",
    "hero.affordableCare": "সাশ্রয়ী সেবা",

    "welcome.eyebrow": "মেডিক্যালে স্বাগতম",
    "welcome.title": "যত্ন নেওয়ার সেরা ঠিকানা",
    "welcome.body":
      "মেডিক্যাল আপনাকে যোগ্য বিশেষজ্ঞ, ডিজিটাল প্রেসক্রিপশন এবং ডায়াগনস্টিক সেবার সাথে যুক্ত করে, যাতে প্রথম ভিজিট থেকেই আপনার চিকিৎসা দল সমন্বিত থাকে।",
    "welcome.learnMore": "আরও জানুন",

    "footer.tagline": "চিকিৎসা সেবায় আমরা এগিয়ে, নির্ভরযোগ্য যত্ন।",
    "footer.importantLinks": "গুরুত্বপূর্ণ লিংক",
    "footer.contactUs": "যোগাযোগ করুন",
    "footer.newsletter": "নিউজলেটার",
    "footer.emailPlaceholder": "আপনার ইমেইল দিন",
    "footer.privacy": "গোপনীয়তা নীতি",
    "footer.terms": "সেবার শর্তাবলী",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
  },
} as const

export type TranslationKey = keyof (typeof translations)["en"]
