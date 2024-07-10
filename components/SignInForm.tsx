"use client";

import email from "next-auth/providers/email";
import React, { FormEvent, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import EmailSvg from "./EmailSvg";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signIn("email", { callbackUrl, email });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      <label className='input input-bordered cursor-text flex items-center gap-2'>
        <EmailSvg />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type='email'
          className='grow'
          placeholder='Email'
        />
      </label>
      <button className='btn btn-secondary flex items-center space-x-1 w-full'>
        {isLoading ? (
          <div className='loading loading-spinner'></div>
        ) : (
          <>
            <span className='text-lg'>
              <FaWandMagicSparkles />
            </span>
            <span>Send magic link</span>
          </>
        )}
      </button>
    </form>
  );
}
