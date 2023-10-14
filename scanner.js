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
            row.value.symbol_table.forEach((entry) => {
                if (entry.cmin === undefined && entry.cmax === undefined) {
                    console.log('1 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmin and cmax');
                    if (!(entry.lmin & FIXED) && !(entry.lmax & FIXED)) {
                        console.log('1a filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmin and cmax, but lmin or lmax NOT FIXED','lmin=',entry.lmin,'lmax=',entry.lmax);
                    }
                    count++;
                } else if (entry.cmin === undefined) {
                    console.log('2 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    if (!(entry.lmin & FIXED) && !(entry.lmax & FIXED)) {
                        console.log('2a filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax, but lmin or lmax NOT FIXED','lmin=',entry.lmin,'lmax=',entry.lmax);
                    }
                    count++;
                } else if (entry.cmax === undefined) {
                    console.log('3 filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax');
                    if (!(entry.lmin & FIXED) && !(entry.lmax & FIXED)) {
                        console.log('3a filetype=',row.type,'filename=',row.name,'user=',row.user,'version=',row.value.version,'name=',entry.name,'No cmax, but lmin or lmax NOT FIXED','lmin=',entry.lmin,'lmax=',entry.lmax);
                    }
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

