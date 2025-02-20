const mongoose = require("mongoose");

//Defining Schema
const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        visitedAt: {
          type: String,
          default: Date.now,
        },
      },
    ],
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
      required:true,
    }
  },
  { timestamps: true }
);


  const URL = mongoose.model("url", urlSchema);

  module.exports =URL;