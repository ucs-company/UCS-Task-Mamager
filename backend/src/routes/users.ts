import { Router, type Request, type Response } from 'express'
import { supabaseAdmin } from '../config/supabase'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin.from('users').select('*').order('name')
  if (error) return res.status(500).json({ error: error.message })
  res.json({ users: data })
})

router.get('/me', async (req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin.from('users').select('*').eq('id', req.userId).single()
  if (error) return res.status(500).json({ error: error.message })
  res.json({ user: data })
})

router.put('/me', async (req: Request, res: Response) => {
  const { name, onboarded } = req.body
  const updates: Record<string, unknown> = {}
  if (name !== undefined) updates.name = name.trim()
  if (onboarded !== undefined) updates.onboarded = onboarded
  if (!Object.keys(updates).length) return res.status(400).json({ error: 'No fields to update' })

  const { data, error } = await supabaseAdmin.from('users').update(updates).eq('id', req.userId).select().single()
  if (error) return res.status(500).json({ error: error.message })
  res.json({ user: data })
})

export default router
