import { createContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import type { User as AppUser } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface AuthContextType {
  userId: string | null
  profile: AppUser | null
  loading: boolean
  isAdmin: boolean
  isNewUser: boolean
  signOut: () => void
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  userId: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isNewUser: false,
  signOut: () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { userId: clerkUserId, isLoaded, isSignedIn, signOut, getToken } = useClerkAuth()
  const [profile, setProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn || !clerkUserId) {
      setProfile(null)
      setLoading(false)
      return
    }
    syncUser()
  }, [isLoaded, isSignedIn, clerkUserId])

  async function syncUser() {
    try {
      const token = await getToken()
      if (!token) { setLoading(false); return }
      const res = await fetch(`${API_URL}/users/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfile(data.user)
    } catch (err) {
      console.error('Sync user failed:', err)
      setProfile(null)
    }
    setLoading(false)
  }

  async function refreshProfile() {
    try {
      const token = await getToken()
      if (!token) return
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.user) setProfile(data.user)
    } catch {}
  }

  const isAdmin = profile?.role === 'admin'
  const isNewUser = profile?.onboarded === false

  return (
    <AuthContext.Provider value={{ userId: clerkUserId, profile, loading, isAdmin, isNewUser, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
