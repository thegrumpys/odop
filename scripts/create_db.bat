@echo off
REM Create empty default database and tables

IF "%1"=="" (
  ECHO USAGE:  create_db type 
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
  ECHO.
  ECHO Create empty default database and tables 
  GOTO BYEBYE
  )

if not exist ".\scripts\set_db_access_var.bat" ( 
  echo This batch file must be run from the ~ git\odop directory ... a.k.a. "server level". 
  GOTO BYEBYE
  ) 

IF "%1"=="local" GOTO GETACCESSVAR
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" GOTO GETACCESSVAR
ECHO Bad target system type parameter: "%1"
GOTO BYEBYE

:GETACCESSVAR
SETLOCAL
call .\scripts\set_db_access_var %1
set filename=./data/create.sql

(
  ECHO CREATE DATABASE %database% CHARACTER SET utf8;
  ECHO USE %database%;
  ECHO SOURCE %filename%;
) > create_db.txt
mysql --user=%user% --password=%password% --host=%host% < create_db.txt
IF %ERRORLEVEL% NEQ 0 (ECHO create_db: mysql returned ERRORLEVEL %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL create_db.txt
ENDLOCAL

:BYEBYE
ECHO.
