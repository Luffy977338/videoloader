"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useClickAway } from "../hooks/useClickAway";
import { AnimatePresence, motion } from "framer-motion";
import { FMenuPopUpFromBottom } from "../animations/PopUp.animation";

export default function ProfileBar() {
  const profileBarRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  useClickAway(() => setIsOpen(false), [profileBarRef, profileMenuRef]);

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className='skeleton w-[250px] h-[48px]'></div>;
  }

  if (session) {
    return (
      <div className='relative'>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          ref={profileBarRef}
          className='flex items-center btn btn-secondary space-x-2'
        >
          <span>{session.user.username || session.user.email}</span>
          {session.user.picture ? (
            <div className='avatar'>
              <div className='rounded-full'>
                <Image
                  src={session.user.picture}
                  width={32}
                  height={32}
                  alt='Avatar'
                />
              </div>
            </div>
          ) : (
            <div className='avatar'>
              <div className='rounded-full'>
                <Image
                  src={"/default-user-avatar.jpg"}
                  width={32}
                  height={32}
                  alt='Avatar'
                />
              </div>
            </div>
          )}
        </button>
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              variants={FMenuPopUpFromBottom}
              initial='from'
              animate='to'
              exit='from'
              transition={{ type: "keyframes", duration: 0.1 }}
              className='absolute w-[300px] right-0 bg-neutral-800 top-20 rounded-lg py-2'
              ref={profileMenuRef}
            >
              <div className='flex justify-between py-2 px-4'>
                <span>Plan</span>
                <span>Pro</span>
              </div>
              <div className='flex justify-between py-2 px-4'>
                <span>Videos left</span>
                <span>38</span>
              </div>
              <div className='flex justify-between py-2 px-4'>
                <span>Videos p/h left</span>
                <span>10</span>
              </div>
              <div className='flex justify-between py-2 px-4'>
                <span>Max duration</span>
                <span>3h</span>
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    );
  }
}
