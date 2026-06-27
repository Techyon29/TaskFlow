'use client'
import Sidebar from '@/src/components/ui/admin/sidebar';
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Sidebar/>
      {children}
    </div>
  );
}
