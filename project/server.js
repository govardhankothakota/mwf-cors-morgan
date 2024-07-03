const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("node:fs")
const path = require("node:path")

let app = express();
app.use(cors());
// app.use(morgan("tiny"));
app.use(morgan("combined"));



// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

let employeeSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  age: Number,
  country: String,
  department: String,
  profilepic: String,
});
let Employee = new mongoose.model("employees", employeeSchema);

app.get("/countriesList", async (req, res) => {
  let countriesList = await Employee.find().distinct("country");

  res.json(countriesList);
});
app.get("/departmentsList", async (req, res) => {
  let departmentsList = await Employee.find().distinct("department");

  res.json(departmentsList);
});

app.get("/gendersList", async (req, res) => {
  let gendersList = await Employee.find().distinct("gender");

  res.json(gendersList);
});

let expressMWF1 = (req, res, next) => {
  console.log("inside expressMF1");
  next();
};
let expressMWF2 = (req, res, next) => {
  console.log("inside expressMF2");
  next();
};
let expressMWF3 = (req, res, next) => {
  console.log("inside expressMF3");
  next();
};

app.get(
  "/employees",
  expressMWF1,
  expressMWF2,
  expressMWF3,
  async (req, res) => {
    console.log(req.query);
    let employeesArray = await Employee.find()
      .and([
        { country: req.query.country },
        { department: req.query.department },
        { gender: req.query.gender },
      ])
      .sort(req.query.order == "desc" ? "-age" : "age")
      .limit(req.query.limit ? req.query.limit : 2);
    res.json(employeesArray);
  }
);

// app.get("/employees/:country/:department/:gender", async (req, res) => {
//   console.log(req.params);
//   let employeesArray = await Employee.find().and([
//     { country: req.params.country },
//     { department: req.params.department },
//     { gender: req.params.gender },
//   ]).sort(req.query.order == "desc"?"-age":"age").limit(req.query.limit?req.query.limit:2);

//   res.json(employeesArray);
// });

app.listen(7799, () => {
  console.log("Listening to port 7799");
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://govardhank:govardhank@brnstudent.z5qymfc.mongodb.net/BRNinfotech?retryWrites=true&w=majority&appName=brnstudent"
    );
    console.log("Successfully connected to MDB");
  } catch (error) {
    console.log("Unable to connect MDB");
  }
};
connectToMDB();
