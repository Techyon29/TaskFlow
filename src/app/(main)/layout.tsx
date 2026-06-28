'use client'
import Navbar from "@/src/components/ui/home/Navbar";
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}