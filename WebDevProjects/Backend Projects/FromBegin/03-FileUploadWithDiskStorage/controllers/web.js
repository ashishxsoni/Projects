
//SSR EJS RENDERING
async function getHomePage(req, res) {
    try {
      // Render the 'home.ejs' template with the fetched URLs
      res.status(200);
      return res.render("home.ejs");
    } catch (error) {
      console.error("Error Caught In Uploading Files", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
async function handleUploading(req, res) {
    try {
      console.log("Request Body " ,JSON.stringify(req.body));
      console.log("Request File " ,req.file);
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(`File uploaded Succefull : ${req.file.filename}`);
    res.status(200).send("File uploaded successfully!");
     
    } catch (error) {
      console.error("Error Caught In Uploading Files", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports = {
    getHomePage,
    handleUploading,
};