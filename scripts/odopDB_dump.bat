@echo off
REM perform ODOP database dump (backup) operation

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
IF %ERRORLEVEL% NEQ 0 ECHO odopDB_dump: mysqldump returned ERRORLEVEL %ERRORLEVEL%
ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  odopDB_dump type 
ECHO         where "type" is the system type: "development", "test", "staging" or "production" 
ECHO.
ECHO The operation is a simple mysqldump that leaves a .sql file in the current directory. 
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to odopDB_dump: %1 %2
ECHO.

:BYEBYE
