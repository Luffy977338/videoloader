"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className='ml-5 space-x-3'>
      <Link
        className={`btn btn-ghost ${
          pathname === `/instagram` &&
          "bg-[var(--fallback-bc,oklch(var(--bc)/0.2))]"
        }  group`}
        href='/instagram'
      >
        <div>Instagram</div>
        <div>
          <Image
            src={"/instagram_logo.png.webp"}
            alt='instagram_logo'
            height={0}
            width={0}
            className={`h-5 w-5 ${
              pathname === `/instagram` ? "grayscale-0" : "grayscale"
            } group-hover:grayscale-0 duration-300`}
            unoptimized
          />
        </div>
      </Link>
      <Link
        className={`btn btn-ghost ${
          pathname === `/youtube` &&
          "bg-[var(--fallback-bc,oklch(var(--bc)/0.2))]"
        }  group`}
        href='/youtube'
      >
        <div>Youtube</div>
        <div>
          <Image
            src={"/youtube_logo.png"}
            alt='youtube_logo'
            height={0}
            width={0}
            className={`h-4 w-5 ${
              pathname === `/youtube` ? "grayscale-0" : "grayscale"
            } group-hover:grayscale-0 duration-300`}
            unoptimized
          />
        </div>
      </Link>
      <Link
        className={`btn ${
          pathname === `/facebook` &&
          "bg-[var(--fallback-bc,oklch(var(--bc)/0.2))]"
        } btn-ghost group`}
        href='/facebook'
      >
        <div>Facebook</div>
        <div>
          <Image
            src={"/facebook_logo.png"}
            alt='facebook_logo'
            height={0}
            width={0}
            className={`h-5 w-5 ${
              pathname === `/facebook` ? "grayscale-0" : "grayscale"
            } group-hover:grayscale-0 duration-300`}
            unoptimized
          />
        </div>
      </Link>
      <Link
        className={`btn ${
          pathname === `/twitter` &&
          "bg-[var(--fallback-bc,oklch(var(--bc)/0.2))]"
        } btn-ghost group`}
        href='/twitter'
      >
        <div>Twitter</div>
        <div>
          <Image
            src={"/twitter_logo.png"}
            alt='twitter_logo'
            height={0}
            width={0}
            className={`h-5 w-5 ${
              pathname === `/twitter` ? "grayscale-0" : "grayscale"
            } group-hover:grayscale-0 duration-300 rounded-md`}
            unoptimized
          />
        </div>
      </Link>
    </nav>
  );
}
