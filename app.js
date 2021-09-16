const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3001;
require("./server/database");
const User_Data = require("./server/collections");
const { AsyncLocalStorage } = require("async_hooks");

app.use("/css", express.static(path.join(__dirname, "./style")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);

// For View Folder
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  User_Data.find({}, function (err, data) {
    res.render("registration_form", { UserData: data });
  });
});


app.get("/registration_form", (req, res) => {
  User_Data.find({}, function (err, data) {
    res.render("registration_form", { UserData: data });
  });
});

app.get("/update_form", (req, res) => {
  User_Data.find({}, function (err, data) {
    res.render("registration_form", { UserData: data });
  });
});

app.post("/update_form", async (req, res) => {
  try {
    User_Data.findOneAndUpdate(
      { _id: req.body._id, },
      req.body,
      { new: true },
      (err, doc) => {
        if (!err) {
          User_Data.find({}, function (err, data) {
            res.render("registration_form", { 
              UserData: data,
             });
          });
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/submit_form", async (req, res) => {
  const formdata = new User_Data({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    state: req.body.state,
    dist: req.body.dist,
  });
  try {
    const FormD = await formdata.save();
    res.redirect("/registration_form");
  } catch (err) {
    console.log(err);
  }
});

app.get("/viewDetail/:id", async (req, res) => {
  try {
    User_Data.findById(req.params.id, (err, doc1) => {
      User_Data.find({}, function (err, data) {
        if (!err) {
          res.render("registration_form", {
            viewDat: doc1,
            UserData: data,
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    User_Data.find({}, function (err, data) {
    User_Data.findById(req.params.id, (err, dataa) => {
        if (!err) {
          res.render("registration_form", {
            update: dataa,
            UserData: data,
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const DeleteData = await User_Data.findByIdAndDelete(req.params.id);
    res.redirect("/registration_form");
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`Port is running at port ${port}`);
});
