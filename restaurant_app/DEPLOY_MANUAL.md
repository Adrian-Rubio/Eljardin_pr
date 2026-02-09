# Guía de Despliegue Manual (Sin Docker)

Esta guía detalla cómo poner en marcha la aplicación "El Jardín" (Gulah) en un entorno local o servidor sin utilizar Docker.

## Requisitos Previos

*   **Python 3.10+**: Para el backend.
*   **Node.js 18+ y npm**: Para el frontend.
*   **Git** (Opcional): Para clonar el repositorio.

## 1. Configuración del Backend (API)

El backend utiliza **FastAPI** y **SQLite** por defecto.

1.  Navega a la carpeta `restaurant_app`.
    ```bash
    cd restaurant_app
    ```

2.  Crea un entorno virtual (recomendado):
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate

    # Linux/Mac
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  Instala las dependencias:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

4.  Inicializa la Base de Datos:
    Regresa a la carpeta `restaurant_app` (donde está el script `seed_eljardin_full.py`) y ejecútalo. Asegúrate de tener el entorno virtual activado.
    ```bash
    cd ..
    python seed_eljardin_full.py
    ```
    *Deberías ver un mensaje indicando que la base de datos se ha reconstruido con éxito.*

5.  Inicia el servidor Backend:
    ```bash
    cd backend
    python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    El backend estará disponible en `http://localhost:8000`. Puedes probarlo yendo a `http://localhost:8000/docs`.

## 2. Configuración del Frontend (Web)

El frontend utiliza **React** y **Vite**.

1.  Abre una nueva terminal.

2.  Navega a la carpeta `frontend`:
    ```bash
    cd restaurant_app/frontend
    ```

3.  Instala las dependencias:
    ```bash
    npm install
    ```

4.  Verifica la configuración:
    Asegúrate de que existe el archivo `.env` en la carpeta `frontend` con el siguiente contenido:
    ```
    VITE_API_URL=http://localhost:8000
    ```

5.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El frontend estará disponible en `http://localhost:5173`.

## 3. Scripts de Inicio Rápido

Para facilitar el arranque en el futuro, puedes usar los scripts incluidos en `restaurant_app`.

*   **Windows**: Doble clic en `start.bat`.
*   **Linux/Mac**: Ejecuta `./start.sh` (asegúrate de darle permisos de ejecución con `chmod +x start.sh`).

**Nota:** Estos scripts asumen que tienes `python` y `npm` en tu PATH global o que el entorno virtual está configurado como se espera (carpeta `backend/venv`).

---

## Solución de Problemas

*   **Error de conexión al Backend**:
    *   Verifica que el backend esté corriendo en el puerto 8000.
    *   Verifica que `VITE_API_URL` en `frontend/.env` sea correcto.
*   **Faltan módulos de Python**:
    *   Asegúrate de haber activado el entorno virtual (`venv`) antes de instalar los requirements y antes de ejecutar el servidor.
