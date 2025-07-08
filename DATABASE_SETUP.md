# Database Setup Instructions

## Setting up Neon PostgreSQL Database

### 1. Create a Neon Account

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up for a free account
3. Create a new project

### 2. Get Your Database Connection String

1. In your Neon project dashboard, go to the "Connection Details" section
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder with your actual Neon connection string:
   ```
   DATABASE_URL="postgresql://your-username:your-password@ep-xxx-xxx.us-east-1.aws.neon.tech/your-dbname?sslmode=require"
   ```

### 4. Install PostgreSQL Client (Optional)

If you want to use the setup script, install the PostgreSQL client:

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql-client
```

**macOS:**
```bash
brew install postgresql
```

**Windows:**
Download from [PostgreSQL website](https://www.postgresql.org/download/windows/)

### 5. Run Database Setup

Option 1: Using the setup script (requires psql):
```bash
./scripts/setup-database.sh
```

Option 2: Using the Neon SQL Editor:
1. Go to your Neon console
2. Open the SQL Editor
3. Copy and paste the contents of `scripts/001-create-gems-table.sql`
4. Run the query
5. Copy and paste the contents of `scripts/002-seed-gems-data.sql`
6. Run the query

### 6. Start the Development Server

```bash
pnpm dev
```

Your GemVault application should now be connected to your Neon database!

## Troubleshooting

### Connection Issues

1. **SSL Error**: Make sure your connection string includes `?sslmode=require`
2. **Network Error**: Check that your Neon project is active and not suspended
3. **Authentication Error**: Verify your username and password in the connection string

### Environment Variable Issues

1. Make sure `.env.local` is in your project root
2. Restart your development server after changing environment variables
3. Check that the file is not committed to git (should be in `.gitignore`)

### For GitHub Pages Deployment

Add your `DATABASE_URL` as a repository secret:
1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `DATABASE_URL`
5. Value: Your Neon connection string

## Database Schema

The application uses a single `gems` table with the following structure:

```sql
CREATE TABLE gems (
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
```
