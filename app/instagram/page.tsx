import InstallInstagramVideoForm from "@/components/InstallInstagramVideoForm";
import React from "react";
import HeaderFooterLayout from "../HeaderFooterLayout";
import HowToUseInstagram from "@/components/HowToUseInstagram";

export default function page() {
  return (
    <HeaderFooterLayout>
      <div className='py-20 space-y-10 flex flex-col items-center'>
        <InstallInstagramVideoForm />
        <HowToUseInstagram />
      </div>
    </HeaderFooterLayout>
  );
}
