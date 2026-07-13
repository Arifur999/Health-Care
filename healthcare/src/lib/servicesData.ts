export interface IServiceItem {
  slug: string
  title: string
  excerpt: string
  description: string[]
  icon: "TestTube2" | "Bone" | "Activity" | "Stethoscope" | "Home" | "Baby"
}

export const services: IServiceItem[] = [
  {
    slug: "blood-and-pathology",
    title: "Blood & Pathology",
    excerpt: "CBC, blood sugar, lipid profile, thyroid, and full pathology panels.",
    description: [
      "Our pathology partners run the full range of routine and specialized blood work, from a simple complete blood count to detailed thyroid and hormone panels.",
      "Every result is digitized and attached to your patient record, so your doctor can review trends over time instead of a single snapshot.",
    ],
    icon: "TestTube2",
  },
  {
    slug: "imaging-and-x-ray",
    title: "Imaging & X-Ray",
    excerpt: "Digital X-ray, ultrasound, MRI, and CT scans read by certified radiologists.",
    description: [
      "From a routine chest X-ray to detailed MRI and CT imaging, our partner centers use digital equipment reviewed by certified radiologists.",
      "Imaging reports are shared directly to your dashboard so the ordering doctor can follow up without waiting on printed films.",
    ],
    icon: "Bone",
  },
  {
    slug: "cardiac-screening",
    title: "Cardiac Screening",
    excerpt: "ECG, echocardiogram, and stress tests for heart health monitoring.",
    description: [
      "Cardiac screening covers ECG, echocardiogram, and stress testing for anyone monitoring existing heart conditions or getting a baseline checkup.",
      "Results are reviewed alongside your appointment history, making it easy for a cardiologist to spot changes across visits.",
    ],
    icon: "Activity",
  },
  {
    slug: "full-body-checkup",
    title: "Full Body Checkup",
    excerpt: "Comprehensive packages that combine multiple tests into one visit.",
    description: [
      "Full body checkup packages bundle blood work, imaging, and a consultation into a single visit, ideal for annual screening.",
      "Your care team receives every result in one place, so follow-up recommendations can be made the same day.",
    ],
    icon: "Stethoscope",
  },
  {
    slug: "home-sample-collection",
    title: "Home Sample Collection",
    excerpt: "A technician visits you to collect samples at a time that works for you.",
    description: [
      "For patients who can't easily travel, a technician visits at a scheduled time to collect blood or other samples safely at home.",
      "Samples are logged and tracked the same way as an in-clinic visit, so nothing is lost in the handoff.",
    ],
    icon: "Home",
  },
  {
    slug: "maternal-and-child",
    title: "Maternal & Child",
    excerpt: "Prenatal screening, growth monitoring, and pediatric diagnostic panels.",
    description: [
      "Maternal and child services cover prenatal screening, growth monitoring, and pediatric diagnostic panels tailored to each stage of care.",
      "Records for both parent and child stay linked to the same family account for easier continuity of care.",
    ],
    icon: "Baby",
  },
]
