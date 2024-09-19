const Joi = require("joi");

module.exports.patientSchema = Joi.object({
  patient: Joi.object({
    date: Joi.date().required(),
    bodyTemperature: Joi.number().required(),
    bloodPressure: Joi.object({
      systolic: Joi.number().required(),
      diastolic: Joi.number().required(),
    }).required(),
    heartRate: Joi.number().required(),
  }),
});
