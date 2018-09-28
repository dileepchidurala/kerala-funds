var Teradata = require('node-teradata'),
  database = require('../../DetailsFolder/dbdetails');

var dbdetails = new database();

var config = {
  url: `jdbc:teradata://${dbdetails.ipaddress}/tmode=ANSI,charset=UTF8`,
  username: dbdetails.dbusername,
  password: dbdetails.dbpassowrd,
  driver: './server/dbconfig/jars/',
  minPoolSize: 1,
  maxPoolSize: 100,
  keepalive: {
    interval: 60000,
    query: 'SELECT 1',
    enabled: true
  }
};
var teradata = new Teradata(config);

module.exports.teradata = teradata;
module.exports.db_name = dbdetails.db_keralaFunds;
module.exports.usertable = dbdetails.db_usertable;
