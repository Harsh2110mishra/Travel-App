import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promiseDB = new Promise((resolve, reject) => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)"
        );
      },
      (error) => {
        reject(false);
        throw new Error("Database creation error: " + error.message);
      },
      () => {
        resolve(true);
        console.log("Created database OK");
      }
    );
  });
  return promiseDB;
};

export const insertData = (title, imageUri, address, lat, lng) => {
  const promiseDB = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri ,address, lat, lng) VALUES (?,?,?,?,?)`,
        [title, imageUri, address, lat, lng],
        (tx, result) => {
          resolve(result);
          //console.log("result: ", result);
        },
        (tx, error) => {
          reject(error);
          console.log(error);
          throw new Error("Database Table error: " + error.message);
        }
      );
    });
  });
  return promiseDB;
};

export const fetchData = () => {
  const promiseDB = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (tx, result) => {
          resolve(result);
          //console.log("result: ", result);
        },
        (tx, error) => {
          reject(error);
          console.log(error);
          throw new Error("Database Table error: " + error.message);
        }
      );
    });
  });
  return promiseDB;
};
