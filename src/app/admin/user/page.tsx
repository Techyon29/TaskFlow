"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react'

interface UserData {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

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
  const [users, setUsers] = useState<UserData[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async (currentPage: number, currentLimit: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/user?page=${currentPage}&limit=${currentLimit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const res = await response.json()
      if (!res.success) {
        toast.error(res.message)
      } else {
        setUsers(res.data)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(page, limit)
  }, [page, limit])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLimit = parseInt(e.target.value)
    setLimit(nextLimit)
    setPage(1)
  }

  const filteredUsers = users.filter(user =>
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

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 space-y-8 animate-fade-in">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-400 tracking-widest uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> User Directory
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            User <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage system roles, track sign-ups, and review platform membership details.
          </p>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search users on this page..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Per Page:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="bg-white/5 border border-white/10 text-white rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer font-medium"
            >
              <option value="5" className="bg-[#0f0f0f] text-white">5</option>
              <option value="10" className="bg-[#0f0f0f] text-white">10</option>
              <option value="25" className="bg-[#0f0f0f] text-white">25</option>
              <option value="50" className="bg-[#0f0f0f] text-white">50</option>
            </select>
          </div>
        </div>
      </section>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-white/[0.01]">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: limit }).map((_, idx) => <SkeletonRow key={idx} />)
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="p-4 rounded-full bg-white/5 text-slate-500 mb-2">
                        <Users className="w-8 h-8" />
                      </div>
                      <p className="text-slate-300 font-semibold text-lg">No users found</p>
                      <p className="text-xs text-slate-500">
                        Try modifying your search or navigate to another page.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr 
                    key={user._id} 
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                        {user.role}
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

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="text-sm text-slate-400 font-medium">
          Showing {filteredUsers.length} of {users.length} users on Page {page}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-white bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-500/5">
            {page}
          </div>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={users.length < limit || isLoading}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-white bg-white/5 hover:bg-white/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Page