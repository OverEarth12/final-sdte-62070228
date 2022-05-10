const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const modelSelection = require("./models/Selection")
const modelResult = require("./models/Result")

const port = 3001;
const app = express();
app.use(cors())

mongoose.connect(`mongodb+srv://OverEarth:x43L85%409r-Z9cRx@cluster0.lk02s.mongodb.net/final`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json());
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.get("/", async (request, response) => {
  try {
    response.send("Hello <3");
  } catch (error) {
    response.status(500).send(error);
  }
})

app.get("/getSelection", async(request, response) => {

  try {
    const result =  await modelSelection.find({})
    response.status(200).json(result)
    return result
  } catch (err) {
    response.status(500).send(err);
  }
})

app.get("/getResult", async(request, response) => {

  try {
    const result =  await modelResult.find({})
    response.status(200).json(result)
    return result
  } catch (err) {
    response.status(500).send(err);
  }
})

app.get("/getbykey", async(request, response) => {

  try {
    console.log(request.data)
    const result =  await modelResult.find({"name": request.body.keyword})
    response.status(200).json(result)
    return result
  } catch (err) {
    response.status(500).send(err);
  }
})

app.get("/getbycategory", async(request, response) => {

  try {
    const result =  await modelResult.find({})
    response.status(200).json(result)
    return result
  } catch (err) {
    response.status(500).send(err);
  }
})