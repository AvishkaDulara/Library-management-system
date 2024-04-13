import mysql from "mysql2";

import dotenv from "dotenv";
//import { query } from "express";
dotenv.config();


const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNames() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book`);
  return rows;
}

console.log("--------------");

export async function getName(id) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book
    WHERE id = ${id}
    `);
  return rows;
}

export async function getUsers() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM employee`);
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM employee
    WHERE id = ${id}
    `);
  return rows[0];
}

export async function createBook(title, author, publish_year, genre_of_books, price) {
  const [result] = await pool.query(
    `
    INSERT INTO book(title,author,publish_year,genre_of_books,price)
    VALUES (?,?,?,?,?)`,
    [title, author, publish_year, genre_of_books, price]
  );
  const id = result.insertId;
  const name = getName(id);
  return name;
}

export async function deleteBook(id){
    const[rows] = await pool.query("DELETE FROM book WHERE id = ?;",[id]);
    return rows[0];
}