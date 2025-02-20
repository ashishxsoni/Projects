const User = require("../models/user.js");
const {v4:uuidv4} = require("uuid");
const {setUser , getUser}= require('../service/auth.js');


async function handleSignUp(req, res)  {
    try {
      const { username, email, password } = req.body;
        console.log("signup",req.body);
      // Basic validation (can be extended further)
      if (!username || !email || !password) {
        return res.status(400).render("signup", { message: "All fields are required!" });
      }
  
      // Check if the email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).render("signup", { message: "Email or username already exists!" });
      }
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password,
      });
      console.log("signup Sucessfull",newUser);
      // Redirect to home page or login page after successful signup
      // return res.status(201).render("login", { message: "User registered successfully!" }); // this will just show view not change url 
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
      console.log("Login" ,req.body);
    // Basic validation
    if (!email || !password) {
      return res.status(400).render("login", { message: "Both email and password are required!" });
    }

    // Check if user exists
    const user = await User.findOne({ email  , password});
    if (!user) {
      return res.status(400).render("login", { message: "Invalid email or password!" });
    }

    const sessionId = uuidv4();
    // Set session  (example for session-based login)
    setUser(sessionId , user);
    res.cookie('uid' , sessionId);//cookiename , session id;
    console.log("Login Successfull" , user);
    // Redirect to home page or dashboard after successful login
    // return res.status(200).render("home", { message: `Welcome back, ${user.username}!` });
    

    return res.status(200).redirect("/");

  } catch (err) {
    console.error("Error during login:", err);

    // Render an error page or show a specific error message
    return res.status(500).render("login", { message: "Something went wrong. Please try again." });
  }
};


module.exports = {
    handleSignUp,
    handleLogin,
}
