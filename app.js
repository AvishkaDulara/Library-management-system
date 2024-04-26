import express from "express";

import bodyParser from "body-parser";
//import bodyParser from "body-parser";
import {
  createBook,
  lendBooks,
  createMember,
  createUser,
  deleteBook,
  deleteMember,
  deleteUser,
  getBook,
  getBooks,
  getMemberBook,
  getMemberBooks,
  getMember,
  getMembers,
  getUser,
  getUsers,
  returnBook,
  updateBook,
  updateMember,
  updateQuantity,
  updateUser
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

app.post("/addBooks", bodyParser.json(), async (req, res) => {
  const { title, author, publish_year, genre_of_books, price, quantity, available_quantity } = req.body;
  const name = await createBook(title, author, publish_year, genre_of_books, price, quantity, available_quantity);

  res.status(+201).send(name);
});

app.post("/updateQuantity/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;
  const available_quantity = req.body.available_quantity;
  const book = await updateQuantity(id, quantity, available_quantity);
  res.status(200).send(book);
});

app.put("/updateBooks/:id", bodyParser.json(), async (req, res) => {
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

app.delete("/deleteBooks/:id", async (req, res) => {
  const id = req.params.id;
  const book = await deleteBook(id);

  if (!book || book === "null") {
    return res.status(404).send("This book was removed.");
  }

  res.send(book);
});

//------------------------------------------------------------------------------------------------------------

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.post("/addUsers", bodyParser.json(), async (req, res) => {
  const { Name } = req.body;
  const user = await createUser(Name);
  res.status(+201).send(user);
});

app.delete("/deleteUsers/:id", async (req, res) => {
  const id = req.params.id;
  const user = await deleteUser(id);

  if (!user || user === "null") {
    return res.status(404).send("This employee was removed.");
  }

  res.send(user);
});

app.put("/updateUsers/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const { Name } = req.body;

  const user = await updateUser(id, Name);
  res.status(200).send(user);
});

//------------------------------------------------------------------------------------------------------------

app.get("/members", async (req, res) => {
  const members = await getMembers();
  res.send(members);
});

app.get("/members/:id", async (req, res) => {
  const id = req.params.id;
  const member = await getMember(id);
  res.send(member);
});

app.post("/addMembers", bodyParser.json(), async (req, res) => {
  const { Name } = req.body;
  const { City } = req.body;
  const member = await createMember(Name, City);
  res.status(+201).send(member);
});

app.put("/updateMembers/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const { Name } = req.body;
  const { City } = req.body;
  const member = await updateMember(id, Name, City);
  res.status(200).send(member);
});

// app.delete("/members/:id", async (req, res) => {
//   const id = req.params.id;
//   const member = await deleteMember(id);
//   res.send(member);
// });
app.delete("/deletMmembers/:id", async (req, res) => {
  const id = req.params.id;
  const member = await deleteMember(id);

  // Check if member is null or already deleted
  if (!member || member === "already_deleted") {
    return res.status(404).send("This member was deleted.");
  }
  res.send(member);
});

//------------------------------------------------------------------------------------------------------------

app.get("/memberBooks", async (req, res) => {
  const info = await getMemberBooks();
  res.send(info);
});

app.get("/memberBooks/:member", async (req, res) => {
  const memberId = req.params.member;
  const info = await getMemberBook(memberId);
  res.send(info);
});

app.post("/lendBook", bodyParser.json(), async (req, res) => {
  const { memberId } = req.body;
  const { bookId } = req.body;
  //const{available_quantity} = req.body;
  const info = await lendBooks(memberId, bookId);
  //const book = await decreaseBookQuantity(id,quantity);
  //res.status(+201).send(book);
  //const book = await decreaseBookQuantity(available_quantity);
  //res.status(200).send(book);
  res.status(+201).send(info);
});

// app.post("/returnBook", bodyParser.json(),async(req,res) =>{
//   const {member} = req.body;
//   const {book} = req.body;
//   const {return_date} = req.body;
//   const info = await returnBook(member,book,return_date)
//   res.status(+201).send(info);
// })

app.post("/returnBook/:id", bodyParser.json(), async (req, res) => {
  const id = req.params.id;
  const return_date = req.body.return_date;
  console.log(return_date, "----------------------------");
  const info = await returnBook(id, return_date);
  // console.log(info)
  res.status(200).send(info);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
