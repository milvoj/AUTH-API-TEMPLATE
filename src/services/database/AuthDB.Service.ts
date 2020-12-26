import { Database } from "sqlite3";

const createAuthTable = (database: Database) => {
  const sqlQuery = `
        CREATE TABLE IF NOT EXISTS auth (
        id integer PRIMARY KEY,
        username text UNIQUE,
        email text UNIQUE,
        password text)`;
  return database.run(sqlQuery);
};

const initAuthDB = (): Database => {
  const sqlite = require("sqlite3").verbose();
  const database = new sqlite.Database("./data/Auth.db");
  createAuthTable(database);
  return database;
};

export const authDB: Database = initAuthDB();

export const findUserByEmail = (email: any, cb: any) => {
  return authDB.get(
    `SELECT * FROM auth WHERE email = ?`,
    [email],
    (err: any, row: any) => {
      cb(err, row);
    }
  );
};

export const createUser = (user: any, cb: any) => {
  return authDB.run(
    `INSERT INTO auth (username, email, password) VALUES (?,?,?)`,
    user,
    (err: any) => {
      cb(err);
    }
  );
};
