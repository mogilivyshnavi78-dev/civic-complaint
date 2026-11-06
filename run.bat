@echo off
setlocal enabledelayedexpansion
echo ===================================================================
echo     INTELLIGENT CIVIC COMPLAINT PRIORITIZATION SYSTEM
echo ===================================================================
echo.

set "PY_CMD=python"
if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    set "PY_CMD=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
)

echo [Info] Using Python interpreter: !PY_CMD!
echo [Info] Initializing database, training NLP model, and seeding records...
"!PY_CMD!" backend\seed_data.py
if errorlevel 1 (
    echo [ERROR] Failed to initialize database or models.
    pause
    exit /b !errorlevel!
)

echo.
echo ===================================================================
echo  Starting Flask Server: http://127.0.0.1:5000
echo  Press Ctrl+C to stop the server
echo ===================================================================
echo.
"!PY_CMD!" backend\app.py
pause
