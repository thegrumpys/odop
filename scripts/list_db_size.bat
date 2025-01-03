@echo off
REM Create size listing of specified ODOP database

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
) > list_db_size.txt
mysql --user=%ODOPuser% --password=%ODOPpassword% --host=%ODOPhost% < list_db_size.txt
IF %ERRORLEVEL% NEQ 0 ECHO list_db_size.txt: mysql returned ERRORLEVEL %ERRORLEVEL%
DEL list_db_size.txt
ENDLOCAL
GOTO BYEBYE

:NOPARM
ECHO USAGE:  list_db_size.txt type 
ECHO         where "type" is the system type: "development", "test", "staging" or "production" 
ECHO.
ECHO Creates a simple console listing providing the size of the selected ODOP database. 
ECHO.
GOTO BYEBYE

:ERROUT
ECHO Bad input to list_db_size.txt: %1 %2
ECHO.

:BYEBYE
