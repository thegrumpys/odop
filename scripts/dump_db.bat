@echo off
REM perform dump (backup) operation on database 

IF "%1"=="" GOTO NOPARM
IF "%1"=="local" GOTO GETACCESSVAR
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" GOTO GETACCESSVAR
GOTO ERROUT

:GETACCESSVAR
SETLOCAL
call set_db_access_var %1

REM echo type=%type%
REM echo %user%
REM echo %password%
REM echo %host%
REM echo %database%
ECHO.

SET filename=%type%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%user% --password=%password% --host=%host% %database% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %filename%
IF %ERRORLEVEL% NEQ 0 ECHO dump_db: mysqldump returned ERRORLEVEL %ERRORLEVEL%
ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  dump_db type 
ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
ECHO.
ECHO The operation is a simple mysqldump that leaves a .sql file in the current directory. 
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to dump_db: %1 %2
ECHO.

:BYEBYE
