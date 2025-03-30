#!/bin/bash
# Perform database load [restore]

if [ -z "$1" ]; then
  echo "USAGE:  load_db filename type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "The operation is a MySQL load [restore] of the dump file given by the first parameter."
  exit 1
fi

if [ ! -f "$1" ]; then
  echo "Source file \"$1\" does not exist."
  exit 1
fi

if [ -z "$2" ]; then
  echo "Target system type [sink] parameter is missing."
  exit 1
fi

if [ ! -f "./scripts/set_db_access_var.sh" ]; then
  echo "This batch file must be run from the ~ git\odop directory ... a.k.a. \"server level\"."
  exit 1
fi

case "$1" in
    "local"|"development"|"test"|"staging"|"production")
        source ./scripts/set_db_access_var.sh $2
        ;;
    *)
        echo "Bad target system type parameter: \"$2\""
        exit 1
        ;;
esac

filename="$1"

mysql --user=$user --password=$password --host=$host --skip-ssl << EOF
  USE $database;
  SOURCE $filename;
EOF
if [ $? -ne 0 ]; then echo "load_db: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
