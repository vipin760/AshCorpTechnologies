const express = require("express");
const router = express();
const {
  createTask,
  fetchTask,
  deleteTask,
  updateTask,
  updateLineThrough,
  fetchSingleTask,
} = require("../controler/task.controller");

router
  .route("/")
  .post(createTask)
  .get(fetchTask)
  .put(updateTask)
  .patch(updateLineThrough);
router.route("/:id").delete(deleteTask);
router.route("/select").get(fetchSingleTask);

module.exports = router;
