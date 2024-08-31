"use strict";

/**
 * @author Óscar Hernández
 * @copyright 2024
 * @license GPL-3.0
 * @version 1.0.0
 *
 */

import sqlite3 from "sqlite3";

import { open } from "sqlite";
import useConfig from "./config.js";
import useCrypto from "./Services/CryptoService.js";
import { v4 as uuid4 } from "uuid";
const { hashPassword } = useCrypto();
import { styleText } from "util";
const { table_users, db_name } = useConfig();

class DataBaseManager {
  constructor(dbName) {
    this.dbName = dbName;
  }

  /**
   * Función para abrir la conexión a la base de datos
   * @returns Database
   */
  connect = async () => {
    const db = await open({
      filename: `./${this.dbName}`,
      driver: sqlite3.Database,
    });

    return db;
  };

  /**
   * Función para crear la tabla de usuarios
   * @param {sqlite3.Database} db 
   */
  createTable = (db) => {
    const sql = /* SQL */ `CREATE TABLE IF NOT EXISTS ${table_users} (
        id uuid PRIMARY KEY NOT NULL,
        userName varchar(255) NOT NULL,
        email varchar(255)UNIQUE NOT NULL, 
        password varchar(255) NOT NULL)`;
    db.exec(sql);
  };

  /**
   * Función para iniciar la primera migración de la base de datos
   * @returns Boolean
   */
  initDatabase = async () => {
    try {
      const db = await this.connect();
      this.createTable(db);
      await db.close();
      return true;
    } catch (error) {
      console.error(styleText(["bgRed", "white"], error.message));
      return false;
    }
  };

  /**
   * Función para buscar usuario en la base de datos
   * @param {*} email
   * @returns Object
   */
  queryUser = async ({ email }) => {
    try {
      const db = await this.connect();
      const sql = /* SQL */ `SELECT * from ${table_users} WHERE email = (?)`;
      const query = [email];
      const user = await db.get(sql, query);
      await db.close();
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Función para crear un usuario
   * @param {*} Object 
   * @returns Promise<void>
   */
  createUser = async ({ userName, password, email }) => {
    const db = await this.connect();
    const hash = await hashPassword(password);
    console.log(hash);
    const userId = uuid4();
    const passwordHash = hash;
    console.log(passwordHash);
    const sql = /*SQL*/ `INSERT INTO ${table_users} (id, userName, email, password) VALUES(?, ?, ?, ?)`;
    const stmt = await db.prepare(sql);
    const values = {
      id: userId,
      userName: userName,
      email: email,
      password: hash,
    };
    await stmt.run(values.id, values.userName, values.email, values.password);
    await stmt.finalize();

    const user = { email };
    this.queryUser(
      user,
      ((res) => {
        return res.resolve();
      },
      (error) => Promise.reject(error))
    );
  };

  /**
   * Función para resetear la tabla de usuarios
   * @return void
   */
  reset = async () => {
    const db = await this.connect();

    const sql = /* SQL */ `DELETE FROM ${table_users}`;
    try {
      await db.run(sql);
      await db.close();
    } catch (error) {
      console.error(styleText(["bgRedBright", "white"], error.message));
    }
  };
}

const dataBase = new DataBaseManager(db_name);

export default dataBase;
