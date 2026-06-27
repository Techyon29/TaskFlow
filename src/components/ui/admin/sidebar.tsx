import React, { useState } from 'react'
import Link from 'next/link'
import {LayoutDashboard,User,Menu,X} from 'lucide-react'
import { cn } from '@/src/lib/utils'

const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
    <div className={cn(' min-w-2xs min-h-screen  border bg-background max-md:fixed transition-all duration-300 ease-in-out ', menuOpen ? "max-md:left-0":"max-md:-left-100")}>
        <aside className=' w-full h-full mt-10'>
            <h1 className=' text-4xl text-center text-white font-semibold'>Task<span className=' text-indigo-500'>Flow</span></h1>
            <nav className=' text-white pt-10 flex flex-col gap-4 text-xl'>
                <Link href={"/admin/"} className=' group flex items-center gap-2 justify-center p-4 hover:bg-white/10 border-l-4 hover:border-l-indigo-400'><LayoutDashboard className='group-hover:text-indigo-400'/>Dashboard</Link>
                <Link href={"/admin/user"} className='group flex items-center gap-2 justify-center p-4 hover:bg-white/10 border-l-4 hover:border-l-indigo-400'><User className='group-hover:text-indigo-400'/>User Management</Link>
            </nav>
        </aside>
    </div>
    <div className={cn(
      'p-2 max-md:block hidden absolute transition-all duration-300 ease-in-out', 
      menuOpen ? "left-75" : "left-2"
    )}>
    <button className=' text-white border p-2 rounded-lg border-indigo-500 hover:bg-indigo-400 cursor-pointer ' onClick={()=>setMenuOpen(prev=>!prev)}>{!menuOpen ? <Menu/> : <X/>} </button>
    </div>
    </>
  )
}

export default Sidebar