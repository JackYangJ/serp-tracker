"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./../../config");
const database = config_1.config.database;
const mysql = require("mysql");
const pool = mysql.createPool({
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE
});
const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err);
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};
const createTable = function (sql) {
    return query(sql, []);
};
const findDataById = function (table, id, start, end) {
    const _sql = "SELECT * FROM ? WHERE id = ? LIMIT ? , ?";
    return query(_sql, [table, id, start, end]);
};
const findDataByPage = function (table, keys, start, end) {
    const _sql = "SELECT ? FROM ?  LIMIT ? , ?";
    return query(_sql, [keys, table, start, end]);
};
const insertData = function (table, values) {
    const _sql = "INSERT INTO ? SET ?";
    return query(_sql, [table, values]);
};
const updateData = function (table, values, id) {
    const _sql = "UPDATE ? SET ? WHERE id = ?";
    return query(_sql, [table, values, id]);
};
const deleteDataById = function (table, id) {
    const _sql = "DELETE FROM ? WHERE id = ?";
    return query(_sql, [table, id]);
};
const select = function (keys, table) {
    const _sql = "SELECT ? FROM ?";
    return query(_sql, [keys, table]);
};
const selectWhere = function (keys, table, where) {
    const _sql = "SELECT ? FROM ? WHERE ?";
    return query(_sql, [keys, table, where]);
};
const count = function (table) {
    const _sql = "SELECT COUNT(*) AS total_count FROM ? ";
    return query(_sql, [table]);
};
exports.default = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select,
    selectWhere,
    count,
};
