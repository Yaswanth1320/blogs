import { getSession, isAdmin } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { DeleteButton } from "@/components/blog/delete-button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@/app/markdown.css";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const isUserAdmin = session ? isAdmin(session.user.email) : false;

  if (!session) {
    redirect("/login");
  }
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="nav-link text-sm mb-4 inline-block">
          ← Back to home
        </Link>
        <time className="text-sm text-gray-400 block mb-2">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{post.icon}</span>
          <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
            {post.category}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300 mb-8">{post.excerpt}</p>
        <div className="bg-whitesmoke dark:bg-white p-8 shadow-md leading-relaxed w-full">
          <div className="markdown-content text-gray-800 dark:text-black">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {isUserAdmin && (
        <div className="mt-8 pt-8 border-t border-green-500/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-400">
              Admin Actions
            </h3>
            <DeleteButton slug={post.slug} title={post.title} />
          </div>
        </div>
      )}
    </article>
  );
}
