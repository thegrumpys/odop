#!/bin/bash
# Perform dump [backup] operation on Startup designs to create load.sql files.
# Hard coded for B. Watt usertoken '00u1itcx44XGp65ln357'
# Use during development / release process after running the mk{type}Startups.js execute scripts only !

if [ -z "$1" ]; then
  echo "USAGE:  dump_db_startup_files type"
  echo "        where \"type\" is the system type: \"local\", \"development\", \"test\", \"staging\" or \"production\""
  echo ""
  echo "Perform dump [backup] operation on Startup designs to create load.sql files."
  echo "Hard coded for B. Watt usertoken '00u1itcx44XGp65ln357'"
  echo "Use during development / release process after running the mk{type}Startups.js execute scripts only !"
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

# Info@SpringDesignSoftware.org usetoken=00u1g7vr21d7yajY4357
# bwatt@1fifoto.com usertoken=00u1itcx44XGp65ln357

mysqldump --user=$user --password=$password --host=$host --skip-ssl --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='00u1itcx44XGp65ln357' AND type='Piston-Cylinder' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Piston-Cylinder' AND name='Startup_Metric')" $database design | sed -e "/NOTE_VERBOSITY/ d" > ./designtypes/Piston-Cylinder/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='00u1itcx44XGp65ln357' AND type='Solid' AND name='70PoundGoldBar') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='StandardGoldBar') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='Startup_Metric') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='USPS_MachinableParcels') OR (user='00u1itcx44XGp65ln357' AND type='Solid' AND name='USPS_MaxVolume')" $database design | sed -e "/NOTE_VERBOSITY/ d" > ./designtypes/Solid/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Demo') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='HotWound') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='HotWoundMetric') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Compression' AND name='Startup_Metric')" $database design | sed -e "/NOTE_VERBOSITY/ d" > ./designtypes/Spring/Compression/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Extension' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Extension' AND name='Startup_Metric')" $database design | sed -e "/NOTE_VERBOSITY/ d" > ./designtypes/Spring/Extension/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi

mysqldump --user=$user --password=$password --host=$host --skip-ssl --skip-opt --complete-insert --no-create-info --compact --no-tablespaces --where="(user='00u1itcx44XGp65ln357' AND type='Spring/Torsion' AND name='Startup') OR (user='00u1itcx44XGp65ln357' AND type='Spring/Torsion' AND name='Startup_Metric')" $database design | sed -e "/NOTE_VERBOSITY/ d" > ./designtypes/Spring/Torsion/load.sql
if [ $? -ne 0 ]; then echo "dump_db_startup_files: mysqldump returned $?"; else echo "mysqldump returned SUCCESS"; fi
