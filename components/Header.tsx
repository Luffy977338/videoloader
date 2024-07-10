import SignButton from "./SignButton";
import Link from "next/link";
import ProfileBar from "./ProfileBar";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  return (
    <header className='bg-neutral-800 sticky top-0 z-50'>
      <div className='flex justify-between items-center px-16 py-4'>
        <div className='flex items-center'>
          <Link href={`${process.env.NEXTAUTH_URL}`} className='white text-4xl'>
            VideoLoader
          </Link>
          <HeaderNav />
        </div>
        <div className='flex items-center space-x-4'>
          <ProfileBar />
          <div>
            <SignButton />
          </div>
        </div>
      </div>
    </header>
  );
}
