const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
      date: {
            type: Date,
            required: true,
            default: Date.now
          },
          bodyTemperature: {
            type: Number, 
            required: true
          },
          bloodPressure: {
            systolic: {
              type: Number, // upper value of blood pressure
              required: true
            },
            diastolic: {
              type: Number, // lower value of blood pressure
              required: true
            }
          },
          heartRate: {
            type: Number, // beats per minute
            required: true
          }
        }, 
        {
          timestamps: true // This automatically adds createdAt and updatedAt fields
        });



const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
