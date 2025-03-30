@echo off
REM perform dump (backup) operation on database

IF "%1"=="" (
  ECHO USAGE:  dump_db type
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production"
  ECHO.
  ECHO The operation is a simple mysqldump that leaves a .sql file in the current directory.
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

SET filename=%type%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%user% --password=%password% --host=%host% --no-tablespaces --set-gtid-purged=OFF --single-transaction %database% > %filename%
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqldump returned SUCCESS)
ENDLOCAL

:BYEBYE
ECHO.
