"use client";

import { Button } from "@/shared/ui";
import Image from "next/image";

export const SocialsSignIn = () => {
  const handleClickGoogleSignIn = () => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_SIGN_IN_URL as string;
  };

  const handleClickGithubSignIn = () => {
    window.location.href = process.env.NEXT_PUBLIC_GITHUB_SIGN_IN_URL as string;
  };

  return (
    <div className="mb-4 flex flex-col space-y-2">
      <div className="flex items-center">
        <div className="flex-1 h-[0.5px] bg-gray-100" />
        <span className="mx-2 text-gray-100">OR</span>
        <div className="flex-1 h-[0.5px] bg-gray-100" />
      </div>
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={handleClickGoogleSignIn}
      >
        <Image src="/google.svg" alt="google-icon" width={20} height={20} />
        Sign In with Google
      </Button>
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={handleClickGithubSignIn}
      >
        <Image src="/github.svg" alt="github-icon" width={20} height={20} />
        Sign In with Github
      </Button>
    </div>
  );
};
