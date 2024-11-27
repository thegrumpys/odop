@echo off

REM For selected ODOP database (development, test, staging, production),
REM perform selected operation (backup, sizelist, dump_restore) 

IF "%1"=="" GOTO NOPARM
IF "%1"=="development" GOTO GETOP
IF "%1"=="test" GOTO GETOP
IF "%1"=="staging" GOTO GETOP
IF "%1"=="production" GOTO GETOP
GOTO ERROUT

:GETOP
IF "%2"=="backup" GOTO GETACCESSVAR
IF "%2"=="sizelist" GOTO GETACCESSVAR
IF "%2"=="dump_restore" GOTO GETACCESSVAR
GOTO ERROUT

:GETACCESSVAR
call setDBaccessVar %1

REM echo ODOPtype=%ODOPtype%
REM echo %ODOPuser%
REM echo %ODOPpassword%
REM echo %ODOPhost%
REM echo %ODOPdatabase%
ECHO.

IF "%2"=="backup" GOTO BACKUPER
IF "%2"=="sizelist" GOTO SIZELISTER
IF "%2"=="dump_restore" GOTO DUMP_RESTORER
ECHO Should never get here.
GOTO ERROUT

:BACKUPER
SET ODOPfilename=%ODOPtype%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% %ODOPdatabase% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %ODOPfilename%
GOTO BYEBYE

:SIZELISTER
(
  ECHO use %ODOPdatabase%; 
  ECHO select
  ECHO     NOW^(^),
  ECHO     s.schema_name
  ECHO     ,sp.grantee user
  ECHO     ,cast^(round^(sum^(coalesce^(t.data_length + t.index_length, 0^)^) / 1024 / 1024, 3^) as char^) db_size_mb
  ECHO     ,sp.has_insert
  ECHO from
  ECHO     information_schema.schemata s
  ECHO     inner join
  ECHO     information_schema.tables t on s.schema_name = t.table_schema
  ECHO     inner join ^(
  ECHO         select
  ECHO             spi.grantee
  ECHO             ,spi.table_schema
  ECHO             ,max^(
  ECHO                 case
  ECHO                     when spi.privilege_type = 'INSERT' then 1
  ECHO                     else 0
  ECHO                 end
  ECHO             ^) has_insert
  ECHO         from
  ECHO             information_schema.schema_privileges spi
  ECHO         group by
  ECHO             spi.grantee
  ECHO             ,spi.table_schema
  ECHO     ^) sp on s.schema_name = sp.table_schema
  ECHO group by
  ECHO     s.schema_name
  ECHO     ,sp.grantee
  ECHO     ,sp.has_insert;
) > db_size.txt
mysql --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% < db_size.txt
DEL db_size.txt
GOTO BYEBYE

:DUMP_RESTORER
SET ODOPfilename=%ODOPtype%_%date:~10,4%-%date:~4,2%-%date:~7,2%.sql
mysqldump --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% %ODOPdatabase% --no-tablespaces --set-gtid-purged=OFF --single-transaction > %ODOPfilename%
(
  ECHO use %ODOPdatabase%; 
  ECHO source %ODOPfilename%;
) > dump_restore_db.txt
mysql --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% < dump_restore_db.txt
DEL dump_restore_db.txt
GOTO BYEBYE

:NOPARM
ECHO USAGE:  odopDButil type op
ECHO         where "type" is the system type: "development", "test", "staging" or "production" 
ECHO         and "op" is the operation type: "backup", "sizelist" or "dump_restore"
ECHO.
ECHO "backup" is a simple mysqldump that leaves a .sql file in the current directory. 
ECHO "sizelist" produces a console listing showing the size in MB of the selected database
ECHO "dump_restore" creates a mysqldump backup of the entire database then deletes and recreates the database from that.  The mysqldump file remains in the current directory.   
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to odopDButil: %1 %2
ECHO.

:BYEBYE
SET ODOPtype=
SET ODOPuser=
SET ODOPpassword=
SET ODOPhost=
SET ODOPdatabase=
SET ODOPfilename=
