const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

//@desc Get tasks from database
//@route GET /tasks
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch {
    (error) => {
      res.json({ message: error });
    };
  }
});

//@desc Get a task from database
//@route GET /task/:id
//@access Private
const getTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    res.json(task);
  } catch {
    (error) => {
      res.json({ message: error });
    };
  }
});

//@desc Post a task to database
//@route POST /tasks
//@access Private
const postTask = asyncHandler(async (req, res) => {
  const newTask = await new Task({
    title: req.body.title,
    user: req.user.id,
  }).populate("user");
  try {
    await newTask.save();
    res.json({ success: "new task added" });
  } catch {
    (error) => {
      res.json({ error: error });
    };
  }
});

//@desc Update a task
//@route PATCH /task/update/:id
//@access Private
const patchTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.body.id);
  const updatedTask = await Task.findByIdAndUpdate(req.body.id, req.body);
  const user = await User.findById(req.user.id);
  const taskUserId = JSON.stringify(task.user);
  const userId = JSON.stringify(user.id);
  if (!task) {
    res.status(400);
    res.json({ error: "task not found" });
  } else if (!user) {
    res.status(401);
    res.json({ error: "user not found" });
  } else if (taskUserId !== userId) {
    res.status(401);
    res.json({ error: "user not authorized" });
  } else if (taskUserId === userId) {
    try {
      updatedTask.save();
      res.json({ success: "task updated" });
    } catch {
      (error) => {
        res.json({ error: error });
      };
    }
  }
});

//@desc Delete a task from database
//@route DELETE /tasks/delete/:id
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const taskUserId = JSON.stringify(task.user);
  const userId = JSON.stringify(user.id);
  if (!task) {
    res.status(400);
    res.json({ error: "task not found" });
  } else if (!user) {
    res.status(401);
    res.json({ error: "user not found" });
  } else if (taskUserId !== userId) {
    res.status(401);
    res.json({ error: "user not authorized" });
  } else if (taskUserId === userId) {
    try {
      await Task.findByIdAndDelete(task._id);
      res.json({ success: "task was successfully deleted" });
    } catch {
      (error) => {
        res.json({ error: error });
      };
    }
  }
});

module.exports = { getTasks, getTask, postTask, patchTask, deleteTask };
