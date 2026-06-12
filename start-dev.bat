@echo off
REM Script para iniciar ambos servicios en desarrollo (Windows)

echo ================================================
echo CFG Engine - Inicializador de Servicios
echo ================================================
echo.

REM Verificar si existen los directorios
if not exist backend (
    echo Error: Directorio backend no encontrado
    exit /b 1
)
if not exist frontend (
    echo Error: Directorio frontend no encontrado
    exit /b 1
)

echo Iniciando Backend (Spring Boot)...
echo URL: http://localhost:8080
start cmd /k "cd backend && mvn spring-boot:run"

timeout /t 3

echo.
echo Iniciando Frontend (React)...
echo URL: http://localhost:3000
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ================================================
echo Servicios iniciados
echo ================================================
echo Para detener: cierra las ventanas de comando
echo.

pause
