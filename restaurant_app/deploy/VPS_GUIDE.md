
# ------------------------------------------------------------------------------
# GUÍA DE DESPLIEGUE EN VPS (Ubuntu 20.04/22.04)
# ------------------------------------------------------------------------------

Esta guía describe paso a paso cómo desplegar la aplicación `restaurant_app` en un servidor VPS desde cero.

## 1. Prerrequisitos

- Un servidor VPS con Ubuntu 20.04 o superior.
- Acceso SSH al servidor.
- Un dominio apuntando a la IP de tu VPS (ej: `mijardin.com`).

## 2. Preparación del Servidor

Conéctate a tu VPS:
```bash
ssh root@tu-ip-vps
```

### 2.1 Actualizar el Sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Instalar Docker y Docker Compose
```bash
# Instalar dependencias
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Añadir clave GPG de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Añadir repositorio de Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Instalar Docker Compose (versión plugin)
sudo apt install -y docker-compose-plugin

# Verificar instalación
docker --version
docker compose version
```

## 3. Despliegue de la Aplicación

### 3.1 Clonar el Repositorio
```bash
mkdir -p /var/www/restaurant_app
cd /var/www/restaurant_app
git clone https://github.com/Adrian-Rubio/Eljardin_pr.git .
cd restaurant_app
```

### 3.2 Configuración de Entorno
Crea el archivo `.env` para producción:
```bash
cp .env.example .env
nano .env
```
Asegúrate de configurar:
- `DATABASE_URL`: `postgresql://user:password@db:5432/restaurant_db`
- `VITE_API_URL`: `https://tu-dominio.com/api` (IMPORTANTE: HTTPS)

### 3.3 Configuración de Docker Compose para Producción
Crea un archivo `docker-compose.prod.yml`:

```yaml
services:
  db:
    image: postgres:15
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}

  backend:
    build: ./backend
    restart: always
    command: uvicorn main:app --host 0.0.0.0 --port 8000
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
    depends_on:
      - db

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 3.4 Lanzar la Aplicación
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Esto iniciará:
- Base de datos PostgreSQL.
- Backend (FastAPI).
- Frontend (Vite/Nginx sirviendo estáticos).

## 4. Configuración de Dominio y SSL (Nginx Proxy Manager o Certbot)
Para producción real, se recomienda usar un proxy inverso como Nginx en el host o `Nginx Proxy Manager` para manejar SSL automáticamente.

### Opción Rápida: Nginx en el Host con Certbot

1. Instalar Nginx:
   ```bash
   sudo apt install -y nginx
   ```

2. Configurar Nginx (`/etc/nginx/sites-available/restaurant`):
   ```nginx
   server {
       server_name tu-dominio.com;

       location / {
           proxy_pass http://localhost:5173; # Puerto del frontend dockerizado
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /api/ {
           proxy_pass http://localhost:8000; # Puerto del backend
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
3. Activar sitio y recargar:
   ```bash
   sudo ln -s /etc/nginx/sites-available/restaurant /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

4. Obtener SSL con Certbot:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d tu-dominio.com
   ```

¡Listo! Tu web debería estar accesible en `https://tu-dominio.com`.
