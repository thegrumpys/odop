@ECHO off
REM Perform database dump then immediately load [restore] it.

IF "%1"=="" (
  ECHO USAGE:  dump_load_db type
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production"
  ECHO.
  ECHO The operation is a mysqldump combined with an immediate load [restore] of that dump file.
  ECHO A .sql file is left in the current directory.
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
IF "%1"=="production" GOTO GETACCESSVAR
ECHO Bad target system type parameter: "%1"
GOTO BYEBYE

:GETACCESSVAR
SETLOCAL
CALL .\scripts\set_db_access_var %1

SET filename=%type%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%user% --password=%password% --host=%host% --skip-ssl %database% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %filename%
IF %ERRORLEVEL% NEQ 0 (
  ECHO dump_load_db: mysqldump returned %ERRORLEVEL%. Terminating with no attempt to load [restore].
  GOTO BYEBYE
) ELSE (ECHO mysqldump returned SUCCESS)
(
  ECHO USE %database%;
  ECHO SOURCE %filename%;
) > dump_load_db.txt
mysql --user=%user% --password=%password% --host=%host% --skip-ssl < dump_load_db.txt
IF %ERRORLEVEL% NEQ 0 (ECHO dump_load_db: mysql returned %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL dump_load_db.txt
ENDLOCAL

:BYEBYE
ECHO.
