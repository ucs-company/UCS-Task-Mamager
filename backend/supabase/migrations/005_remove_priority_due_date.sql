-- Remove priority and due_date columns from tasks
ALTER TABLE tasks DROP COLUMN IF EXISTS priority;
ALTER TABLE tasks DROP COLUMN IF EXISTS due_date;
