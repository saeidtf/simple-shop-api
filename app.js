const scheduledFunctions = require('./corns/appCorn.js');
const express = require("express");
const helmet = require('helmet')
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT ||  3500;

scheduledFunctions.initScheduledJobs();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet())

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));



app.get("/", async (req, res) => {
  res.send('API for Ecommerce');
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
