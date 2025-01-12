@echo off
REM Load default Startup designs for all design types.
REM BEWARE! This empties the design table of all designs with a NULL user.

IF "%1"=="" (
  ECHO USAGE:  load_db_startup_files type 
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
  ECHO.
  ECHO This script loads default Startup designs for all design types. 
  ECHO BEWARE! It empties the design table of all designs with a NULL user.
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

(
  ECHO use %database%; 
  ECHO DELETE FROM design WHERE user IS NULL;
  ECHO source ./designtypes/Piston-Cylinder/load.sql;
  ECHO source ./designtypes/Solid/load.sql;
  ECHO source ./designtypes/Spring/Compression/load.sql;
  ECHO source ./designtypes/Spring/Extension/load.sql;
  ECHO source ./designtypes/Spring/Torsion/load.sql;
) > load_db_startup_files.txt
mysql --user=%user% --password=%password% --host=%host% < load_db_startup_files.txt
IF %ERRORLEVEL% NEQ 0 (ECHO load_db_startup_files: mysql returned ERRORLEVEL %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL load_db_startup_files.txt
ENDLOCAL

:BYEBYE
ECHO.
