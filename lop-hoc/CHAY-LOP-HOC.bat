@echo off
chcp 65001 >nul
title May chu Lop hoc tuong tac
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [!] May nay chua cai Node.js.
  echo      Tai ban LTS tai https://nodejs.org roi cai dat ^(chi can lam 1 lan^).
  echo.
  pause
  exit /b 1
)
node server.js --open %*
echo.
pause
