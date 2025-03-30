#!/bin/bash
# Perform dump [backup] operation on Startup designs to create load.sql files.
# Hard coded for B. Watt oktauserid 'oktauserid'

if [ -z "$1" ]; then
  ECHO "USAGE:  dump_db_startup_files type"
  ECHO "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  ECHO ""
  ECHO "Perform dump [backup] operation on Startup designs to create load.sql files."
  ECHO "Hard coded for B. Watt oktauserid 'oktauserid'
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

# Info@SpringDesignSoftware.org
oktauserid=00u1g7vr21d7yajY4357
# bwatt@1fifoto.com
oktauserid=oktauserid

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database design --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='$oktauserid' AND type='Piston-Cylinder' AND name='Startup') OR (user='$oktauserid' AND type='Piston-Cylinder' AND name='Startup_Metric')" > ./designtypes/Piston-Cylinder/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database design --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='$oktauserid' AND type='Solid' AND name='70PoundGoldBar') OR (user='$oktauserid' AND type='Solid' AND name='StandardGoldBar') OR (user='$oktauserid' AND type='Solid' AND name='Startup') OR (user='$oktauserid' AND type='Solid' AND name='Startup_Metric') OR (user='$oktauserid' AND type='Solid' AND name='USPS_MachinableParcels') OR (user='$oktauserid' AND type='Solid' AND name='USPS_MaxVolume')" > ./designtypes/Solid/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database design --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='$oktauserid' AND type='Spring/Compression' AND name='Demo') OR (user='$oktauserid' AND type='Spring/Compression' AND name='HotWound') OR (user='$oktauserid' AND type='Spring/Compression' AND name='HotWoundMetric') OR (user='$oktauserid' AND type='Spring/Compression' AND name='Startup') OR (user='$oktauserid' AND type='Spring/Compression' AND name='Startup_Metric')" > ./designtypes/Spring/Compression/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database design --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='$oktauserid' AND type='Spring/Extension' AND name='Startup') OR (user='$oktauserid' AND type='Spring/Extension' AND name='Startup_Metric')" > ./designtypes/Spring/Extension/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl $database design --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='$oktauserid' AND type='Spring/Torsion' AND name='Startup') OR (user='$oktauserid' AND type='Spring/Torsion' AND name='Startup_Metric')" > ./designtypes/Spring/Torsion/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi
