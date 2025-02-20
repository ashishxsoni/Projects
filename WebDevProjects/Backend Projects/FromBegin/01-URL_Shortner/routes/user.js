const express = require("express");
const router = express.Router();
//import the controllers
const {
    handleSignUp,
    handleLogin,
 
} = require("../controllers/user");
//EJS RENDERING

router
.post("/signup" ,handleSignUp )
.post("/login" , handleLogin); 


module.exports = router;

 