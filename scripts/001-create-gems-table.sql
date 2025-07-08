-- Create the gems table
CREATE TABLE IF NOT EXISTS gems (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  rarity VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on name for faster searches
CREATE INDEX IF NOT EXISTS idx_gems_name ON gems(name);
CREATE INDEX IF NOT EXISTS idx_gems_category ON gems(category);
CREATE INDEX IF NOT EXISTS idx_gems_rarity ON gems(rarity);
