import { useState, useRef, useEffect, useContext } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, ClipboardList, LogOut, User } from 'lucide-react'

export function Header() {
  const { profile, signOut } = useAuth()
  const { dark, toggle } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 lg:h-16 lg:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          <ClipboardList className="h-4 w-4" />
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white">UCS Tasks</span>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {dark ? <Sun className="h-4 w-4 lg:h-5 lg:w-5" /> : <Moon className="h-4 w-4 lg:h-5 lg:w-5" />}
        </button>

        {profile && (
          <div className="relative" ref={ref}>
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 lg:gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{profile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{profile.role}</p>
              </div>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="h-8 w-8 rounded-full lg:h-9 lg:w-9" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white lg:h-9 lg:w-9 lg:text-sm">
                  {profile.name?.charAt(0) || 'U'}
                </div>
              )}
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => { setOpen(false); navigate('/profile') }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <User className="h-4 w-4" /> Profile
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => { setOpen(false); signOut() }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
