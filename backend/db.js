require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false, // Set true nếu dùng Azure SQL
        trustServerCertificate: true 
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Đã kết nối thành công tới SQL Server!');
    } catch (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    }
};

module.exports = { sql, connectDB };
