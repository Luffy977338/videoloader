import InstallFacebookVideoForm from "@/components/InstallFacebookVideoForm";
import HeaderFooterLayout from "../HeaderFooterLayout";

export default function page() {
  return (
    <HeaderFooterLayout>
      <div className='py-20 space-y-10 flex flex-col items-center'>
        <InstallFacebookVideoForm />
      </div>
    </HeaderFooterLayout>
  );
}
