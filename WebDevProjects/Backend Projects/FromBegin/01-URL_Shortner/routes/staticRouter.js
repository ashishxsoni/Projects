const express = require("express");
const router = express.Router();

const {
    getHomePage,
    getLoginPage,
    getSignupPage,
   } = require("../controllers/web.js");

   router
   .get("/", getHomePage)
   .get("/user/signup", getSignupPage)
   .get("/user/login", getLoginPage);
 
   module.exports = router;