@echo off
REM Perform database load [restore]

IF "%1"=="" (
  ECHO USAGE:  load_db filename type
  ECHO         Where "filename" is the name of the MySQL dump file to be loaded [source]
  ECHO         and "type" is the system type: "local", "development", "test", "staging" or "production" [sink].  
  ECHO.
  ECHO The operation is a MySQL load [restore] of the dump file given by the first parameter. 
  GOTO BYEBYE
  )

if not exist "%1" ( 
  echo Source file "%1" does not exist.
  GOTO BYEBYE
  ) 

IF "%2"=="" (
  echo Target system type [sink] parameter is missing.
  GOTO BYEBYE
  )

if not exist ".\scripts\set_db_access_var.bat" ( 
  echo This batch file must be run from the ~ git\odop directory ... a.k.a. "server level". 
  GOTO BYEBYE
  ) 

IF "%2"=="local" GOTO GETACCESSVAR
IF "%2"=="development" GOTO GETACCESSVAR
IF "%2"=="test" GOTO GETACCESSVAR
IF "%2"=="staging" GOTO GETACCESSVAR
IF "%2"=="production" GOTO GETACCESSVAR
ECHO Bad target system type [sink] parameter: "%2"
GOTO BYEBYE

:GETACCESSVAR
SETLOCAL
SET filename=%1
call .\scripts\set_db_access_var %2

(
  ECHO USE %database%; 
  ECHO SOURCE %filename%;
) > load_db.txt
mysql --user=%user% --password=%password% --host=%host% < load_db.txt
IF %ERRORLEVEL% NEQ 0 (ECHO load_db: mysql returned ERRORLEVEL %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL load_db.txt
ENDLOCAL

:BYEBYE
ECHO.
