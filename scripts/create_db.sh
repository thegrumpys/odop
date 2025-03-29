#!/bin/bash
# Create empty default database and tables

if [ -z "$1" ]; then
  echo "USAGE:  create_db type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "Create empty default database and tables"
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

filename="./data/create.sql"

mysql --user=$user --password=$password --host=$host --skip-ssl << EOF
  CREATE DATABASE $database CHARACTER SET utf8;
  USE $database;
  SOURCE $filename;
EOF
if [ $? -ne 0 ]; then echo "create_db: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
