"use client";

import { useState } from "react";
import { Button } from "./button";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-gray-300 mb-6">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setError("");
          }}
          className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-300 text-lg">
          Have a question or want to collaborate? I&apos;d love to hear from
          you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="What's this about?"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
            placeholder="Tell me more..."
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r hover:text-black from-green-500/20 to-green-600/20 text-green-400 border border-green-500/40 hover:from-green-500/30 hover:to-green-600/30 hover:border-green-500/60 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
