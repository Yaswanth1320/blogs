"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Use hard redirect to ensure proper session clearing and navigation
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <Button onClick={signOut} variant={"outline"}>
      Sign Out
    </Button>
  );
};
