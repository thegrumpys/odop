@echo off
REM Perform database dump then immediate restore.

IF "%1"=="" GOTO NOPARM
IF "%1"=="local" GOTO GETACCESSVAR
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" GOTO GETACCESSVAR
GOTO ERROUT

:GETACCESSVAR
SETLOCAL
call setDBaccessVar %1

REM echo type=%type%
REM echo %user%
REM echo %password%
REM echo %host%
REM echo %database%
ECHO.

SET filename=%type%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%user% --password=%password% --host=%host% %database% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %filename%
IF %ERRORLEVEL% NEQ 0 (
  ECHO dump_restore_db: mysqldump returned ERRORLEVEL %ERRORLEVEL%. Terminating with no attempt to restore.
  GOTO BYEBYE
)
(
  ECHO use %database%; 
  ECHO source %filename%;
) > dump_restore_db.txt
mysql --user=%user% --password=%password% --host=%host% < dump_restore_db.txt
IF %ERRORLEVEL% NEQ 0 ECHO dump_restore_db: mysql returned ERRORLEVEL %ERRORLEVEL%
DEL dump_restore_db.txt
ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  dump_restore_db type 
ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
ECHO.
ECHO The operation is a mysqldump combined with an immediate restore of that dump file. 
ECHO A .sql file is left in the current directory. 
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to dump_restore_db: %1 %2
ECHO.

:BYEBYE
