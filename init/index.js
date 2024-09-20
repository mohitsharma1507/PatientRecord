const mongoose = require("mongoose");
const initData = require("./data.js");
const Patient = require("../model/patient.js");

//const dbUrl = "mongodb://127.0.0.1:27017/PatientData";
const dbUrl =
  "mongodb+srv://patientRecord:05072001@cluster0.ys7ma.mongodb.net/";

main()
  .then((res) => {
    console.log("successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Patient.deleteMany({});
  await Patient.insertMany(initData.data);

  console.log("data was initialized");
  console.log("Patient data was initialized");
};

initDB();
