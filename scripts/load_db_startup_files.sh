#!/bin/bash
# Load default Startup designs for all design types.
# BEWARE! This empties the design table of all designs with a NULL user.

if [ -z "$1" ]; then
  echo "USAGE:  load_db_startup_files type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "This script loads default Startup designs for all design types."
  echo "BEWARE! It empties the design table of all designs with a NULL user."
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
  USE $database;
  DELETE FROM design WHERE user IS NULL;
  SOURCE ./designtypes/Piston-Cylinder/load.sql;
  SOURCE ./designtypes/Solid/load.sql;
  SOURCE ./designtypes/Spring/Compression/load.sql;
  SOURCE ./designtypes/Spring/Extension/load.sql;
  SOURCE ./designtypes/Spring/Torsion/load.sql;
EOF
if [ $? -ne 0 ]; then echo "load_db_startup_files: mysql returned $?"; else echo "mysql returned SUCCESS"; fi
