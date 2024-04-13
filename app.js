import express from "express";

import bodyParser from "body-parser";
import { createBook, deleteBook, getName, getNames, getUser, getUsers } from "./database.js";

const app = express();

app.get("/books", async (req, res) => {
  const books = await getNames();
  res.send(books);
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await getName(id);
  res.send(book);
});

app.get("/users",async(req,res) => {
    const users = await getUsers();
    res.send(users);
});
app.get("/users/:id", async(req,res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
})

app.post("/books",(bodyParser.json()), async (req, res) => {
  const { title,author,publish_year,genre_of_books,price } = req.body;
  const name = await createBook(title,author,publish_year,genre_of_books,price);
  res.status(+201).send(name);
});

app.delete("/books/:id",async(req,res) => {
  const id = req.params.id;
  const book = await deleteBook(id);
  res.send(book);

})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
