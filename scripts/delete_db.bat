@ECHO off
REM Delete entire database and tables
REM BEWARE! This destroys any existing odop database and all its tables

IF "%1"=="" (
  ECHO USAGE:  delete_db type
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production"
  ECHO.
  ECHO Delete entire database and tables
  ECHO BEWARE! This destroys any existing odop database and all its tables
  GOTO BYEBYE
  )

IF not exist ".\scripts\set_db_access_var.bat" (
  ECHO This batch file must be run from the ~ git\odop directory ... a.k.a. "server level".
  GOTO BYEBYE
  )

IF "%1"=="local" GOTO GETACCESSVAR
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" (
  ECHO You are about to delete the ODOP production database. Use Control-C to abort.  Otherwise ...
  PAUSE
  GOTO GETACCESSVAR
  )
ECHO Bad target system type parameter: "%1"
GOTO BYEBYE

:GETACCESSVAR
SETLOCAL
call .\scripts\set_db_access_var %1

(
  ECHO DROP DATABASE IF EXISTS %database%;
) > delete_db.txt
mysql --user=%user% --password=%password% --host=%host% < delete_db.txt
IF %ERRORLEVEL% NEQ 0 (ECHO delete_db: mysql returned %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL delete_db.txt
ENDLOCAL

:BYEBYE
ECHO.
