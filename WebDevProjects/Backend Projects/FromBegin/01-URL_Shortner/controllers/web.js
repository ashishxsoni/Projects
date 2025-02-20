const URL = require("../models/url");

//SSR EJS RENDERING
async function getHomePage(req, res) {
    try {
      // Render the 'home.ejs' template with the fetched URLs
      return res.render("home.ejs");
    } catch (error) {
      console.error("Error fetching URLs:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async function getSignupPage(req, res) {
    try {
      // Render the 'signup.ejs' template
      console.log("SignupRenders Succefully")
      return res.render("signup.ejs");
    } catch (error) {
      console.error("Error rendering Signup page:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  async function getLoginPage(req, res) {
    try {
      // Render the 'login.ejs' template
      return res.render("login.ejs");
    } catch (error) {
      console.error("Error rendering Login page:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  


  
module.exports = {
    getSignupPage,
    getLoginPage,
    getHomePage,
};