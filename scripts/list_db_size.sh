#!/bin/bash
# Create size listing of specified database

if [ -z "$1" ]; then
  echo "USAGE:  list_db_size type"
  echo "        where "type" is the system type: "local", "development", "test", "staging" or "production""
  echo ""
  echo "Creates a simple console listing providing the size of the selected database."
  exit 1
fi

if [ ! -f "./scripts/set_db_access_var.sh" ]; then
  echo "This batch file must be run from the ~ git\odop directory ... a.k.a. \"server level\"."
  exit 1
fi

case "$1" in
    "local")
        echo "WARNING:  Results for the local database are known to be incorrect."
        ;;
    "development"|"test"|"staging"|"production")
        source ./scripts/set_db_access_var.sh $1
        ;;
    *)
        echo "Bad target system type parameter: \"$1\""
        exit 1
        ;;
esac

mysql --user=$user --password=$password --host=$host --skip-ssl << EOF
USE $database;
select
    NOW(),
    s.schema_name
    ,sp.grantee user
    ,cast(round(sum(coalesce(t.data_length + t.index_length, 0)) / 1024 / 1024, 3) as char) db_size_mb
    ,sp.has_insert
from
    information_schema.schemata s
    inner join
    information_schema.tables t on s.schema_name = t.table_schema
    inner join (
        select
            spi.grantee
            ,spi.table_schema
            ,max(
                case
                    when spi.privilege_type = 'INSERT' then 1
                    else 0
                end
            ) has_insert
        from
            information_schema.schema_privileges spi
        group by
            spi.grantee
            ,spi.table_schema
    ) sp on s.schema_name = sp.table_schema
group by
    s.schema_name
    ,sp.grantee
    ,sp.has_insert;
EOF
if [ $? -ne 0 ]; then echo "list_db_size: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
