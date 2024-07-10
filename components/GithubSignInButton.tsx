"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa6";

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <Link
      href={"#"}
      className='btn flex items-center space-x-1 bg-gray-700 hover:bg-opacity-75 hover:bg-gray-700 w-full'
      onClick={() => {
        signIn("github", { callbackUrl });
      }}
    >
      <span className='text-xl'>
        <FaGithub />
      </span>
      <span>Sign in with Github</span>
    </Link>
  );
}
