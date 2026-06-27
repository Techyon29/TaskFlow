'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ListTodo, Menu, X, ArrowRight } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500 border border-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <ListTodo className="w-5 h-5" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Task<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">Flow</span>
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <Link href="/user" className="hover:text-white transition-colors duration-200">
            Dashboard
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
            Repository
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/auth/login" 
            className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors duration-200 px-4 py-2"
          >
            Login
          </Link>
          <Link 
            href="/auth/signup" 
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-neutral-900 px-6 py-6 flex flex-col gap-6 shadow-2xl animate-fade-in">
          <nav className="flex flex-col gap-4 text-base font-medium text-neutral-400">
            <a 
              href="#features" 
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              Features
            </a>
            <Link 
              href="/user" 
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              Dashboard
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              Repository
            </a>
          </nav>
          
          <div className="h-px bg-neutral-900 w-full" />

          <div className="flex flex-col gap-3">
            <Link 
              href="/auth/login" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center text-sm font-semibold text-neutral-300 hover:text-white py-2.5 rounded-xl border border-neutral-800 hover:bg-neutral-900 transition-all cursor-pointer"
            >
              Login
            </Link>
            <Link 
              href="/auth/signup" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-all duration-300"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar