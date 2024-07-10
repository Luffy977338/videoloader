import { serverSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import { IoCheckmarkOutline, IoCamera } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default async function PriceCard({
  include = [],
  notInclude = [],
  plan,
  best = false,
  prevPrice,
  currentPrice,
}: {
  include: string[];
  notInclude: string[];
  plan: string;
  best?: boolean;
  prevPrice: number;
  currentPrice: number;
}) {
  const session = await serverSession();

  return (
    <div
      className={`bg-base-100 p-8 flex ${
        best && "border-[2px] border-primary"
      } relative flex-col gap-5 rounded-lg w-[460px]`}
    >
      {best && (
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15px]'>
          <span className='badge text-xs text-primary-content font-semibold border-0 bg-primary'>
            Best
          </span>
        </div>
      )}
      <div className='text-lg font-bold'>{plan}</div>
      <div className='flex gap-2'>
        <div className='flex flex-col justify-end mb-1 text-lg'>
          <p className='relative opacity-80'>
            <span className='absolute bg-base-content h-[1.5px] inset-x-0 top-[48%] '></span>
            <span className='text-base-content'>${prevPrice}</span>
          </p>
        </div>
        <div className='font-extrabold text-5xl'>${currentPrice}</div>
        <div className='flex flex-col justify-end mb-1'>
          <p className='text-xs opacity-60 uppercase font-semibold'>usd</p>
        </div>
      </div>
      <ul className='space-y-2 leading-relaxed text-base flex-1'>
        {include.map((el) => (
          <li key={el} className='flex items-center gap-2'>
            <span className='text-lg'>
              <IoCheckmarkOutline />
            </span>
            <span>{el}</span>
          </li>
        ))}
        {notInclude.map((el) => (
          <li key={el} className='flex items-center gap-2 text-base-content/30'>
            <span className='text-lg'>
              <RxCross2 />
            </span>
            <span>{el}</span>
          </li>
        ))}
      </ul>
      <Link href={session ? "/" : "/signin"} className='w-full'>
        <button className='btn btn-primary group w-full flex items-center space-x-1'>
          <span className='text-lg group-hover:scale-110 duration-100'>
            <IoCamera />
          </span>
          <span>Get VideoLoader</span>
        </button>
      </Link>
    </div>
  );
}
