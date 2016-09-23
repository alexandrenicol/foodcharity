/* jshint node: true */
'use strict';

const mysql = require('mysql');
let instance = null;

class DB {
  
  constructor() {
    if (!instance) {
      instance = this;
    
      this.createConnection();
    }
    return instance;
  }
  
  createConnection() {
    this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      port: 3307,
      password: 'lma3844jk',
      database: 'foodcharity',
      connectionLimit: 50,
      acquireTimeout: 100000
    }); 
    
    /* this.connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'YZrK6Cky',
      database: 'plateforme_produit',
      connectionLimit: 10,
      acquireTimeout: 100000
    }); */
  }
  
  query(sql) {
    var self = this;
    // this.createConnection();
    var promise = new Promise(function (resolve, reject) { 
      self.connection.getConnection(function (err, connection) {
        if (err) { throw err; } 

        // connection.connect();
        // promise = new Promise(function (resolve, reject) {
        connection.query(sql, function (err, rows, fields) {
          if (err) { 
            if (err.code.substring(0, 3) === 'ER_') {
              reject(err);
            } else if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
              self.createConnection(); 
            } else {
              throw err;
            }
          }

          resolve({
            rows: rows,
            fields: fields
          });
          connection.release();
        });
      });
    
    }); 
    // this.connection.end();
    return promise;
  }
  
  select(tableName, whereClause = null) {
    let where = null;
    if (whereClause) {
      where = ` WHERE ${whereClause} `;
    } else {
      where = ``;
    }
    const sql = `SELECT * FROM ${tableName} ${where} ;`;
    console.log(sql);
    return this.query(sql);
  }
  
  insert(tableName, keysAndValues) {
    var sql = 'INSERT INTO `' + tableName + '` ( ';
    var keys = Object.keys(keysAndValues);
    var columns = keys.join(', ');
    sql = sql + columns + ' ) VALUES ( ';
    var vals = Object.keys(keysAndValues).map(key => '"' + keysAndValues[key] + '"');
    var values = vals.join(', ');
    sql = sql + values + ' );';
    // console.log(sql);
    return this.query(sql);
  }
  
  update(tableName, keysAndValues, whereClause) {
    const vals = Object.keys(keysAndValues).map(key => ` \`${key}\`= "${keysAndValues[key]}" `);
    const set = vals.join(', ');
    const where = ` ${whereClause} `;
    var sql = 
        `UPDATE ${tableName}
        SET ${set}
        WHERE ${where};`;
    console.log(sql);
    return this.query(sql);
  }
  
  

  
}

module.exports = DB;
