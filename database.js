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

//get books details from the book table
export async function getBooks() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book`);
  return rows;
}

//get book details from the book table
export async function getBook(id) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM book
    WHERE id = ${id}
    `);
  return rows[0];
}

//add books for the system
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

//update book's details from the book table
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

//update  book quantity 
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

//delete book from the system
export async function deleteBook(id) {
  const [rows] = await pool.query("DELETE FROM book WHERE id = ?;", [id]);
  return rows[0];
}
//------------------------------------------------------------------------------------------------------------

//get users's details from the employee table
export async function getUsers() {
  const [rows] = await pool.query(`
      SELECT * 
      FROM employee`);
  return rows;
}

//get user's details from the employee table
export async function getUser(id) {
  const [rows] = await pool.query(`
      SELECT * 
      FROM employee
      WHERE id = ${id}
      `);
  return rows[0];
}


//add users for the system
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


//update users details
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

//delete users from the system
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

//get members details from the member table
export async function getMembers() {
  const [rows] = await pool.query(`
  SELECT * 
  FROM member`);
  return rows;
}

//get member details from  member table
export async function getMember(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM member
  WHERE id = ${id}`);
  return rows[0];
}

//add member for the system
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

//delete members from the system
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

//update members details
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

//get lended_book table details
export async function getMemberBooks() {
  const [rows] = await pool.query(`
  SELECT *
  FROM lended_book`);
  return rows;
}

//get lended_book table details
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

//lend books from the system
export async function lendBooks(memberId, bookId) {
  const [result] = await pool.query(
    `
    INSERT INTO lended_book (memberId, bookId)
    VALUES (?,?)`,
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
  const info = await getMemberBook(id);
  const message = `This member lended this book`;
  return { info, message };
}


//return books 
export async function returnBook(id, return_date) {
  // Update the return date in the lended_book table
  await pool.query(
    `
    UPDATE lended_book 
    SET return_date=?
    WHERE id=?
    `,
    [return_date, id]
  );

  // Retrieve the bookId from the lended_book table
  const [lendedBook] = await pool.query(
    `
    SELECT bookId FROM lended_book WHERE id=?
    `,
    [id]
  );
  
  const bookId = lendedBook[0].bookId;

  // Update the available quantity in the book table
  await pool.query(
    `
    UPDATE book
    SET available_quantity = available_quantity + 1
    WHERE id=?
    `,
    [bookId]
  );

  // Get information about the returned book (assuming you have such a function)
  const info = await getMemberBook(id);

  return info;
}