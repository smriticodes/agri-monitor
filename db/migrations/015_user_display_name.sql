-- App-owned display name shown in Agri Monitor settings/header.
-- Idempotent.

ALTER TABLE user_preferences
  ADD COLUMN IF NOT EXISTS display_name VARCHAR(120) NULL;
