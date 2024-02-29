const mysql = require('mysql2');

const db  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Chimamkpam#37',
    database: 'employee_tracker',

});
db.on("error", (err) => {
    console.log("- STATS Mysql2 connection died:", err);
});

// connection.promise = () => {
//     return new Promise((resolve, reject) => {
//         connection.connect((err) => {
//             if (err) {
//                 reject(err);
//             }else{
//                 resolve(connection);
//             }
//         });
//     });
// };
module.exports = db;