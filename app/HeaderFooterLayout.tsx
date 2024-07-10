import Header from "@/components/Header";
import RootLayout from "./layout";

export default function HeaderFooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <Header />
      <main className='min-h-screen bg-base-200'>{children}</main>
    </RootLayout>
  );
}
