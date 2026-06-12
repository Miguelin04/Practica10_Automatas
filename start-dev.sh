#!/bin/bash

# Script para iniciar ambos servicios en desarrollo

echo "================================================"
echo "CFG Engine - Inicializador de Servicios"
echo "================================================"
echo ""

# Verificar si existen los directorios
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Directorios backend y/o frontend no encontrados"
    exit 1
fi

echo "Iniciando Backend (Spring Boot)..."
echo "📍 http://localhost:8080"
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

sleep 3

echo ""
echo "Iniciando Frontend (React)..."
echo "📍 http://localhost:3000"
cd frontend
npm install --silent > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "================================================"
echo "✅ Servicios iniciados"
echo "================================================"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Para detener: presiona Ctrl+C"
echo ""

# Esperar señal de interrupción
trap "kill $BACKEND_PID $FRONTEND_PID" INT

wait
