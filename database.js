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

//console.log("--------------");

export async function getBook(id) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book
    WHERE id = ${id}
    `);
  return rows[0];
}

export async function createBook(title, author, publish_year, genre_of_books, price, quantity, available_quantity) {
  const [result] = await pool.query(
    `
    INSERT INTO book(title,author,publish_year,genre_of_books,price,quantity,available_quantity)
    VALUES (?,?,?,?,?,?,?)`,
    [title, author, publish_year, genre_of_books, price, quantity, available_quantity]
  );
  const id = result.insertId;
  const name = getBook(id);
  return name;
}

export async function decreaseBookQuantity(id) {
  const [rows] = await pool.query(
    `
  UPDATE book 
  SET available_quantity=available_quantity - 1;
  WHERE id=?`,
    [id]
  );
  const updatedId = rows.updatedId;
  const book = getBook(id);
  return book;
}

export async function updateBook(id, title, author, publish_year, genre_of_books, price) {
  const [rows] = await pool.query(
    `
  UPDATE book 
  SET title=?, author=?, publish_year=?, genre_of_books=?, price=? 
  WHERE id=?
  `,
    [title, author, publish_year, genre_of_books, price, id]
  );
  const updatedId = rows.updatedId;
  const book = getBook(id);
  return book;
}

export async function updateQuantity(id, quantity, available_quantity) {
  const [rows] = await pool.query(
    `
  UPDATE book
  SET quantity=?,available_quantity=?
  WHERE id=?`,
    [quantity, available_quantity, id]
  );
  const updatedId = rows.updatedId;
  const info = getBook(id);
  return info;
}

export async function deleteBook(id) {
  const [rows] = await pool.query("DELETE FROM book WHERE id = ?;", [id]);
  return rows[0];
}
//------------------------------------------------------------------------------------------------------------
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

export async function updateUser(id, Name) {
  const [rows] = await pool.query(
    `
  UPDATE employee 
  SET Name=? 
  WHERE id=?
  `,
    [Name, id]
  );
  const updatedId = rows.updatedId;
  const user = getUser(id);
  return user;
}

export async function deleteUser(id) {
  const [rows] = await pool.query(
    `
  DELETE 
  FROM employee 
  WHERE id = ?;`,
    [id]
  );
  return rows[0];
}
//------------------------------------------------------------------------------------------------------------
export async function getMembers() {
  const [rows] = await pool.query(`
  SELECT * 
  FROM member`);
  return rows;
}

export async function getMember(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM member
  WHERE id = ${id}`);
  return rows[0];
}

export async function createMember(Name, City) {
  const [result] = await pool.query(
    `
  INSERT INTO member(Name,City)
  VALUES (?,?)`,
    [Name, City]
  );
  const id = result.insertId;
  const member = getMember(id);
  return member;
}

export async function deleteMember(id) {
  const [rows] = await pool.query(
    `
  DELETE 
  FROM member 
  WHERE id = ?;`,
    [id]
  );
  return rows[0];
}

export async function updateMember(id, Name, City) {
  const [rows] = await pool.query(
    `
  UPDATE member 
  SET Name=?,City=? 
  WHERE id=?`,
    [Name, City, id]
  );
  const updatedId = rows.updatedId;
  const member = getMember(id);
  return member;
}

//------------------------------------------------------------------------------------------------------------

export async function getMemberBooks() {
  const [rows] = await pool.query(`
  SELECT *
  FROM lended_book`);
  return rows;
}

export async function getMemberBook(id) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM lended_book
  WHERE id=?`,
    [id]
  );
  return rows[0];
}

//buy books
export async function lendBooks(memberId, bookId) {
  const [result] = await pool.query(
    `
  INSERT INTO 
  lended_book(memberId,bookId)
  VALUES(?,?)`,
    [memberId, bookId]
  );

  const id = result.insertId;
  await pool.query(
    `
    UPDATE book
    SET available_quantity = available_quantity - 1
    WHERE id = ?`,
    [bookId]
  );

  const info = getMemberBook(id);
  return info;
}

export async function returnBook(id, return_date) {
  const [rows] = await pool.query(
    `
  UPDATE lended_book 
  SET return_date=?
  WHERE id=?`,
    [return_date, id]
  );

  const updatedId = rows.updatedId;

  await pool.query(`
  UPDATE book
  SET available_quantity = available_quantity + 1
  WHERE id=?`,
  [id]);
  const info = getMemberBook(id);
  return info;
}