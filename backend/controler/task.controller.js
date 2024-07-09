const Task = require("../model/task.model");

exports.createTask = async (req, res) => {
  try {
    const taskData = await Task.create(req.body);
    res.status(200).send({ data: taskData });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.fetchTask = async (req, res) => {
  try {
    const taskData = await Task.find();
    if (!taskData) {
      res.status(200).send({ message: "data not found" });
    }
    res
      .status(200)
      .send({ data: taskData, message: "data fetch successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id).then((data) => {
      res.status(200).send({ message: "task deleted successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body._id, req.body).then((data) => {
      res.status(200).send({ data: data, message: "task update successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.updateLineThrough = async (req, res) => {
  try {
    req.body.completed = !req.body.completed;
    await Task.findByIdAndUpdate(req.body._id, req.body).then((data) => {
      res
        .status(200)
        .send({ data: data, message: "task updated successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};

exports.fetchSingleTask = async (req, res) => {
  try {
    var data = [];
    if (req.query.key === "all") {
      data = await Task.find();
    }

    if (req.query.key === "completed") {
      data = await Task.find({ completed: true });
    }

    if (req.query.key === "pending") {
      data = await Task.find({ completed: false });
    }
    res.status(200).send({ data: data, message: "data fetch successfully" });
  } catch (error) {
    res.status(500).send({ message: `${error.message}` });
  }
};
