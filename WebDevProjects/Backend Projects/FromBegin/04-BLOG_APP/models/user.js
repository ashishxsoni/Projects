const mongoose = require("mongoose");
const crypto = require('crypto');
const { createTokenForUser } = require("../services/authentication");
const path = require('path');
// Defining Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: '/images/profileimg4',
      
      
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Pre-save hook for hashing the password
userSchema.pre("save", function (next) {
  const user = this; // Reference to the current document
  // console.log("Before hashing: ", user);

  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next() ;

  try {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
    .createHmac('sha256' , salt) //(type , secretkey)
    .update(user.password)
    .digest('hex');
    
    user.salt = salt;
    // salt is like a secret for each user of 16 digit ki  
    // Hash the password using the salt
    user.password = hashedPassword;
    // console.log("after User : " ,user);
    return next();
  } catch (err) {
    console.log("Error in Scheme Pre:" , err);
    next(err);
  }
});

//SE PDF NOTES WHY WE USE STATIC METHOD OF MONGOOSE SCHEME INSTEAD OF SEPARE VALIDATE FUNCT FOR PASS
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = crypto.createHmac("sha256", salt)
      .update(password) //this password is from login fiels input
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
  }
);


const User = mongoose.model("user", userSchema);

module.exports = User;
