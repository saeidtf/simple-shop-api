const express = require("express");
const helmet = require('helmet')
require("dotenv").config();

const app = express();
const port = process.env.PORT ||  3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet())




app.get("/", async (req, res) => {
  res.send('Hello World!');
});


require("./routers")(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
