const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'caboose.proxy.rlwy.net',
    user: 'root',
    password: 'CZkQSsYLYtXObOfQpWxAIqDEYsivqumc',
    database: 'railway',
    port: 54465
});

conexion.connect((err) => {
    if (err) {
        console.log("Error conexión:", err);
    } else {
        console.log("Conectado a Railway MySQL");
    }
});

module.exports = conexion;