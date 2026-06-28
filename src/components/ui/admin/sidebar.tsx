"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { LayoutDashboard, User, Menu, X, ShieldAlert, Sparkles, LogOut } from 'lucide-react'
import { cn } from '@/src/lib/utils'

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/user",
      label: "User Management",
      icon: User,
    }
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await response.json()
      if (res.success) {
        toast.success(res.message)
        window.location.href = '/auth/login'
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  return (
    <>
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div 
        className={cn(
          'fixed md:sticky top-0 left-0 z-50 h-screen w-64 border-r border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl flex flex-col justify-between py-6 transition-transform duration-300 ease-in-out md:translate-x-0', 
          menuOpen ? "translate-x-0" : "max-md:-translate-x-full"
        )}
      >
        <aside className="w-full flex flex-col h-full justify-between">
          <div className="space-y-8">
            <div className="px-6 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Task<span className="text-indigo-500">Flow</span>
                </h1>
              </Link>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname === `${link.href}/`
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 mx-4 rounded-xl text-sm font-medium transition-all duration-200 border',
                      isActive 
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-md shadow-indigo-500/5 font-semibold' 
                        : 'text-slate-400 border-transparent hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    <Icon className={cn('w-4 h-4 transition-colors', isActive ? 'text-indigo-400' : 'text-slate-400')} />
                    {link.label}
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 mx-4 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>

          <div className="border-t border-white/5 pt-6 px-6">
            <div className="flex items-center gap-3 p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-black/25">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">Administrator</div>
                <div className="text-[10px] text-indigo-400 font-medium flex items-center gap-1 mt-0.5">
                  <ShieldAlert className="w-3 h-3 text-indigo-500" /> Control Console
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div 
        className={cn(
          'fixed top-4 z-50 md:hidden transition-all duration-300 ease-in-out', 
          menuOpen ? "left-[272px]" : "left-4"
        )}
      >
        <button 
          className="flex items-center justify-center text-white bg-indigo-600 border border-indigo-500/30 p-2.5 rounded-xl shadow-lg cursor-pointer hover:bg-indigo-500 active:scale-95 transition-all" 
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </>
  )
}

export default Sidebar