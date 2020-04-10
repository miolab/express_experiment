const express = require("express");
const app = express();
const port = 3000;

// API page
// http://locaslhost:3000/api/v1/list
app.get("/api/v1/list", (req, res) => {
  // JSON data
  const todoList = [
    { title: "Node.js confirm.", done: true },
    { title: "Express confirm.", done: false },
    { title: "JavaScript confirm.", done: false },
  ];

  // submit JSON
  res.json(todoList);
});

app.listen(port, () => {
  console.log("API Server running", `http://localhost:${port}/api/v1/list`);
});
