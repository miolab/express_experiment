const express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const app = express();
const port = 3000;

app.use(multer().none());
app.use(express.static("web"));

// ToDoList data
const todoList = [];

// API page
// http://locaslhost:3000/api/v1/list
app.get("/api/v1/list", (req, res) => {
  // submit JSON
  res.json(todoList);
});

// add item to ToDoList
// http://locaslhost:3000/api/v1/add
app.post("/api/v1/add", (req, res) => {
  const id = uuidv4;
  const todoData = req.body;
  const todoTitle = todoData.title;

  const todoItem = {
    id,
    title: todoTitle,
    done: false,
  };

  todoList.push(todoItem);

  console.log("Add: " + JSON.stringify(todoItem));

  res.json(todoItem);
});

app.listen(port, () => {
  console.log("API Server running", `http://localhost:${port}/api/v1/list`);
});
