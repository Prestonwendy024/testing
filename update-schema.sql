-- Update existing database schema to make account_number nullable
-- Run this in your Supabase SQL editor

-- Make account_number nullable in clients table
ALTER TABLE clients ALTER COLUMN account_number DROP NOT NULL;

-- Update any existing empty strings to NULL
UPDATE clients SET account_number = NULL WHERE account_number = '';

-- Add a comment to document the change
COMMENT ON COLUMN clients.account_number IS 'Can be NULL until first account is created'; 