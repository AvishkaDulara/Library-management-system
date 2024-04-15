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

export async function getBooks() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book`);
  return rows;
}

console.log("--------------");

export async function getBook(id) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book
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
  const name = getBook(id);
  return name;
}

export async function updateBook(id,title, author, publish_year,genre_of_books,price){
  const [rows] = await pool.query(`
  UPDATE book 
  SET title=?, author=?, publish_year=?, genre_of_books=?, price=? 
  WHERE id=?
  `,[title, author, publish_year,genre_of_books,price,id])
  const updatedId = rows.updatedId;
  const book = getBook(id)
  return book;

}

export async function deleteBook(id) {
  const [rows] = await pool.query("DELETE FROM book WHERE id = ?;", [id]);
  return rows[0];
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

export async function createUser(Name) {
  const [result] = await pool.query(
    `
    INSERT INTO employee(Name)
    VALUES (?)`,
    [Name]
  );
  const id = result.insertId;
  const user = getUser(id);
  return user;
}

export async function updateUser(id,Name){
  const [rows] = await pool.query(`
  UPDATE employee 
  SET Name=? 
  WHERE id=?
  `,[Name,id]);
  const updatedId = rows.updatedId;
  const  user = getUser(id);
  return user;

}

export async function deleteUser(id) {
  const [rows] = await pool.query("DELETE FROM employee WHERE id = ?;", [id]);
  return rows[0];
}
