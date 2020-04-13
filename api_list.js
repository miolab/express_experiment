const express = require("express");
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const app = express();
const port = 3000;

app.use(multer().none());
app.use(express.static("web"));

// ToDoList data
const todoList = [];

// API page (submit JSON)
// http://locaslhost:3000/api/v1/list
app.get("/api/v1/list", (req, res) => {
  res.json(todoList);
});

// add item to ToDoList
// http://locaslhost:3000/api/v1/add
app.post("/api/v1/add", (req, res) => {
  // generate uniq ID
  const id = uuidv4();

  // fetch submit data from client
  const todoData = req.body;
  const todoTitle = todoData.title;

  // generate ToDo set
  const todoItem = {
    id,
    title: todoTitle,
    done: false,
  };

  // add item to ToDoList
  todoList.push(todoItem);

  console.log("Add: " + JSON.stringify(todoItem));

  // response added item to client
  res.json(todoItem);
});

// delete item from ToDoList
app.delete("/api/v1/item/:id", (req, res) => {
  // check ID
  const index = todoList.findIndex((item) => item.id === req.params.id);

  // case applicable ID
  if (index >= 0) {
    const deleted = todoList.splice(index, 1);
    console.log("Delete: " + JSON.stringify(deleted[0]));
  }

  // response status 200
  res.sendStatus(200);
});

// set up server
app.listen(port, () => {
  console.log("API Server running", `http://localhost:${port}/api/v1/list`);
});
