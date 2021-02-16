import * as mysql from "mysql";
import * as dotenv from "dotenv";
export class DatabaseConfig {
    getConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
}
