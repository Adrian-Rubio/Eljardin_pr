#!/bin/bash

# Setup Script for El Jardin on Ubuntu 22.04

# 1. Update System
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# 2. Install Dependencies
echo "Installing dependencies..."
sudo apt install -y python3-pip python3-venv nodejs npm postgresql postgresql-contrib nginx git certbot python3-certbot-nginx

# 3. Setup Database (Interactive)
echo "Setting up PostgreSQL..."
echo "Please enter a password for the 'restaurant_user' when prompted."
sudo -u postgres psql -c "CREATE DATABASE restaurant_db;" || echo "Database might already exist"
sudo -u postgres psql -c "CREATE USER restaurant_user WITH PASSWORD 'placeholder';" || echo "User might already exist"
# Note: Ideally you should change the password manually safely, but this script is a helper.
echo "NOTE: Remember to set the correct password in the .env file later!"

# 4. Setup Backend
echo "Setting up Backend..."
cd /var/www/eljardin/restaurant_app/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
# Copy env example if exists
# cp .env.example .env

# 5. Setup Frontend
echo "Setting up Frontend..."
cd ../frontend
npm install
npm run build

echo "Setup complete! Don't forget to:"
echo "1. Configure .env in backend/"
echo "2. Run 'alembic upgrade head' in backend/"
echo "3. Copy deploy/nginx.conf to /etc/nginx/sites-available/"
echo "4. Copy deploy/backend.service to /etc/systemd/system/"
