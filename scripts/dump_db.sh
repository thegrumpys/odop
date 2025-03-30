#!/bin/bash
# perform dump (backup) operation on database

if [ -z "$1" ]; then
  echo "USAGE:  dump_db type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "The operation is a simple mysqldump that leaves a .sql file in the current directory."
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

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database --no-tablespaces --single-transaction > $filename
if [ $? -ne 0 ]; then echo "dump_db: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi
