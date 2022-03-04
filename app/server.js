const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const tasks = require("./routes/taskRoutes");
const users = require("./routes/userRoutes");

//pulls info from dotenv folder (start)
require("dotenv").config();
//pulls info from dotenv folder (end)

//allows communication between 2 different ports (start)
app.use(cors({ origin: "http://localhost:3000" }));
//allows communication between 2 different ports (end)

//allow json to be sent between frontend and backend (start)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//allow json to be sent between frontend and backend (end)

//connect to mongo database (start)

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected...");
  })
  .catch((error) => {
    console.log(error);
  });

//connect to mongo database (end)

//routes (start)
app.use("/tasks", tasks);
app.use("/user", users);

//routes (end)
//code for deployment (start)
if (process.env.MODE === "production") {
  // console.log("production mode");
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), (error) => {
      if (error) {
        res.status(500).send(error);
      }
    });
  });
}

//code for deployment (end)

//listen on port 3500 (start)
PORT = process.env.PORT || 6600;

app.listen(PORT, () => {
  console.log(`server connected to 3400`);
});

//listen on port 3500 (end)
