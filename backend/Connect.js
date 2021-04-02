let mysql = require('mysql');
module.exports = class Connect{
    constructor(){
        // HOST DOMAIN
        this.host = 'localhost';
        this.portSERVER = 7000;
        // MONGO DB
        this.hostsql = 'localhost';
        this.user = 'tan';
        this.password = '12345';
        this.database = 'quan_ly_do_an';
    }
    //MONGO CONNECT
    async connectMongoDB (callback){
        let con = mysql.createConnection({
            host: this.hostsql,
            user: this.user,
            password: this.password,
            database: this.database,
          });
        con.connect(function(err) {
            if (err) throw err;
            else callback(con);
        });
    }
}