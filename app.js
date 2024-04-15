import express from "express";

import bodyParser from "body-parser";
//import bodyParser from "body-parser";
import {
  createBook,
  createUser,
  deleteBook,
  deleteUser,
  getBook,
  getBooks,
  getUser,
  getUsers,
  updateBook,
  updateUser,
} from "./database.js";

const app = express();

app.get("/books", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await getBook(id);
  res.send(book);
});

app.post("/books", bodyParser.json(), async (req, res) => {
  const { title, author, publish_year, genre_of_books, price } = req.body;
  const name = await createBook(title, author, publish_year, genre_of_books, price);
  res.status(+201).send(name);
});

app.put("/books/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const publish_year = req.body.publish_year;
  const genre_of_books = req.body.genre_of_books;
  const price = req.body.price;

  //const { title, author, publish_year, genre_of_books, price } = req.body;
  const book = await updateBook(id, title, author, publish_year, genre_of_books, price);
  res.status(200).send(book);
});

app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await deleteBook(id);
  res.send(book);
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.post("/users", bodyParser.json(), async (req, res) => {
  const { Name } = req.body;
  const user = await createUser(Name);
  res.status(+201).send(user);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);
  res.send(user);
});

app.put("/users/:id",bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const {Name} = req.body;

  const user = await updateUser(id, Name);
  res.status(200).send(user);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
