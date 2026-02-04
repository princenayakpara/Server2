const express = require("express");

const app = express ( );

app.get("/", (req, res) => {
res.send("Express server is running");
});

app.get("/test/:user", (req,res) => {
    res.send(req.params.user);
    console.log(req.params.user);
});

app.get("use/:one", (req,res) => {
    res.send("first code");
});
app.get("use/one", (req,res) => {
    res.send("second code");
});
app.listen(3000, () => {
console. log("Server started on port 3000");
});