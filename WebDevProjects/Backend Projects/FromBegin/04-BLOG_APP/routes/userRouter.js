const express = require('express');
const router = express.Router();
const User = require("../models/user.js");



//EJS RENDERING

router.get("/logout" , handleLogOutPage)
.post("/signup" ,handleSignUp ) 
.post("/login" , handleLogin); //or say signin



async function handleSignUp(req, res)  {
    try {
      const { fullname , email, password } = req.body;
        // console.log("signup post request contains ",req.body,"\n");
      // Basic validation (can be extended further)
      if (!fullname || !email || !password) {
        // console.log("Signup All fields are required!");
        return res.status(400).render("signup", { message: "All fields are required!" });
      }
      
      // Check if the email or username already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // console.log("Signup Existing User!");
        return res.status(400).render("signup", { message: "Email already exists!" });
      }
  
      // Create a new user
      const newUser = await User.create({
        fullname,
        email,
        password,
      });
      console.log("signup Sucessfull",newUser);
      // Redirect to home page or login page after successful signup
      return res.status(201).redirect("/user/login");
  
    } catch (err) {
      console.error("Error during signup:", err);
  
      // Render an error page or show a specific error message
      return res.status(500).render("signup", { message: "Something went wrong. Please try again." });
    }
  };
  

async function handleLogin(req, res){
  try {
    const { email, password } = req.body;
        // Basic validation
    if (!email || !password) {
      
      return res.status(400).render("login", { message: "Both email and password are required!" });
    }

   
    //genrateing token 
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token" , token);
    console.log("Login Successfull" );
    // Redirect to home page or dashboard after successful login
    // return res.status(200).render("home", { message: `Welcome back, ${user.username}!` });
    return res.status(200).redirect("/");

  } catch (err) {
    console.error("Error during login:", err);

    // Render an error page or show a specific error message
    return res.status(500).render("login", { message: err});
  }
};


function handleLogOutPage(req, res) {
  try {
    // Render the 'home.ejs' template with the fetched URLs
    console.log("Logged Out:")
    return res.clearCookie("token").redirect('/');
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports =router;