

<h1 align="center">Blogs</h3>

<div align="center">
  <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=336791" alt="postgresql" />
  <img src="https://img.shields.io/badge/-Neon-black?style=for-the-badge&logoColor=white&logo=neon&color=1E90FF" alt="neon" />
  <img src="https://img.shields.io/badge/-Drizzle-black?style=for-the-badge&logoColor=white&logo=drizzle&color=8B5CF6" alt="drizzle" />
  <img src="https://img.shields.io/badge/-Better_Auth-black?style=for-the-badge&logoColor=white&logo=lock&color=22C55E" alt="better-auth" />
</div>

<br />

## About
A modern, responsive blog built with Next.js, featuring a clean design and RSS feed support.

## Features

- ✨ Modern, responsive design
- 📝 Blog post management
- 📡 RSS feed support
- 🔐 Authentication with GitHub/Google
- 🎨 Dark theme with green accents
- 📱 Mobile-friendly interface



## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yaswanth1320/blogs.git
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Environment Variables

Create a `.env.local` file with:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/blogs"

# Auth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## RSS Feed

Subscribe to the RSS feed at `/api/rss` to stay updated with new blog posts.

## License

This project is open source and available under the [MIT License](LICENSE).
