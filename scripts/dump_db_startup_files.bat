@echo off
REM Perform dump (backup) operation on Startup designs to create load.sql files.
REM Hard coded for Info@SpringDesignSoftware Okta User '%oktauserid%'  <--- check this

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

SET oktauserid=00u1g7vr21d7yajY4357
SET oktauserid=00u1itcx44XGp65ln357

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Piston-Cylinder' AND name='Startup') OR (user='%oktauserid%' AND type='Piston-Cylinder' AND name='Startup_Metric')" > designtypes\Piston-Cylinder\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Solid' AND name='70PoundGoldBar') OR (user='%oktauserid%' AND type='Solid' AND name='StandardGoldBar') OR (user='%oktauserid%' AND type='Solid' AND name='Startup') OR (user='%oktauserid%' AND type='Solid' AND name='Startup_Metric') OR (user='%oktauserid%' AND type='Solid' AND name='USPS_MachinableParcels') OR (user='%oktauserid%' AND type='Solid' AND name='USPS_MaxVolume')" > designtypes\Solid\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Compression' AND name='Demo') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='HotWound') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='HotWoundMetric') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='Startup_Metric')" > designtypes\Spring\Compression\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Extension' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Extension' AND name='Startup_Metric')" > designtypes\Spring\Extension\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Torsion' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Torsion' AND name='Startup_Metric')" > designtypes\Spring\Torsion\load.sql

ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  dump_db_startup_files type 
ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
ECHO.
ECHO Perform dump (backup) operation on Startup designs to create load.sql files. 
ECHO Hard coded for Info@SpringDesignSoftware Okta User '%oktauserid%'  <--- check this
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to dump_db_startup_files: %1 %2
ECHO.

:BYEBYE
