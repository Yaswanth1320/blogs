import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import LoginButtons from "@/components/auth/login-buttons";

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-sm">
        <Card className="bg-black/60 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-1">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Sign in to access the full blogs
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <LoginButtons />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500">
              <p>By continuing, you agree to our</p>
              <p className="mt-1">
                <span className="text-green-600">Terms of Service</span> and{" "}
                <span className="text-green-600">Privacy Policy</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
