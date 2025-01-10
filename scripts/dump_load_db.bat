@echo off
REM Perform database dump then immediatly load [restore] it.

IF "%1"=="" (
  ECHO USAGE:  dump_load_db type 
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
  ECHO.
  ECHO The operation is a mysqldump combined with an immediate load [restore] of that dump file. 
  ECHO A .sql file is left in the current directory. 
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

REM Remove this comment and the following four lines
echo type=%type%, user=%user%, password=%password%, 
echo host=%host%, database=%database%
echo filename=%filename%
GOTO BYEBYE

SET filename=%type%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%user% --password=%password% --host=%host% %database% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %filename%
IF %ERRORLEVEL% NEQ 0 (
  ECHO dump_load_db: mysqldump returned ERRORLEVEL %ERRORLEVEL%. Terminating with no attempt to load [restore].
  GOTO BYEBYE
)
(
  ECHO use %database%; 
  ECHO source %filename%;
) > dump_load_db.txt
mysql --user=%user% --password=%password% --host=%host% < dump_load_db.txt
IF %ERRORLEVEL% NEQ 0 ECHO dump_load_db: mysql returned ERRORLEVEL %ERRORLEVEL%
DEL dump_load_db.txt
ENDLOCAL

:BYEBYE
ECHO.
