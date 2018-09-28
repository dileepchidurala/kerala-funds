class database {
  constructor() {
    this.ipaddress = '10.25.214.196'; // DB machine ip address
    this.dbusername = 'dbc'; // Database username
    this.dbpassowrd = 'dbc'; // Database password
    this.db_keralaFunds = 'covalent.keralacontributionprod'; // To store the data from this application
    this.db_usertable = 'covalent.UserInfo'; // To get the username from qlid
  }
}
module.exports = database;
