import { Post } from "./PostType"

export const posts: Post[] = [
  {
    _id: 1,
    slug: "welcome-to-cucs",
    title: "Welcome to CUCS",
    publishedDate: "2026-03-01",
    category: "notice",
    tags: ["announcement", "community"],
    description:
      "A quick hello from the Computer Science Society and what we are building this semester.",
  },
  {
    _id: 2,
    slug: "spring-workshops-2026",
    title: "Spring 2026 Workshops Lineup",
    publishedDate: "2026-03-05",
    category: "event",
    tags: ["events", "workshops"],
    description:
      "A preview of upcoming sessions covering web, AI, and systems fundamentals.",
  },
  {
    _id: 3,
    slug: "project-showcase-night",
    title: "Project Showcase Night",
    publishedDate: "2026-03-10",
    category: "college",
    tags: ["events", "showcase"],
    description:
      "Meet your peers and see the projects they have been building this term.",
  },
  {
    _id: 4,
    slug: "open-source-starter-pack",
    title: "Open Source Starter Pack",
    publishedDate: "2026-03-14",
    category: "other",
    tags: ["resources", "open-source"],
    description:
      "A practical guide to making your first open source contribution.",
  },
]
