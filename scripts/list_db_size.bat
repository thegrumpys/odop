@ECHO off
REM Create size listing of specified database

IF "%1"=="" (
  ECHO USAGE:  list_db_size type 
  ECHO         where "type" is the system type: "local", "development", "test", "staging" or "production" 
  ECHO.
  ECHO Creates a simple console listing providing the size of the selected database. 
  GOTO BYEBYE
  )

IF not exist ".\scripts\set_db_access_var.bat" ( 
  ECHO This batch file must be run from the ~ git\odop directory ... a.k.a. "server level". 
  GOTO BYEBYE
  ) 


IF "%1"=="local" (
  ECHO WARNING:  Results for the local database are known to be incorrect.
  GOTO GETACCESSVAR
  )
IF "%1"=="development" GOTO GETACCESSVAR
IF "%1"=="test" GOTO GETACCESSVAR
IF "%1"=="staging" GOTO GETACCESSVAR
IF "%1"=="production" GOTO GETACCESSVAR
ECHO Bad target system type parameter: "%1"
GOTO BYEBYE

:GETACCESSVAR
SETLOCAL
CALL .\scripts\set_db_access_var %1

(
  ECHO USE %database%; 
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
mysql --user=%user% --password=%password% --host=%host% < list_db_size.txt
IF %ERRORLEVEL% NEQ 0 (ECHO list_db_size: mysql returned ERRORLEVEL %ERRORLEVEL%) ELSE (ECHO mysql returned SUCCESS)
DEL list_db_size.txt
ENDLOCAL

:BYEBYE
ECHO.
