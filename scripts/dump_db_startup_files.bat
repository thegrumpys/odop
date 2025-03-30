@echo off
REM Perform dump [backup] operation on Startup designs to create load.sql files.
REM Hard coded for B. Watt oktauserid '00u1itcx44XGp65ln357'

IF "%1"=="" (
  ECHO USAGE:  dump_db_startup_files type
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production"
  ECHO.
  ECHO Perform dump [backup] operation on Startup designs to create load.sql files.
  ECHO Hard coded for B. Watt oktauserid '00u1itcx44XGp65ln357'
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

REM Info@SpringDesignSoftware.org oktauserid=00u1g7vr21d7yajY4357
REM bwatt@1fifoto.com oktauserid=00u1itcx44XGp65ln357

mysqldump --user=%user% --password=%password% --host=%host% --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='00u1itcx44XGp65ln357' AND type='Piston-Cylinder' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Piston-Cylinder' AND name='Startup_Metric')" %database% design > designtypes\Piston-Cylinder\load.sql
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db_startup_files: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqlsump returned SUCCESS)

mysqldump --user=%user% --password=%password% --host=%host% --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='00u1itcx44XGp65ln357' AND type='Solid' AND name='70PoundGoldBar') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='StandardGoldBar') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='Startup_Metric') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='USPS_MachinableParcels') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='USPS_MaxVolume')" %database% design > designtypes\Solid\load.sql
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db_startup_files: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqlsump returned SUCCESS)

mysqldump --user=%user% --password=%password% --host=%host% --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Demo') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='HotWound') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='HotWoundMetric') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Startup_Metric')" %database% design > designtypes\Spring\Compression\load.sql
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db_startup_files: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqlsump returned SUCCESS)

mysqldump --user=%user% --password=%password% --host=%host% --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Extension' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Extension' AND name='Startup_Metric')" %database% design > designtypes\Spring\Extension\load.sql
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db_startup_files: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqlsump returned SUCCESS)

mysqldump --user=%user% --password=%password% --host=%host% --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Torsion' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Torsion' AND name='Startup_Metric')" %database% design > designtypes\Spring\Torsion\load.sql
IF %ERRORLEVEL% NEQ 0 (ECHO dump_db_startup_files: mysqldump returned %ERRORLEVEL%) ELSE (ECHO mysqlsump returned SUCCESS)

ENDLOCAL

:BYEBYE
ECHO.
