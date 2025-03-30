#!/bin/bash
# Perform database dump then immediately load [restore] it.

if [ -z "$1" ]; then
  echo "USAGE:  dump_load_db type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "The operation is a mysqldump combined with an immediate load [restore] of that dump file."
  echo "A .sql file is left in the current directory."
  exit 1
fi

if [ ! -f "./scripts/set_db_access_var.sh" ]; then
  echo "This batch file must be run from the ~ git\odop directory ... a.k.a. \"server level\"."
  exit 1
fi

case "$1" in
    "local"|"development"|"test"|"staging"|"production")
        source ./scripts/set_db_access_var.sh $1
        ;;
    *)
        echo "Bad target system type parameter: \"$1\""
        exit 1
        ;;
esac

filename="${type}_$(date +%F).sql"

mysqldump --user=$user --password=$password --host=$host --no-tablespaces --single-transaction $database > $filename
if [ $? -ne 0 ]; then
  echo "dump_load_db: mysqldump returned $?. Terminating with no attempt to load [restore]."
else
  echo "mysqldump returned SUCCESS"
fi

mysql --user=$user --password=$password --host=$host --skip-ssl << EOF
  USE $database;
  SOURCE $filename;
EOF
if [ $? -ne 0 ]; then echo "dump_load_db: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
