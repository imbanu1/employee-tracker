const mysql = require('mysql12');

const connection = mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'tracker',
    database: 'employee_tracker',

});

connection.promise = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            }else{
                resolve(connection);
            }
        });
    });
};
module.exports = db;