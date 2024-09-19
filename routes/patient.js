const express = require("express");
const app = express();
const router = express.Router();
const Patient = require("../model/patient.js");
const wrapAsync = require("../utilies/wrapAsync.js");
const { patientSchema } = require("../Schema.js");
const ExpressError = require("../utilies/ExpressError.js");

const validatePatients = (req, res, next) => {
  let { error } = patientSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allPatients = await Patient.find({});
    res.render("Patients/index.ejs", { allPatients });
  })
);

//New route
router.get("/new", (req, res) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged first");
    return res.redirect("/login");
  }
  res.render("Patients/new.ejs", { patient: {} });
});

//Create route
router.post(
  "/",
  validatePatients,
  wrapAsync(async (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "you must be logged first");
      return res.redirect("/login");
    }
    const newPatient = new Patient(req.body.patient);
    let savedPatient = await newPatient.save();
    console.log(savedPatient);

    req.flash("success", "New Record Created!");
    res.redirect("/Patients");
  })
);

//Show Route

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const patient = await Patient.findById(id);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged first");
    return res.redirect("/login");
  }
  res.render("Patients/show.ejs", { patient });
});

// Edit Route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const patient = await Patient.findById(id);
    res.render("Patients/edit.ejs", { patient });
  })
);

// Update Route

router.put(
  "/:id",
  validatePatients,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Patient.findByIdAndUpdate(id, { ...req.body.patient });
    res.redirect("/Patients");
  })
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedPatient = await Patient.findByIdAndDelete(id);
    console.log(deletedPatient);
    res.redirect("/Patients");
  })
);

module.exports = router;
