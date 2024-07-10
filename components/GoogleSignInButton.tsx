"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <Link
      href={"#"}
      className='btn bg-white text-black w-full hover:bg-opacity-75 hover:bg-white flex items-center space-x-1'
      onClick={() => {
        signIn("google", { callbackUrl });
      }}
    >
      <span>
        <Image
          width={20}
          height={20}
          src={`/google_logo.png`}
          alt='google_logo'
        />
      </span>
      <span>Sign in with Google</span>
    </Link>
  );
}
