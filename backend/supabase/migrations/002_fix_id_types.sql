-- Fix user ID columns to accept Clerk IDs (text) instead of UUID
-- Must drop RLS policies first, then alter, then recreate

-- Drop ALL policies
DROP POLICY IF EXISTS "users_select" ON users;
DROP POLICY IF EXISTS "users_update_own" ON users;
DROP POLICY IF EXISTS "tasks_select" ON tasks;
DROP POLICY IF EXISTS "tasks_insert" ON tasks;
DROP POLICY IF EXISTS "tasks_update" ON tasks;
DROP POLICY IF EXISTS "tasks_delete" ON tasks;
DROP POLICY IF EXISTS "task_assignees_select" ON task_assignees;
DROP POLICY IF EXISTS "task_assignees_insert" ON task_assignees;
DROP POLICY IF EXISTS "task_assignees_delete" ON task_assignees;
DROP POLICY IF EXISTS "comments_select" ON comments;
DROP POLICY IF EXISTS "comments_insert" ON comments;
DROP POLICY IF EXISTS "comments_delete" ON comments;
DROP POLICY IF EXISTS "activity_logs_select" ON activity_logs;
DROP POLICY IF EXISTS "attachments_select" ON attachments;
DROP POLICY IF EXISTS "attachments_insert" ON attachments;
DROP POLICY IF EXISTS "attachments_delete" ON attachments;

-- Drop FK to auth.users (Supabase Auth, no longer needed with Clerk)
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- Drop foreign key constraints
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_created_by_fkey;
ALTER TABLE task_assignees DROP CONSTRAINT IF EXISTS task_assignees_user_id_fkey;
ALTER TABLE task_assignees DROP CONSTRAINT IF EXISTS task_assignees_assigned_by_fkey;
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_user_id_fkey;
ALTER TABLE activity_logs DROP CONSTRAINT IF EXISTS activity_logs_user_id_fkey;
ALTER TABLE attachments DROP CONSTRAINT IF EXISTS attachments_uploaded_by_fkey;

-- Drop primary key on users
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey;

-- Change column types from UUID to TEXT
ALTER TABLE users ALTER COLUMN id TYPE TEXT;
ALTER TABLE tasks ALTER COLUMN created_by TYPE TEXT;
ALTER TABLE task_assignees ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE task_assignees ALTER COLUMN assigned_by TYPE TEXT;
ALTER TABLE comments ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE activity_logs ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE attachments ALTER COLUMN uploaded_by TYPE TEXT;

-- Re-add primary key
ALTER TABLE users ADD PRIMARY KEY (id);

-- Re-add foreign keys
ALTER TABLE tasks ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE task_assignees ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE task_assignees ADD FOREIGN KEY (assigned_by) REFERENCES users(id);
ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE activity_logs ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE attachments ADD FOREIGN KEY (uploaded_by) REFERENCES users(id);

-- Recreate RLS policies
CREATE POLICY "users_select" ON users FOR SELECT USING (true);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (id = auth.uid());

CREATE POLICY "tasks_select" ON tasks FOR SELECT
  USING (created_by = auth.uid() OR EXISTS (SELECT 1 FROM task_assignees WHERE task_id = tasks.id AND user_id = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "tasks_insert" ON tasks FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "tasks_update" ON tasks FOR UPDATE USING (created_by = auth.uid() OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
CREATE POLICY "tasks_delete" ON tasks FOR DELETE USING (created_by = auth.uid() OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "task_assignees_select" ON task_assignees FOR SELECT
  USING (EXISTS (SELECT 1 FROM tasks WHERE id = task_assignees.task_id AND created_by = auth.uid()) OR user_id = auth.uid() OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "task_assignees_insert" ON task_assignees FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM tasks WHERE id = task_assignees.task_id AND created_by = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "task_assignees_delete" ON task_assignees FOR DELETE
  USING (EXISTS (SELECT 1 FROM tasks WHERE id = task_assignees.task_id AND created_by = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "comments_select" ON comments FOR SELECT
  USING (EXISTS (SELECT 1 FROM tasks WHERE id = comments.task_id AND (created_by = auth.uid() OR EXISTS (SELECT 1 FROM task_assignees WHERE task_id = tasks.id AND user_id = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin')));

CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "comments_delete" ON comments FOR DELETE USING (user_id = auth.uid() OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

CREATE POLICY "activity_logs_select" ON activity_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM tasks WHERE id = activity_logs.task_id AND (created_by = auth.uid() OR EXISTS (SELECT 1 FROM task_assignees WHERE task_id = tasks.id AND user_id = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin')));

CREATE POLICY "attachments_select" ON attachments FOR SELECT
  USING (EXISTS (SELECT 1 FROM tasks WHERE id = attachments.task_id AND (created_by = auth.uid() OR EXISTS (SELECT 1 FROM task_assignees WHERE task_id = tasks.id AND user_id = auth.uid()) OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin')));

CREATE POLICY "attachments_insert" ON attachments FOR INSERT WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "attachments_delete" ON attachments FOR DELETE USING (uploaded_by = auth.uid() OR (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
