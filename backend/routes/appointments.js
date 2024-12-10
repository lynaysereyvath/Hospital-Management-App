const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.route("/").get((req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { patientName, doctorName, date } = req.body;
  const newAppointment = new Appointment({ patientName, doctorName, date });

  newAppointment
    .save()
    .then((savedAppoointment) => res.json(savedAppoointment))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) => {
      appointment.patientName = req.body.patientName;
      appointment.doctorName = req.body.doctorName;
      appointment.date = req.body.date;

      appointment
        .save()
        .then(() => res.json("Appointment updated!"))
        .catch((err) => res.status(400).json("Err: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Appointment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
