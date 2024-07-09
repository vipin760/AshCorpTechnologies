const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/dataBase");
const app = express();
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT;
connectDb();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
const task_route = require("./routes/task.route");
app.use("/", task_route);

app.listen(port, () => {
  console.log("server connected........", port);
});
