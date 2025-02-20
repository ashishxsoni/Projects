const express = require("express");
const router = express.Router();
const Blog = require('../models/blog');
const {
  checkForAuthenticationCookie,
  requireAuth
} = require("../middlewares/authentication.js");
router
.get("/",checkForAuthenticationCookie("token"),getHomePage)
.get("/user/signup", getSignupPage)
.get("/blog/myblogs", getMyBlogPage)
.get("/user/login", getLoginPage);

//SSR EJS RENDERING
async function getHomePage(req, res) {
  try {
    // Render the 'home.ejs' template with the fetched URLs
    console.log("Fetching Homepage : ");
    await handleHomePageView(req, res);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ error: "Internal Server Erroron HomePage" });
  }
}
function getSignupPage(req, res) {
  try {
    // Render the 'signup.ejs' template
    console.log("SignupRenders Succefully");
    return res.render("signup.ejs") ,{
      error: req.query.error || null, // Error messages if passed in the query
      success: req.query.success || null, // Success messages if passed in the query
    };
  } catch (error) {
    console.error("Error rendering Signup page:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function getLoginPage(req, res) {
  try {
    // Render the 'login.ejs' template
    return res.render("login.ejs",{
      error: req.query.error || null, // Error messages if passed in the query
      success: req.query.success || null, // Success messages if passed in the query
    });
  } catch (error) {
    console.error("Error rendering Login page:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMyBlogPage(req, res) {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.redirect("/?error=You must be logged in to view your blogs.");
    }

    // Fetch blogs created by the authenticated user
    const allBlogs = await Blog.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // Render the home page with the user's blogs
    return res.render("home.ejs", {
      titleField: "My Blogs",
      user: req.user, // Pass the authenticated user to the template
      blogs: allBlogs, // Pass the user's blogs to display
      error: req.query.error || null, // Error messages from query parameters
      success: req.query.success || null, // Success messages from query parameters
    });
  } catch (error) {
    console.error("Error fetching user's blogs:", error);

    // Render the page with a fallback message on error
    return res.status(500).render("home.ejs", {
      titleField: "My Blogs",
      user: req.user,
      blogs: [], // Provide an empty list if fetching blogs fails
      error: "An error occurred while fetching your blogs.", // Display a meaningful error message
      success: null, // No success message on error
    });
  }
}


// Handle Home Page View
async function handleHomePageView(req, res) {
  try {
    // Fetch blogs for authenticated users
    const allBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    // Render the home page with fetched blogs
    return res.render("home.ejs", {
      titleField: "Home Page",
      user: req.user, // Pass authenticated user if available
      blogs: allBlogs, // Pass blogs to display
      error: req.query.error || null, // Error messages if passed in the query
      success: req.query.success || null, // Success messages if passed in the query
    });
  } catch (error) {
    console.error("Error rendering home page:", error);
    return res.status(500).render("home.ejs", {
      titleField: "Home Page",
      user: req.user,
      blogs: [], // Fallback to an empty blog list in case of errors
      error: "An error occurred while fetching blogs.", // Display a generic error message
      success: null, // No success message on error
    });
  }
}

module.exports = router;
