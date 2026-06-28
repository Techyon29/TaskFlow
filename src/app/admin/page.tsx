"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { 
  Users, 
  ClipboardList, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Mail, 
  Calendar 
} from 'lucide-react'

interface User {
  name: string
  email: string
  createdAt: Date
}

const SkeletonCard = () => (
  <div className="glass-panel p-6 rounded-2xl animate-pulse flex justify-between items-center">
    <div className="space-y-3">
      <div className="h-4 w-24 bg-white/5 rounded"></div>
      <div className="h-8 w-16 bg-white/5 rounded"></div>
      <div className="h-3 w-32 bg-white/5 rounded"></div>
    </div>
    <div className="w-12 h-12 rounded-2xl bg-white/5"></div>
  </div>
)

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-white/5">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/5"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-white/5 rounded"></div>
          <div className="h-3 w-16 bg-white/5 rounded"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-32 bg-white/5 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 w-24 bg-white/5 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 w-16 bg-white/5 rounded-full"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 w-20 bg-white/5 rounded-full"></div>
    </td>
  </tr>
)

const Page = () => {
  const [totalUser, setTotalUser] = useState(0)
  const [totalTask, setTotalTask] = useState(0)
  const [newUserCount, setNewUserCount] = useState(0)
  const [newUser, setNewUser] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const res = await response.json();
      const { data } = res;
      if (!res.success) {
        toast.error(res.message)
      } else {
        setTotalTask(data.totalTask)
        setNewUserCount(data.newUserCount)
        setTotalUser(data.totalUser)
        setNewUser(data.user)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const filteredUsers = newUser.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-indigo-500 to-purple-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-blue-500 to-cyan-600',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const stats = [
    {
      title: "Total Users",
      count: totalUser,
      icon: Users,
      description: "Overall platform signups",
      glowClass: "glow-indigo",
      colorClass: "border-indigo-500/20 text-indigo-400 bg-indigo-500/10",
    },
    {
      title: "Total Tasks",
      count: totalTask,
      icon: ClipboardList,
      description: "Across all active boards",
      glowClass: "glow-amber",
      colorClass: "border-amber-500/20 text-amber-400 bg-amber-500/10",
    },
    {
      title: "New Users",
      count: newUserCount,
      icon: UserPlus,
      description: "Joined in the last 24h",
      glowClass: "glow-emerald",
      colorClass: "border-emerald-500/20 text-emerald-400 bg-emerald-500/10",
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 space-y-10 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-400 tracking-widest uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> System Console
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Dash<span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">board</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Analyze platform growth, usage, and manage member credentials.
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
          : stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div 
                  key={idx} 
                  className={`glass-panel glass-panel-hover p-6 rounded-2xl flex justify-between items-center transition-all duration-300 ${stat.glowClass}`}
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.title}</h3>
                    <h1 className="text-4xl font-bold text-white tracking-tight">{stat.count}</h1>
                    <p className="text-xs text-slate-500 font-medium">{stat.description}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${stat.colorClass} shadow-inner transition-transform duration-300 hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              )
            })
        }
      </section>

      {/* Users Section */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Registered Users
            </h2>
            <p className="text-slate-400 text-sm">
              List of all users registered on the platform.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-white/[0.01]">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, idx) => <SkeletonRow key={idx} />)
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                        <div className="p-4 rounded-full bg-white/5 text-slate-500 mb-2">
                          <Users className="w-8 h-8" />
                        </div>
                        <p className="text-slate-300 font-semibold text-lg">No users found</p>
                        <p className="text-xs text-slate-500">
                          Try searching for a different name or email address.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(user.name)} flex items-center justify-center text-white font-bold shadow-md shadow-black/30 group-hover:scale-105 transition-transform`}>
                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-500 md:hidden flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" /> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          {new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          User
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page