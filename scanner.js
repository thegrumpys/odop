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
        value = rows.map((row) => {return {type:row.type, name:row.name, user:row.user, value:JSON.parse(row.value)}});
//        console.log('SERVER: After SELECT value=', value);
        var count = 0;
        value.forEach((row) => {
//            console.log('symbol_table=',row.value.symbol_table)
            if (row.value.result.objective_value === null) {
                console.log('0 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=','Objective Value Null value');
                count++;
            }
            row.value.symbol_table.forEach((entry) => {
                if (entry.lmin === undefined && entry.lmax === undefined) {
                    console.log('1 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmin and lmax');
                    count++;
                } else if (entry.lmin === undefined) {
                    console.log('2 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmax');
                    count++;
                } else if (entry.lmax === undefined) {
                    console.log('3 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No lmax');
                    count++;
                }
                if (entry.cmin === undefined && entry.cmax === undefined) {
                    console.log('4 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmin and cmax');
                    count++;
                } else if (entry.cmin === undefined) {
                    console.log('5 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    count++;
                } else if (entry.cmax === undefined) {
                    console.log('6 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    count++;
                }
                if (entry.value === null) {
                    console.log('7 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null value');
                    count++;
                }
                if (entry.cmin === null) {
                    console.log('8 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null cmin');
                    count++;
                }
                if (entry.cmax === null) {
                    console.log('9 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'input=',entry.input,'Symbol Table Entry Null cmax');
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

