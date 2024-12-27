const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const PORT = config.get("port");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const mainRouter = require("./routes/index.routes");
const error_handling_middleware = require("./error_middleware/error_handling_middleware");
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes");

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("views"));

app.use("/", viewRouter); //FRONTNED
app.use("/api", mainRouter); //BACKEND

app.use(error_handling_middleware);

console.log(PORT);
async function start() {
  try {
    await mongoose.connect(config.get("dbAtlasUri"));
    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Ma'lumotlar bazasiga ulanishda xatolik");
  }
}
start();
