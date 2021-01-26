const mongoose = require("mongoose");
const URL = process.env.DB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to " + URL);
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error" + err);
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected ");
});