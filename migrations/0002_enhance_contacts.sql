-- Enhance contacts table with security and tracking features
ALTER TABLE contacts ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE contacts ADD COLUMN referer TEXT;
ALTER TABLE contacts ADD COLUMN spam_score INTEGER DEFAULT 0;

-- Update status enum to include spam
-- SQLite doesn't support ALTER COLUMN directly, so we handle this in application logic
-- Status values: 'new', 'read', 'replied', 'spam'

-- Rate limiting table for IP-based tracking
CREATE TABLE IF NOT EXISTS rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_request DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip_address)
);

-- Form tokens table for CSRF protection (optional, can use stateless tokens)
CREATE TABLE IF NOT EXISTS form_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL UNIQUE,
  ip_address TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL
);

-- Email logs table for tracking notifications
CREATE TABLE IF NOT EXISTS email_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contact_id INTEGER,
  email_type TEXT NOT NULL, -- 'admin_notification', 'auto_reply'
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL, -- 'sent', 'failed'
  error_message TEXT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES contacts(id)
);

-- Additional indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_updated_at ON contacts(updated_at);
CREATE INDEX IF NOT EXISTS idx_contacts_spam_score ON contacts(spam_score);
CREATE INDEX IF NOT EXISTS idx_contacts_ip_address ON contacts(ip_address);

CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON rate_limits(window_start);

CREATE INDEX IF NOT EXISTS idx_form_tokens_hash ON form_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_form_tokens_expires_at ON form_tokens(expires_at);

CREATE INDEX IF NOT EXISTS idx_email_logs_contact_id ON email_logs(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);

-- Trigger to automatically update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_contacts_updated_at 
  AFTER UPDATE ON contacts
  FOR EACH ROW 
BEGIN
  UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Cleanup old form tokens (runs during maintenance)
-- DELETE FROM form_tokens WHERE expires_at < datetime('now', '-1 day');

-- Cleanup old rate limit records (runs during maintenance)  
-- DELETE FROM rate_limits WHERE window_start < datetime('now', '-1 hour');