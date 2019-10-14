let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let userRegisterSchema = new mongoose.Schema({
  firstname: { type: String, require: true, minlength: 1, maxlength: 10 },
  lastname: { type: String, require: true, minlength: 1, maxlength: 10 },
  address: {
    city: { type: String, require: true, minlength: 1, maxlength: 20 },
    state: { type: String, require: true, minlength: 1, maxlength: 20 },
    country: { type: String, require: true, minlength: 1, maxlength: 20 }
  },
  userLogin: {
    mobileNo: {
      type: Number,
      require: true,
      minlength: 1,
      maxlength: 10,
      unique: true
    },
    password: { type: String, require: true, minlength: 1, maxlength: 10 }
  }
});

let User = mongoose.model("UserRegistration", userRegisterSchema);

function ValidationError(message) {
  let schema = Joi.object({
    firstname: Joi.string()
      .min()
      .max(10)
      .required(),
    lastname: Joi.string()
      .min()
      .max(10)
      .required(),
    address: {
      city: Joi.string()
        .min()
        .max(10)
        .required(),
      state: Joi.string()
        .min()
        .max(10)
        .required(),
      country: Joi.string()
        .min()
        .max(10)
        .required()
    },
    userLogin: {
      mobileNo: Joi.number()
        .min()
        .max(10)
        .required(),
      password: Joi.string()
        .min()
        .max(10)
        .required()
    }
  });
  return schema.validate(message);
}

module.exports = { User, ValidationError };
