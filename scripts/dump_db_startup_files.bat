@echo off
REM Perform dump [backup] operation on Startup designs to create load.sql files.
REM Hard coded for Info@SpringDesignSoftware Okta User '%oktauserid%'  <--- check this

IF "%1"=="" (
  ECHO USAGE:  dump_db_startup_files type 
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
  ECHO.
  ECHO Perform dump [backup] operation on Startup designs to create load.sql files. 
  ECHO Hard coded for Info@SpringDesignSoftware Okta User "oktauserid"  @@@ check this
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

SET oktauserid=00u1g7vr21d7yajY4357
SET oktauserid=00u1itcx44XGp65ln357

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Piston-Cylinder' AND name='Startup') OR (user='%oktauserid%' AND type='Piston-Cylinder' AND name='Startup_Metric')" > designtypes\Piston-Cylinder\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Solid' AND name='70PoundGoldBar') OR (user='%oktauserid%' AND type='Solid' AND name='StandardGoldBar') OR (user='%oktauserid%' AND type='Solid' AND name='Startup') OR (user='%oktauserid%' AND type='Solid' AND name='Startup_Metric') OR (user='%oktauserid%' AND type='Solid' AND name='USPS_MachinableParcels') OR (user='%oktauserid%' AND type='Solid' AND name='USPS_MaxVolume')" > designtypes\Solid\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Compression' AND name='Demo') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='HotWound') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='HotWoundMetric') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Compression' AND name='Startup_Metric')" > designtypes\Spring\Compression\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Extension' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Extension' AND name='Startup_Metric')" > designtypes\Spring\Extension\load.sql

mysqldump --user=%user% --password=%password% --host=%host% %database% design --complete-insert --no-create-info --compact --no-tablespaces --set-gtid-purged=OFF --where="(user='%oktauserid%' AND type='Spring/Torsion' AND name='Startup') OR (user='%oktauserid%' AND type='Spring/Torsion' AND name='Startup_Metric')" > designtypes\Spring\Torsion\load.sql

ENDLOCAL

:BYEBYE
ECHO.
