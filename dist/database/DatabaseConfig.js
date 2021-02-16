"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DatabaseConfig = /** @class */ (function () {
    function DatabaseConfig() {
    }
    DatabaseConfig.prototype.getConnection = function () {
        return mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    };
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=DatabaseConfig.js.map