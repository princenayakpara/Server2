const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

let users = [
  { att: "80", uid: 108243, total_sub: 14, bonus: "20", name: "Dax" },
  { att: "85", uid: 108245, total_sub: 12, bonus: "15", name: "Prince" },
  { att: "90", uid: 108244, total_sub: 13, bonus: "17", name: "Parth" }
];


app.get("/", (req, res) => {
  res.send("Express server is running");
});


app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:uid", (req, res) => {
  const uid = parseInt(req.params.uid);
  const user = users.find(u => u.uid === uid);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

app.post("/user", (req, res) => {
  const newUser = req.body;

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/user/:uid", (req, res) => {
  const uid = parseInt(req.params.uid);
  const index = users.findIndex(u => u.uid === uid);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = req.body;

  res.json({
    message: "User replaced",
    user: users[index]
  });
});

app.patch("/user/:uid", (req, res) => {
  const uid = parseInt(req.params.uid);
  const user = users.find(u => u.uid === uid);

  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body);

  res.json({
    message: "User partially updated",
    user
  });
});

app.delete("/user/:uid", (req, res) => {
  const uid = parseInt(req.params.uid);
  const index = users.findIndex(u => u.uid === uid);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(index, 1);

  res.json({
    message: "User deleted",
    user: deletedUser[0]
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});