import React from 'react'
import { Layers } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0a0a0a]/60 border-b border-neutral-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300">
              <Layers className="w-6 h-6 animate-float" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400 tracking-tight">
              Task<span className="text-indigo-500 font-extrabold">Flow</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs md:text-sm font-medium text-neutral-300 hover:text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Personal Workspace
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar