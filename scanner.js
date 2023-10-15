require('dotenv').config();
const mysql = require('mysql');

console.log('hello');
//console.log('process.env=',process.env);

var connection;
connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect();
//console.log('connection=',connection);

const FIXED = 2;
var value;
var stmt = 'SELECT * FROM design';
console.log('SCANNER: stmt='+stmt);
connection.query(stmt, function(err, rows, fields) {
//    console.log('SCANNER: After SELECT err=', err, ' rows=', rows);
    if (err) {
        console.log('SCANNER: 500 - INTERNAL SCANNER ERROR');
        connection.end();
        throw err;
    } else {
        value = rows.map((row) => {return {type:row.type, name:row.name, user:row.user, value:JSON5.parse(row.value)}});
//        console.log('SERVER: After SELECT value=', value);
        var count = 0;
        value.forEach((row) => {
//            console.log('symbol_table=',row.value.symbol_table)
            if (row.value.result.objective_value === null) {
                console.log('0001 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=','Objective Value Null value');
                count++;
            }
            row.value.symbol_table.forEach((entry) => {
                // Undefined Checks
                if (entry.value === undefined) {
                    console.log('0101 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No value');
                    count++;
                }
                if (entry.lmin === undefined && entry.lmax === undefined) {
                    console.log('0201 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmin and lmax');
                    count++;
                } else if (entry.lmin === undefined) {
                    console.log('0202 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmax');
                    count++;
                } else if (entry.lmax === undefined) {
                    console.log('0203 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmax');
                    count++;
                }
                if (entry.cmin === undefined && entry.cmax === undefined) {
                    console.log('0301 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmin and cmax');
                    count++;
                } else if (entry.cmin === undefined) {
                    console.log('0302 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    count++;
                } else if (entry.cmax === undefined) {
                    console.log('0303 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    count++;
                }
                if ((row.type === 'Spring/Compression' && row.value.version >= 12) ||
                    (row.type === 'Spring/Extension' && row.value.version >= 8) ||
                    (row.type === 'Spring/Torsion' && row.value.version >= 8)) {
                    if (typeof entry.value === 'number' && entry.format === undefined) {
                        if (entry.validmin === undefined && entry.validmax === undefined) {
                            console.log('0401 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No validmin and validmax');
                            count++;
                        } else if (entry.validmin === undefined) {
                            console.log('0402 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No validmin');
                            count++;
                        } else if (entry.validmax === undefined) {
                            console.log('0403 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No validmax');
                            count++;
                        }
                    }
                }
                if (entry.sdlim === undefined) {
                    console.log('0501 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No sdlim');
                    count++;
                }

                // NULL Checks
                if (entry.value === null) {
                    console.log('1101 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null value');
                    count++;
                }
                if (entry.cmin === null) {
                    console.log('1301 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null cmin');
                    count++;
                }
                if (entry.cmax === null) {
                    console.log('1302 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null cmax');
                    count++;
                }
                if (entry.validmin === null) {
                    console.log('1401 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null validmin');
                    count++;
                }
                if (entry.validmax === null) {
                    console.log('1402 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null validmax');
                    count++;
                }
                if (entry.sdlim === null) {
                    console.log('1501 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null sdlim');
                    count++;
                }
            })
        });
        if (count > 0) {
            console.log('There were',count,'messages');
        }
        connection.end();
        console.log('goodbye');
     }
});

