"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

export default function HomeButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <Link href={callbackUrl} className='btn btn-outline duration-300 group'>
      <span className='text-lg group-hover:-translate-x-[2px]'>
        <IoArrowBack />
      </span>
      <span>Home</span>
    </Link>
  );
}
