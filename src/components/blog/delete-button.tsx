"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps {
  slug: string;
  title: string;
}

export function DeleteButton({ slug, title }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsOpen(false);
    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting blog post...");

    try {
      const response = await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success("Blog post deleted successfully!", {
          description: `"${title}" has been permanently removed.`,
          action: {
            label: "Go Home",
            onClick: () => router.push("/"),
          },
        });

        // Redirect to homepage after a short delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const error = await response.text();
        toast.dismiss(loadingToast);
        toast.error("Error deleting blog post", {
          description: error,
          action: {
            label: "Try Again",
            onClick: () => window.location.reload(),
          },
        });
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Error deleting blog post", {
        description: "An unexpected error occurred. Please try again.",
        action: {
          label: "Try Again",
          onClick: () => window.location.reload(),
        },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isDeleting}
          variant="outline"
          className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300"
        >
          {isDeleting ? "Deleting..." : "🗑️ Delete Post"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{title}&quot;? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:text-red-300"
          >
            {isDeleting ? "Deleting..." : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
