import GithubSignInButton from "@/components/GithubSignInButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import SignInForm from "@/components/SignInForm";
import HomeButton from "@/components/HomeButton";

export default function SignIn() {
  return (
    <div className='grid place-items-center min-h-screen'>
      <div>
        <div className='mb-2'>
          <HomeButton />
        </div>
        <div className='bg-base-300 px-4 py-5 rounded-xl max-w-md flex justify-center flex-col items-center'>
          <GithubSignInButton />
          <div className='mt-3 w-full'>
            <GoogleSignInButton />
          </div>
          <div className='divider'>OR</div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
