import { useEffect, useState, useRef } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { DashboardSkeleton } from '../components/ui/PageSkeleton'
import { Badge } from '../components/ui/Badge'
import { Link } from 'react-router-dom'
import { ListTodo, CheckCircle2, Clock, LogOut, User, Mail } from 'lucide-react'
import { STATUS_LABELS } from '../lib/constants'
import type { User as AppUser } from '../types'

export function DashboardPage() {
  const { profile, signOut, isAdmin } = useAuth()
  const { tasks, loading: tasksLoading } = useTasks()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0 })
  const [users, setUsers] = useState<AppUser[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!tasks.length) return
    const completed = tasks.filter((t) => t.status === 'done').length
    const inProgress = tasks.filter((t) => t.status === 'partially_done').length
    setStats({ total: tasks.length, completed, inProgress })
  }, [tasks])

  useEffect(() => {
    api.getUsers().then(({ users: data }) => { setUsers(data as AppUser[]); setUsersLoading(false) }).catch(() => setUsersLoading(false))
  }, [])

  if (tasksLoading || usersLoading) return <DashboardSkeleton />

  const recentTasks = tasks.slice(0, 5)

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white lg:text-2xl">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 lg:text-base">Welcome back, {profile?.name}</p>
        </div>
        <div className="relative lg:hidden" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-10 w-10 rounded-full ring-2 ring-primary/20" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-white ring-2 ring-primary/20">
                {profile?.name?.charAt(0) || 'U'}
              </div>
            )}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <button onClick={() => { setMenuOpen(false); navigate('/profile') }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                <User className="h-4 w-4" /> Profile
              </button>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <button onClick={() => { setMenuOpen(false); signOut() }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {[
          { label: 'Total', value: stats.total, icon: ListTodo, color: 'text-primary', bg: 'bg-primary-light dark:bg-primary/20' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 lg:text-sm">{label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">{value}</p>
              </div>
              <div className={`rounded-lg p-2 lg:p-3 ${bg}`}><Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${color}`} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Team</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {users.filter((u) => isAdmin || u.role !== 'admin').map((user) => {
            const userTasks = tasks.filter((t) => t.created_by === user.id || t.task_assignees?.some((a) => a.user_id === user.id))
            const completed = userTasks.filter((t) => t.status === 'done').length
            const ongoing = userTasks.filter((t) => t.status === 'partially_done').length
            const todo = userTasks.filter((t) => t.status === 'pending').length
            return (
              <button
                key={user.id}
                onClick={() => isAdmin ? navigate(`/team/${user.id}`) : undefined}
                className={`rounded-xl border border-gray-200 bg-white p-4 text-left transition-all dark:border-gray-700 dark:bg-gray-800 lg:p-5 ${
                  isAdmin ? 'cursor-pointer hover:shadow-md hover:border-primary/30' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  {user.avatar_url ? <img src={user.avatar_url} alt="" className="h-10 w-10 rounded-full lg:h-12 lg:w-12" />
                    : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-medium text-white lg:h-12 lg:w-12 lg:text-lg">{user.name?.charAt(0) || 'U'}</div>}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white lg:text-base">{user.name || 'Unknown'}</h3>
                    <div className="flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3 flex-shrink-0 text-gray-400" /><span className="text-xs text-gray-500 truncate dark:text-gray-400 lg:text-sm">{user.email}</span></div>
                  </div>
                  {user.role === 'admin' && <Badge variant="info">Admin</Badge>}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 lg:mt-4 lg:text-sm">
                  <span><strong className="text-gray-900 dark:text-white">{todo}</strong> Pending</span>
                  <span><strong className="text-amber-600">{ongoing}</strong> Active</span>
                  <span><strong className="text-emerald-600">{completed}</strong> Done</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700 lg:px-6 lg:py-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white lg:text-base">Recent Tasks</h2>
          <Link to="/tasks" className="text-xs text-primary hover:underline lg:text-sm">View All</Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTasks.map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`} className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 lg:px-6 lg:py-3">
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{task.description || task.title}</span>
              </div>
              <div className="hidden items-center gap-3 text-sm text-gray-500 sm:flex">
                <span>{STATUS_LABELS[task.status]}</span>
              </div>
            </Link>
          ))}
          {recentTasks.length === 0 && <p className="px-4 py-8 text-center text-sm text-gray-400 lg:px-6">No tasks yet. Create your first task!</p>}
        </div>
      </div>
    </div>
  )
}
