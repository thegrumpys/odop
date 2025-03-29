#!/bin/bash
# Delete entire database and tables
# BEWARE! This destroys any existing odop database and all its tables

if [ -z "$1" ]; then
  echo "USAGE:  delete_db type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "Delete entire database and tables"
  echo "BEWARE! This destroys any existing odop database and all its tables"
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

mysql --user=$user --password=$password --host=$host --skip-ssl << EOF
  DROP DATABASE IF EXISTS $database;
EOF
if [ $? -ne 0 ]; then echo "delete_db: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
