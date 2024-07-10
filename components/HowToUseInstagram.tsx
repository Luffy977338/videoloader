import Image from "next/image";
import { GoInfo } from "react-icons/go";

export default function HowToUseInstagram() {
  return (
    <div>
      <h2 className='text-5xl flex justify-center font-bold'>How to use?</h2>
      <div className='mt-10 space-y-20'>
        <div className='space-y-10'>
          <span className='text-4xl font-semibold flex justify-center'>
            Reels
          </span>
          <span className='flex justify-center'>1. Copy reels link.</span>
          <div className='flex justify-center'>
            <Image
              src={"/htu_instagram_reels.png"}
              alt='htu instagram reels'
              width={0}
              height={0}
              className='w-[300px] h-[400px] rounded-lg'
              unoptimized
            />
          </div>
          <span className='flex justify-center'>
            2. Paste link and click "Search".
          </span>
          <div className='flex justify-center'>
            <Image
              src={"/htu_instagram_reels_paste_url.png"}
              alt='htu instagram reels paste url'
              width={0}
              height={0}
              className='w-[500px] h-[210px] rounded-lg object-cover'
              unoptimized
            />
          </div>
          <span className='flex justify-center'>
            3. Download video. It can take a few minutes if video is large.
          </span>
          <div className='flex justify-center'>
            <Image
              src={"/htu_instagram_reels_download.png"}
              alt='htu instagram reels paste url'
              width={0}
              height={0}
              className='w-[360px] h-[500px] rounded-lg object-cover'
              unoptimized
            />
          </div>
          <div className='space-y-10'>
            <span className='text-4xl font-semibold flex justify-center'>
              Post
            </span>
            <span className='flex justify-center'>1. Copy post link.</span>
            <div className='flex justify-center'>
              <Image
                src={"/htu_instagram_post_copy_link.png"}
                alt='htu instagram post copy link'
                width={0}
                height={0}
                className='w-[300px] h-[240px] rounded-lg object-cover'
                unoptimized
              />
            </div>
            <span className='flex justify-center'>
              2. Paste link and click "Search".
            </span>
            <div className='flex justify-center'>
              <Image
                src={"/htu_instagram_reels_paste_url.png"}
                alt='htu instagram reels paste url'
                width={0}
                height={0}
                className='w-[500px] h-[210px] rounded-lg object-cover'
                unoptimized
              />
            </div>
            <span className='flex justify-center'>
              3. Download video. It can take a few minutes if video is large.
            </span>
            <div className='flex justify-center'>
              <Image
                src={"/htu_instagram_reels_download.png"}
                alt='htu instagram reels paste url'
                width={0}
                height={0}
                className='w-[360px] h-[500px] rounded-lg object-cover'
                unoptimized
              />
            </div>
            <div className='flex justify-center'>
              <div className='alert text-sm max-w-sm bg-base-300'>
                <div className='text-lg'>
                  <GoInfo />
                </div>
                <div>
                  If there are few videos in the post, then there will be few
                  download buttons in the order of the videos in the posts.
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-10'>
            <span className='text-4xl font-semibold flex justify-center'>
              Stories
            </span>
            <span className='flex justify-center'>Soon...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
