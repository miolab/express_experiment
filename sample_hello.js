const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    "<h1>Hello, Express test!</h1>" +
      "<p><a href='/test1'>Test 1</a></p>" +
      "<p><a href='/test2'>Test 2</a></p>"
  );
});

app.get("/test1", (req, res) => {
  res.send("<h1>This page is Test 1.</h1>" + "<p><a href='/'>Home</a></p>");
});

app.get("/test2", (req, res) => {
  res.send("<h1>This page is Test 2.</h1>" + "<p><a href='/'>Home</a></p>");
});

app.listen(port, () => {
  console.log("Server running", `http://localhost:${port}`);
});
