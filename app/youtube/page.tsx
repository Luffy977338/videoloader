import InstallYoutubeVideoForm from "@/components/InstallYoutubeVideoForm";
import React from "react";
import HeaderFooterLayout from "@/app/HeaderFooterLayout";

export default function page() {
  return (
    <HeaderFooterLayout>
      <div className='py-20'>
        <InstallYoutubeVideoForm />
      </div>
    </HeaderFooterLayout>
  );
}
