# Setup Script for El Jardin on Ubuntu 22.04

# 1. Update System
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# 2. Install Dependencies
echo "Installing dependencies..."
# Added build-essential and libpq-dev for psycopg2 compilation
sudo apt install -y python3-pip python3-venv nodejs npm postgresql postgresql-contrib nginx git certbot python3-certbot-nginx build-essential libpq-dev

# 3. Setup Database (Interactive)
echo "Setting up PostgreSQL..."
sudo -u postgres psql -c "CREATE DATABASE restaurant_db;" || echo "Database might already exist"
sudo -u postgres psql -c "CREATE USER restaurant_user WITH PASSWORD 'restaurant_password';" || echo "User might already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE restaurant_db TO restaurant_user;"

# 4. Setup Backend
echo "Setting up Backend..."
cd /var/www/eljardin/restaurant_app/backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
# cp .env.example .env

# 5. Seed Database
echo "Seeding database..."
# Run seeding from the backend directory to ensure relative paths work or project context is right
cd ..
source backend/venv/bin/activate
export DATABASE_URL=postgresql://restaurant_user:restaurant_password@localhost/restaurant_db
python3 seed_eljardin_full.py

# 6. Setup Frontend
echo "Setting up Frontend..."
cd /var/www/eljardin/restaurant_app/frontend
npm install
npm run build

# 7. Configure System Services
echo "Configuring Services..."
sudo cp /var/www/eljardin/deploy/nginx.conf /etc/nginx/sites-available/eljardin.conf
sudo ln -sf /etc/nginx/sites-available/eljardin.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

sudo cp /var/www/eljardin/deploy/backend.service /etc/systemd/system/backend.service
sudo systemctl daemon-reload
sudo systemctl enable backend
sudo systemctl restart backend
sudo systemctl restart nginx

echo "Setup complete! The app should be running."
echo "URL Backend: http://localhost:8000"
echo "URL Frontend: http://localhost (via Nginx)"
