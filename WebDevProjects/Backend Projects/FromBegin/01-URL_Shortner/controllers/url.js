const URL = require("../models/url");
const shortId = require("short-id");


async function generateShortURL(req, res) {
    try {
      const { redirectURL } = req.body;
      console.log(req.user._id);
      // Validate if URL is provided
      if (!redirectURL) {
        return res.status(400).send('URL is required');
      }
  
      // Check if the URL already exists in the database
      const existingURL = await URL.findOne({ redirectURL });
      if (existingURL) {
        return res.render('home', {
           urls: await URL.find({createdBy:req.user._id}), // Optionally pass all URLs to display in the table
        }); // Optionally redirect to home if URL already exists
      }
  
      // Generate a new short ID
      const shortID = shortId.generate();
  
      // Create a new URL entry in the database
      const newURL = new URL({
        shortID,
        redirectURL,
        visitHistory: [],
        createdBy:req.user._id,
      });
  
      await newURL.save();
  
      // Pass the short ID and URL to the template
      return res.render('home', {
        shortId: shortID, // Only pass when the URL is successfully generated
        urls: await URL.find({createdBy:req.user._id}), // Optionally pass all URLs to display in the table
      });
    } catch (error) {
      console.error('Error creating short URL:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
  

async function trackAndRedirect(req, res) {
  try {
      const shortId = req.params.shortId; // Get the shortId from request params

      // Find the URL document based on shortId
      const urlDoc = await URL.findOne({ shortID: shortId });
      if (!urlDoc) {
          return res.status(404).json({ error: "Short URL not found" });
      }

      // Push the local time string to the visitHistory
      const currentTime = new Date().toLocaleTimeString(); // Get the local time string

      await URL.updateOne(
          { shortID: shortId },
          {
              $push: {
                  visitHistory: {
                      visitedAt: currentTime, // Store the local time string
                  },
              },
          }
      );

      // Redirect the user to the original URL
      res.redirect(urlDoc.redirectURL);
      console.log("Redirecte to the URL");
  } catch (error) {
      console.error("Error tracking visit or redirecting:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAnalytics(req, res) {
  try {
    const shortId = req.params.shortId; // Get the shortId from request params

    // Find the URL document based on shortId
    const urlDoc = await URL.findOne({ shortID: shortId });
    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Return the analytics data
    return res.json({
      totalClicks: urlDoc.visitHistory.length,
      analytics: urlDoc.visitHistory,
    });
  } catch (error) {
    console.error("Error on Analysis:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
    generateShortURL,
    getAnalytics,
    trackAndRedirect,
};
