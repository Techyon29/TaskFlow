'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ListTodo, 
  Zap, 
  Shield, 
  BarChart3, 
  Check,
  ChevronRight
} from 'lucide-react'

export default function Page() {
  // Demo task checklist state
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, title: 'Draft project proposal', completed: true },
    { id: 2, title: 'Refactor auth middlewares', completed: false },
    { id: 3, title: 'Configure resend email template', completed: false },
    { id: 4, title: 'Deploy staging build', completed: false },
  ])

  const toggleDemoTask = (id: number) => {
    setDemoTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const completedCount = demoTasks.filter(t => t.completed).length
  const progressPercent = Math.round((completedCount / demoTasks.length) * 100)

  return (
    <div className="text-white selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen">
      {/* Background ambient glow highlights */}
      <div className="absolute top-20 left-1/4 -translate-x-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 md:gap-8">
          
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-indigo-500/20 text-indigo-400 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>TaskFlow v1.0 is now live</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] uppercase">
              Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">Tasks</span>.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-none uppercase text-neutral-300">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Life</span>.
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed">
            TaskFlow is a premium, minimalist task manager designed for creators, developers, and professionals. Organize workflows, track visual analytics, and crush your daily goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/user"
              className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-full text-base cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] active:scale-95 w-full sm:w-auto"
            >
              Start Your Task
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features"
              className="flex items-center justify-center gap-1.5 border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/60 text-neutral-300 hover:text-white font-semibold px-6 py-3 rounded-full text-base cursor-pointer transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              Explore Features
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-8 mt-4 pt-6 border-t border-neutral-900 w-full">
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">100%</p>
              <p className="text-xs text-neutral-500 uppercase font-semibold mt-0.5">Privacy Focused</p>
            </div>
            <div className="h-8 w-px bg-neutral-900" />
            <div>
              <p className="text-2xl font-bold text-white tracking-tight">&lt; 100ms</p>
              <p className="text-xs text-neutral-500 uppercase font-semibold mt-0.5">Response Time</p>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Dashboard Mockup Demo */}
        <div className="lg:col-span-5 w-full relative">
          {/* Card Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-15" />
          
          <div className="relative glass-panel rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col gap-6">
            
            {/* Mock Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <ListTodo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-100 text-sm">Interactive Demo</h3>
                  <p className="text-xs text-neutral-500">Click checkboxes below to try TaskFlow</p>
                </div>
              </div>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 font-semibold px-2.5 py-1 rounded-full border border-indigo-500/20">
                Sandbox
              </span>
            </div>

            {/* Mock Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-400">Task Completion</span>
                <span className="text-indigo-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Interactive Tasks checklist */}
            <div className="flex flex-col gap-3">
              {demoTasks.map(t => (
                <button
                  key={t.id}
                  onClick={() => toggleDemoTask(t.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    t.completed 
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-neutral-400' 
                      : 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0">
                      {t.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-700 hover:text-indigo-400" />
                      )}
                    </span>
                    <span className={`text-sm font-medium ${t.completed ? 'line-through' : ''}`}>
                      {t.title}
                    </span>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md ${
                    t.completed 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {t.completed ? 'Done' : 'Active'}
                  </span>
                </button>
              ))}
            </div>

            {/* Dashboard Link Shortcut */}
            <Link 
              href="/user"
              className="mt-2 flex items-center justify-center gap-1.5 bg-neutral-900/60 hover:bg-indigo-600/10 hover:text-indigo-400 hover:border-indigo-500/30 text-neutral-400 text-xs font-semibold py-2.5 rounded-xl border border-neutral-800 transition-all duration-300"
            >
              <span>Go to Full Application Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

          </div>
        </div>

      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-neutral-900 relative">
        {/* Decorative Grid Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-indigo-500">Core Engine Features</h3>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
            Everything you need, nothing you don't.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-lg leading-relaxed">
            Engineered with a focus on simplicity, responsiveness, and premium aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="group rounded-2xl glass-panel glass-panel-hover p-6 md:p-8 flex flex-col gap-4 text-left">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Instant Productivity</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Create, update, and manage task flows under 100ms. Keep your mind focused on execution rather than waiting.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl glass-panel glass-panel-hover p-6 md:p-8 flex flex-col gap-4 text-left">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 w-fit">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Actionable Analytics</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Visual analytics counters break down total, completed, and overdue tasks to organize your schedule efficiently.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl glass-panel glass-panel-hover p-6 md:p-8 flex flex-col gap-4 text-left">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Highly Secured</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Engineered with Argon2 password cryptography, secure HTTPOnly tokens, and jose JWT encryption protocols.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-8 py-10 border-t border-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} TaskFlow Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/auth/login" className="hover:text-neutral-300 transition-colors">Login</Link>
          <Link href="/auth/signup" className="hover:text-neutral-300 transition-colors">SignUp</Link>
          <Link href="/user" className="hover:text-neutral-300 transition-colors">Dashboard</Link>
        </div>
      </footer>
    </div>
  )
}