#!/bin/bash

# Start backend
echo "🚀 Starting FastAPI backend..."
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start frontend
echo "🎨 Starting React frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Show where to go
echo "=============================="
echo "✅ App is running!"
echo "➡ Frontend: http://localhost:5173"
echo "➡ Backend Docs: http://localhost:8000/docs"
echo "=============================="

# Stop both on Ctrl+C
trap "echo '🛑 Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit" SIGINT

# Wait for backend
wait $BACKEND_PID
