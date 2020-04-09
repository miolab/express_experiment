const express = require("express");
const app = express();
const port = 3000;

// Web form
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello, Express test!</h1>" +
      "<p><a href='/test1'>Test 1</a></p>" +
      "<p><a href='/test2'>Test 2</a></p>" +
      "<form method='post'>" +
      '<textarea name=textfield" placeholder="ここに文章を入力してください"></textarea>' +
      "<p><input type='submit' value='送信する'></P>" +
      "</form>"
  );
});

// POST method
app.post("/", (req, res) => {
  res.send("POSTに成功しました" + "<p><a href='/'>Home</a></p>");
});

// Junp to Link page
app.get("/test1", (req, res) => {
  res.send("<h1>This page is Test 1.</h1>" + "<p><a href='/'>Home</a></p>");
});
app.get("/test2", (req, res) => {
  res.send("<h1>This page is Test 2.</h1>" + "<p><a href='/'>Home</a></p>");
});

app.listen(port, () => {
  console.log("Server running", `http://localhost:${port}`);
});
