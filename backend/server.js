const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
