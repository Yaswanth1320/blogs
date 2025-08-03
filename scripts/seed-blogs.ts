import { db } from "../src/db";
import { blogPosts } from "../src/db/schema";

const samplePosts = [
  {
    id: "embracing-vim",
    slug: "embracing-vim",
    title: "Embracing Vim: The Unsung Hero of Code Editors",
    excerpt:
      "A deep dive into why Vim remains a powerful tool for modern development despite its steep learning curve.",
    content: "This is the full content of the Vim blog post...",
    icon: "⚡",
    category: "Development Tools",
    publishedAt: new Date("2024-04-09"),
  },
  {
    id: "spaces-vs-tabs",
    slug: "spaces-vs-tabs",
    title: "Spaces vs. Tabs: The Indentation Debate Continues",
    excerpt:
      "Exploring the age-old debate between spaces and tabs in code formatting.",
    content: "This is the full content of the spaces vs tabs blog post...",
    icon: "🔤",
    category: "Coding Standards",
    publishedAt: new Date("2024-04-08"),
  },
  {
    id: "static-typing",
    slug: "static-typing",
    title: "The Power of Static Typing in Programming",
    excerpt:
      "Understanding the benefits and importance of static typing in modern programming languages.",
    content: "This is the full content of the static typing blog post...",
    icon: "🛡️",
    category: "Programming",
    publishedAt: new Date("2024-04-07"),
  },
  {
    id: "react-hooks",
    slug: "react-hooks",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Learn how to effectively use React Hooks to build better functional components.",
    content: "This is the full content of the React Hooks blog post...",
    icon: "⚛️",
    category: "Programming",
    publishedAt: new Date("2024-04-06"),
  },
  {
    id: "typescript-tips",
    slug: "typescript-tips",
    title: "Advanced TypeScript Tips for Better Code",
    excerpt:
      "Discover advanced TypeScript features that will make your code more robust and maintainable.",
    content: "This is the full content of the TypeScript tips blog post...",
    icon: "🔷",
    category: "Programming",
    publishedAt: new Date("2024-04-05"),
  },
];

async function seedBlogPosts() {
  try {
    console.log("Seeding blog posts...");

    for (const post of samplePosts) {
      await db.insert(blogPosts).values(post);
      console.log(`✅ Inserted: ${post.title}`);
    }

    console.log("🎉 Blog posts seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding blog posts:", error);
  }
}

seedBlogPosts();
