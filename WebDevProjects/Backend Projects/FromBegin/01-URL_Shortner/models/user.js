const mongoose = require("mongoose");

//Defining Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        //for future
        // validate: {
        //     validator: function (email) {
        //       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        //     },
        //     message: (props) => `${props.value} is not a valid email!`,
        //   },
    },
    password: {
        type: String,
        required: true,

    },
      role : {
          type:String,
          required:true,
          default:"NORMAL",
      },
  
  },
  { timestamps: true }
);


  const User = mongoose.model("user", userSchema);

  module.exports =User;