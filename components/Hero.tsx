import React from "react";
import { IoCamera } from "react-icons/io5";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import RedditSvg from "./RedditSvg";
import ProductHuntSvg from "./ProductHuntSvg";
import XSvg from "./XSvg";
import HackerNewsSvg from "./HackerNewsSvg";
import Link from "next/link";
import { serverSession } from "@/lib/auth";

export default async function Hero() {
  const session = await serverSession();

  return (
    <div className='hero min-h-[calc(100vh-80px)] bg-base-300 py-10 flex justify-center'>
      <div className='hero-content flex-col py-4'>
        <div className='flex space-x-10'>
          <div className='max-w-md'>
            <h1 className='text-7xl font-bold'>Download every video</h1>
            <div className='mt-8 text-xl leading-8'>
              Get access to download every video that you want, and download it
              in few seconds
            </div>
            <Link href={session ? "/" : "/signin"}>
              <button className='btn btn-primary mt-10 group flex items-center space-x-1'>
                <span className='text-lg group-hover:scale-110 duration-100'>
                  <IoCamera />
                </span>
                <span>Get VideoLoader</span>
              </button>
            </Link>
            <div className='flex mt-14 items-center'>
              <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
                <div className='avatar'>
                  <div className='w-12'>
                    <Image
                      src='/car-av.jpg'
                      alt='user picture'
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </div>
                </div>
                <div className='avatar'>
                  <div className='w-12'>
                    <Image
                      src='/billy.jpg'
                      alt='user picture'
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </div>
                </div>
                <div className='avatar'>
                  <div className='w-12'>
                    <Image
                      src='/kiros-ivo.jpg'
                      alt='user picture'
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </div>
                </div>
                <div className='avatar'>
                  <div className='w-12'>
                    <Image
                      src='/retina-oks.jpg'
                      alt='user picture'
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </div>
                </div>
                <div className='avatar'>
                  <div className='w-12'>
                    <Image
                      src='/user-kis-av.jpg'
                      alt='user picture'
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
              <div className='ml-4 flex flex-col'>
                <div className='flex text-primary text-lg space-x-[2px]'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div>
                  More than <span className='font-bold'>2k</span> users
                </div>
              </div>
            </div>
          </div>
          <div className='hero-content'>
            <div className='max-w-md'>
              <Image src={"/hero.png"} alt='hero' width={400} height={400} />
            </div>
          </div>
        </div>
        <div className='mt-32 flex items-center space-x-4'>
          <span className='text-neutral-500 text-lg'>Find on</span>
          <div className='space-x-4 flex items-center'>
            <button>
              <XSvg />
            </button>
            <button>
              <RedditSvg />
            </button>
            <button>
              <ProductHuntSvg />
            </button>
            <button>
              <HackerNewsSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
