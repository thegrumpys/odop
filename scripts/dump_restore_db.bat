@echo off
REM Perform ODOP database dump then immediate restore.

IF "%1"=="" GOTO NOPARM
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" GOTO GETACCESSVAR
GOTO ERROUT

:GETACCESSVAR
SETLOCAL
call setDBaccessVar %1

REM echo ODOPtype=%ODOPtype%
REM echo %ODOPuser%
REM echo %ODOPpassword%
REM echo %ODOPhost%
REM echo %ODOPdatabase%
ECHO.

SET ODOPfilename=%ODOPtype%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% %ODOPdatabase% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %ODOPfilename%
IF %ERRORLEVEL% NEQ 0 (
  ECHO dump_restore_db: mysqldump returned ERRORLEVEL %ERRORLEVEL%. Terminating with no attempt to restore.
  GOTO BYEBYE
)
(
  ECHO use %ODOPdatabase%; 
  ECHO source %ODOPfilename%;
) > dump_restore_db.txt
mysql --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% < dump_restore_db.txt
IF %ERRORLEVEL% NEQ 0 ECHO dump_restore_db: mysql returned ERRORLEVEL %ERRORLEVEL%
DEL dump_restore_db.txt
ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  dump_restore_db type 
ECHO         where "type" is the system type: "development", "test", "staging" or "production" 
ECHO.
ECHO The operation is a mysqldump combined with an immediate restore of that dump file. 
ECHO A .sql file is left in the current directory. 
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to dump_restore_db: %1 %2
ECHO.

:BYEBYE
