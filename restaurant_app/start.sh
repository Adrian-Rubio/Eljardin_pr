#!/bin/bash

# Script to start El Jardín Backend and Frontend simultaneously

echo "Starting El Jardín de Arturo Soria..."

# 1. Start Backend
echo "Launching Backend API..."
cd backend
source venv/bin/activate
# Run in background
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# 2. Start Frontend
echo "Launching Frontend Web..."
cd frontend
npm run dev -- --host &
FRONTEND_PID=$!
cd ..

echo "------------------------------------------------"
echo "Services are running!"
echo "Backend PID: $BACKEND_PID (Port 8000)"
echo "Frontend PID: $FRONTEND_PID (Port 5173)"
echo "------------------------------------------------"
echo "Press Ctrl+C to stop both services."

# Trap to kill both processes on exit
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

# Wait for background processes
wait
