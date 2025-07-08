#!/bin/bash

# Database setup script for Neon PostgreSQL
# This script will create tables and seed data in your Neon database

echo "Setting up Neon database..."

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    echo "Loading environment variables from .env.local..."
    export $(grep -v '^#' .env.local | xargs)
else
    echo "Warning: .env.local file not found"
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set."
    echo "Please add your Neon database URL to .env.local"
    exit 1
fi

echo "Using database: ${DATABASE_URL%?*}***" # Show partial URL for security

echo "Creating tables..."
# Create tables
psql "$DATABASE_URL" -f scripts/001-create-gems-table.sql

echo "Seeding data..."
# Seed data
psql "$DATABASE_URL" -f scripts/002-seed-gems-data.sql

echo "Database setup complete!"
echo "Your Neon database is ready to use."
