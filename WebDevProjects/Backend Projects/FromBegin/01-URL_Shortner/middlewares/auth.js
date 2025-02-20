
const { getUser } = require('../service/auth'); // Import a function to fetch user data based on userId

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    // Extract userId from cookies
    const userUid = req.cookies?.uid;
    console.log("Request restrict user " ,userUid);
    // If userId is not present, redirect to the login page
    if (!userUid) {
        console.log("No userId found in cookies.");
        return res.redirect("/user/login");
    }
    
    // console.log("Request restrict user " ,req,"\n\n\n");
    // Fetch user details using the userId
    const user = await getUser(userId);

    // If user is not found, redirect to the login page
    if (!user) {
      console.log(`User not found for userId: ${userId}`);
      return res.redirect("/user/login");
    }

    // Attach the user to the request object for downstream handlers
    req.user = user;
    console.log("Authenticated user After Middleware :", req.user);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle unexpected errors and log them for debugging
    console.error("Error in restrictToLoggedinUserOnly middleware:", error);

    // Optionally, you can redirect to an error page or send an error response
    res.status(500).send("An error occurred. Please try again.");
  }
}

//AUTHORIZATION
//WE DONT MAKE IT A ASYNC FUNCTION REMEBER IT BECAUSE WE ARE NOT FETCHING ANTHING HERE
function restrictTo(roles = []) { 
  // restricted to only specified roles
  return function (req, res, next) {
    try {
      // Check if the user is logged in
      if (!req.user) {
        return res.redirect("/user/login"); // Redirect to login if no user is authenticated
      }

      // Check if the user's role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        res.status(403); // Set the status code to "Forbidden"
        return res.end("Unauthorized: You do not have access to this resource.");
      }

      // If all checks pass, proceed to the next middleware or route
      return next();
    } catch (error) {
      console.error("Error in restrictTo middleware:", error);
      return res.status(500).end("Internal Server Error");
    }
  };
}

module.exports = {
  restrictToLoggedinUserOnly,
  restrictTo,
};
