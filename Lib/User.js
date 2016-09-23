/* jshint node: true */
'use strict';

const DB = require('./DB');
var bcrypt = require('bcrypt-nodejs');

class User {
  
  constructor(username, password) {
    this.db = new DB();
    this.username = username;
    this.password = password;
  }
  
  info() {
    return `USER\n
id: ${this.id}\n
username: ${this.username}\n
`;
  }
  
  insert() {
    return this.db.insert('user', {
      username: this.username,
      password: this.generateHash(this.password)
    });
  }
  
  fetch() {
    return this.db.select('user', ` \`id\` = "${this.id}" `);
  }
  
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  
  static validPassword(password, localPassword) {
    return bcrypt.compareSync(password, localPassword);
  }
  
  static findById(id) {
    const db = new DB();
    return db.select('user', ` \`id\` = "${id}" `);
  }
  
  static findOne(userObject) {
    const db = new DB();
    const vals = Object.keys(userObject).map(key => ` \`${key}\`= "${userObject[key]}" `);
    const whereClause = vals.join(' AND ');
    console.log('whereClause +++ ', whereClause);
    return db.select('user', whereClause);
  }
  
  
  static getAll() {
    const db = new DB();
    return db.select('user');
  }
  
}

module.exports = User;
