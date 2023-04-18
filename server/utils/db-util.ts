import { config } from "./../../config"
const database = config.database
import * as mysql from "mysql"

const pool = mysql.createPool({
  host     :  database.HOST,
  user     : database.USERNAME,
  password : database.PASSWORD,
  database : database.DATABASE
})

const query = function( sql: string, values: (string | number | (string | number)[])[]) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

const createTable = function( sql: string ) {
  return query( sql, [] )
}


const findDataById = function( table: string,  id: string, start: number, end: number ) {
  const  _sql =  "SELECT * FROM ? WHERE id = ? LIMIT ? , ?"
  return query( _sql, [ table, id, start, end ] )
}


const findDataByPage = function( table: string, keys: string, start: number, end: number ) {
  const  _sql =  "SELECT ? FROM ?  LIMIT ? , ?"
  return query( _sql, [keys,  table,  start, end ] )
}


const insertData = function( table: string, values: [] ) {
  const _sql = "INSERT INTO ? SET ?"
  return query( _sql, [ table, values ] )
}


const updateData = function( table: string, values: [], id: string ) {
  const _sql = "UPDATE ? SET ? WHERE id = ?"
  return query( _sql, [ table, values, id ] )
}


const deleteDataById = function( table: string, id: string ) {
  const _sql = "DELETE FROM ? WHERE id = ?"
  return query( _sql, [ table, id ] )
}


const select = function(keys: string[],  table: string ) {
  const  _sql =  "SELECT ? FROM ?"
  return query( _sql, [ keys, table ] )
}

const selectWhere = function(keys: string[],  table: string, where: string ) {
  const  _sql =  "SELECT ? FROM ? WHERE ?"
  return query( _sql, [ keys, table, where ] )
}

const count = function( table: string ) {
  const  _sql =  "SELECT COUNT(*) AS total_count FROM ? "
  return query( _sql, [ table ] )
}

export default {
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
}
