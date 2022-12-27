const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", async (req, res) => {
  res.send('Hello World!');
});


require("./routers")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
