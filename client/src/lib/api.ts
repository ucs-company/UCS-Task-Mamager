const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function getToken(): Promise<string | null> {
  try {
    const clerk = (window as any).Clerk
    if (!clerk?.session) return null
    return clerk.session.getToken()
  } catch {
    return null
  }
}

async function headers(): Promise<Record<string, string>> {
  const token = await getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: await headers(),
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  syncUser: () => request<any>('POST', '/users/sync'),
  getUsers: () => request<{ users: any[] }>('GET', '/users'),
  getMe: () => request<{ user: any }>('GET', '/users/me'),
  updateUser: (data: { name?: string; onboarded?: boolean }) => request<{ user: any }>('PUT', '/users/me', data),
  setPassword: (password: string) => request<{ success: boolean }>('POST', '/users/set-password', { password }),
  getTasks: () => request<{ tasks: any[] }>('GET', '/tasks'),
  getTask: (id: string) => request<{ task: any }>('GET', `/tasks/${id}`),
  createTask: (data: any) => request<{ task: any }>('POST', '/tasks', data),
  updateTask: (id: string, data: any) => request<{ task: any }>('PUT', `/tasks/${id}`, data),
  deleteTask: (id: string) => request<{ success: boolean }>('DELETE', `/tasks/${id}`),
  getComments: (taskId: string) => request<{ comments: any[] }>('GET', `/comments/${taskId}`),
  addComment: (taskId: string, content: string) => request<{ comment: any }>('POST', `/comments/${taskId}`, { content }),
  deleteComment: (taskId: string, commentId: string) => request<{ success: boolean }>('DELETE', `/comments/${taskId}/${commentId}`),
  getActivity: (taskId: string) => request<{ activity: any[] }>('GET', `/activity/${taskId}`),
  getAdminStats: () => request<any>('GET', '/admin/stats'),
}
