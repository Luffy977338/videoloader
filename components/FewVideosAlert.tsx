import { GoInfo } from "react-icons/go";

export default function FewVideosAlert() {
  return (
    <div className='alert text-sm max-w-sm bg-base-300'>
      <div className='text-lg'>
        <GoInfo />
      </div>
      <div>
        If there are few videos in the post, then there will be few download
        buttons in the order of the videos in the posts.
      </div>
    </div>
  );
}
