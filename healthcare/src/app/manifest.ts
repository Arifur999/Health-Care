import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MEDdical — Hospital & Doctor Appointments",
    short_name: "MEDdical",
    description:
      "Book doctor appointments, join video consultations, and keep your prescriptions and health records in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfefe",
    theme_color: "#1f2b6c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}
