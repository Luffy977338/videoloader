import React from "react";
import { GoInfo } from "react-icons/go";

export default function VideoDownloading() {
  return (
    <div className='flex flex-col mt-10 items-center gap-y-5 justify-center'>
      <div className='alert text-sm max-w-sm bg-base-300'>
        <div className='text-lg'>
          <GoInfo />
        </div>
        <div>
          Video is downloading, it can take a few minutes if it is large or
          hight quality.
        </div>
      </div>
      <progress className='progress'></progress>
    </div>
  );
}
