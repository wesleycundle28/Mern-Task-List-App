const express = require("express");
const router = express.Router();
const { protect } = require("../middleware");
const {
  getTasks,
  getTask,
  postTask,
  patchTask,
  deleteTask,
} = require("../controllers/taskController");

//gets all tasks in db
router.get("/", protect, getTasks);
//get specific task
router.get("/:id", protect, getTask);
//submits a task
router.post("/", protect, postTask);
//update a specified task
router.patch("/update/:id", protect, patchTask);
//delete a specified task
router.delete("/delete/:id", protect, deleteTask);

module.exports = router;
