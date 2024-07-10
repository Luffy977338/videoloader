"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function SignButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className='skeleton w-[120px] h-[48px]'></div>;
  }

  if (session) {
    return (
      <>
        <Link
          href={""}
          draggable={false}
          className='btn btn-error'
          onClick={() => signOut()}
        >
          Sign out
        </Link>
      </>
    );
  }

  return (
    <div className='space-x-3'>
      <Link
        href={""}
        draggable={false}
        className='btn btn-primary'
        onClick={() => signIn()}
      >
        Sign in
      </Link>
    </div>
  );
}
