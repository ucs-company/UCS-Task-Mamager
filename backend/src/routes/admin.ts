import { Router, type Request, type Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

const router = Router()

router.get('/tasks', async (_req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin
    .from('tasks')
    .select('*, created_by_user:users(*)')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json({ tasks: data })
})

router.get('/stats', async (_req: Request, res: Response) => {
  const { data: tasks } = await supabaseAdmin
    .from('tasks')
    .select('*')

  if (!tasks) return res.json({ stats: null })

  const completed = tasks.filter((t) => t.status === 'done').length
  const inProgress = tasks.filter((t) => t.status === 'partially_done').length

  const byStatus = { pending: 0, partially_done: 0, done: 0 }

  tasks.forEach((t: { status: keyof typeof byStatus }) => {
    byStatus[t.status]++
  })

  res.json({
    total_tasks: tasks.length,
    completed_tasks: completed,
    in_progress_tasks: inProgress,
    tasks_by_status: byStatus,
  })
})

router.get('/users', async (_req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*, tasks(count), task_assignees(count)')
    .order('name')

  if (error) return res.status(500).json({ error: error.message })
  res.json({ users: data })
})

export default router
