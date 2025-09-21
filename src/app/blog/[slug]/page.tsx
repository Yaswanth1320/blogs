import { getSession, isAdmin } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { DeleteButton } from "@/components/blog/delete-button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/ui/code-block";
import { Components } from "react-markdown";
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
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <Link href="/" className="nav-link text-sm mb-6 inline-block">
          ← Back to home
        </Link>
        <time className="text-sm text-gray-400 block mb-4">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-4xl font-bold mb-8 leading-tight text-white">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{post.icon}</span>
          <span className="text-sm text-green-400 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
            {post.category}
          </span>
        </div>
        <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-green-500 pl-6 py-4 bg-green-500/5 rounded-r-lg">
          {post.excerpt}
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={
              {
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const isInline = !className?.includes("language-");

                  if (!isInline && language) {
                    return (
                      <CodeBlock language={language} className={className}>
                        {String(children).replace(/\n$/, "")}
                      </CodeBlock>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              } as Components
            }
          >
            {post.content}
          </ReactMarkdown>
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
