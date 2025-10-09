@echo off
REM =============================================
REM SISTEMA UNI - DESPLIEGUE LOCAL ULTRA PULIDO
REM =============================================

REM --- Configuración de rutas ---
set BACKEND_DIR=%~dp0\sistema_uni-main
set FRONTEND_DIR=%~dp0\sistema_uni-frontend

echo =============================================
echo SISTEMA UNI - DESPLIEGUE LOCAL
echo =============================================

REM --- Pedir datos de conexión si .env no existe ---
:askDB
if not exist "%BACKEND_DIR%\.env" (
    echo No se encontro .env, ingresa los datos de tu base de datos:

    set /p DB_USER=Usuario: 
    set /p DB_PASS=Contraseña: 
    set /p DB_NAME=Nombre de la base de datos: 

    echo DATABASE_URL="postgresql://%DB_USER%:%DB_PASS%@localhost:5432/%DB_NAME%" > "%BACKEND_DIR%\.env"
)

REM --- Elegir puerto frontend ---
set /p FRONTEND_PORT=Ingresa el puerto para el frontend [8080 por defecto]: 
if "%FRONTEND_PORT%"=="" set FRONTEND_PORT=8080

REM --- Verificar conexión a DB usando Node.js ---
echo Verificando conexión a la base de datos...
cd /d "%BACKEND_DIR%"
node -e "const { Client } = require('pg'); const c = new Client({ connectionString: process.env.DATABASE_URL }); c.connect().then(()=>{console.log('OK')}).catch(e=>{process.exit(1)}).finally(()=>c.end());"
if %errorlevel% neq 0 (
    echo ERROR: No se pudo conectar a la base de datos. Reingresa los datos.
    del "%BACKEND_DIR%\.env"
    goto askDB
)
echo Conexión verificada ✅

REM --- Instalar dependencias backend ---
echo -------------------------------
echo Instalando dependencias del backend...
echo -------------------------------
npm install
npm list -g @nestjs/cli >nul 2>&1 || npm install -g @nestjs/cli
npm list prisma >nul 2>&1 || npm install prisma
npm list @prisma/client >nul 2>&1 || npm install @prisma/client
npm list pg >nul 2>&1 || npm install pg

REM --- Generar Prisma Client ---
echo -------------------------------
echo Generando Prisma Client...
echo -------------------------------
npx prisma generate

REM --- Aplicar migraciones ---
echo -------------------------------
echo Aplicando migraciones...
echo -------------------------------
npx prisma migrate dev --name init --skip-seed

REM --- Ejecutar seed ---
echo -------------------------------
echo Ejecutando seed de la base de datos...
echo -------------------------------
npx prisma db seed

REM --- Iniciar backend en segunda ventana ---
echo -------------------------------
echo Iniciando backend en modo desarrollo...
echo -------------------------------
start "" cmd /c "cd /d %BACKEND_DIR% && npx nest start --watch"

REM --- Preparar frontend ---
echo -------------------------------
echo Instalando dependencias frontend...
echo -------------------------------
cd /d "%FRONTEND_DIR%"
npm list -g http-server >nul 2>&1 || npm install -g http-server

REM --- Iniciar frontend en segunda ventana ---
echo -------------------------------
echo Iniciando frontend en navegador...
echo -------------------------------
start "" cmd /c "cd /d %FRONTEND_DIR% && http-server -p %FRONTEND_PORT%"

REM --- Abrir navegador automáticamente ---
start http://localhost:%FRONTEND_PORT%

echo =============================================
echo SISTEMA UNI desplegado correctamente ✅
echo Backend y Frontend corriendo localmente.
echo =============================================
pause
