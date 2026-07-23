import type { TaskStatus } from '../types'

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  partially_done: 'Partially Done',
  done: 'Done',
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  pending: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  partially_done: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
}
