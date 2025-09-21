"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

// Import the editor dynamically to avoid SSR issues
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    icon: "📝",
    category: "Programming",
    slug: "",
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        if (!data.session) {
          router.push("/login");
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  // Load SimpleMDE CSS on the client side
  useEffect(() => {
    const loadCSS = async () => {
      try {
        // Use direct CDN link for the editor CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/easymde/dist/easymde.min.css";
        document.head.appendChild(link);
      } catch (error) {
        console.error("Failed to load editor CSS:", error);
      }
    };

    loadCSS();
  }, []);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading("Creating blog post...");

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success("Blog post created successfully!", {
          description: "Your new blog post has been published and is now live.",
          action: {
            label: "View Posts",
            onClick: () => router.push("/blog"),
          },
        });
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          icon: "📝",
          category: "Programming",
          slug: "",
        });
      } else {
        const error = await response.text();
        toast.dismiss(loadingToast);
        toast.error("Error creating blog post", {
          description: error,
          action: {
            label: "Try Again",
            onClick: () => window.location.reload(),
          },
        });
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Error creating blog post", {
        description: "An unexpected error occurred. Please try again.",
        action: {
          label: "Try Again",
          onClick: () => window.location.reload(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title first", {
        description: "A title is required to generate a slug.",
      });
      return;
    }

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, slug }));

    toast.success("Slug generated", {
      description: `Generated slug: ${slug}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Create and manage your blog posts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="mb-1">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog post title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug" className="mb-1">
                  Slug
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="blog-post-slug"
                    required
                  />
                  <Button
                    type="button"
                    onClick={generateSlug}
                    variant="outline"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon" className="mb-1">
                  Icon
                </Label>
                <Input
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="📝"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="mb-1">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Programming"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt" className="mb-1">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the blog post"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="content" className="mb-1">
                Content (Markdown)
              </Label>
              <div className="editor-wrapper" style={{ zIndex: 1 }}>
                <SimpleMdeEditor
                  id="content"
                  value={formData.content}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, content: value }))
                  }
                  options={{
                    spellChecker: false,
                    placeholder:
                      "Write your blog post content here using Markdown...",
                    status: ["lines", "words", "cursor"],
                    autosave: {
                      enabled: true,
                      delay: 1000,
                      uniqueId: "blog-post-content",
                    },
                  }}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Blog Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
