-- Seed data for UCS Task Manager
-- Run this after migrations and after at least one user has signed in

-- Set admin role (replace with actual email after first sign-in)
-- UPDATE users SET role = 'admin' WHERE email = 'admin@ucs.com';

-- Sample tasks (run after at least one user exists)
-- INSERT INTO tasks (title, description, status, created_by)
-- VALUES
--   ('Design homepage mockup', 'Create wireframes for the new company homepage', 'pending', (SELECT id FROM users LIMIT 1)),
--   ('Set up CI/CD pipeline', 'Configure GitHub Actions for automated deployment', 'partially_done', (SELECT id FROM users LIMIT 1)),
--   ('Write API documentation', 'Document all REST endpoints with examples', 'done', (SELECT id FROM users LIMIT 1)),
--   ('Fix login bug', 'Users reporting errors on Google sign-in', 'partially_done', (SELECT id FROM users LIMIT 1)),
--   ('Database backup strategy', 'Implement automated daily backups', 'pending', (SELECT id FROM users LIMIT 1));
