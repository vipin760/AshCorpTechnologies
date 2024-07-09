const express = require("express")
const router = express()
const { createTask, featchTask, deleteTask } = require("../controler/task.controller")

router.route("/").post(createTask).get(featchTask)
router.route("/:id").delete(deleteTask)

module.exports = router