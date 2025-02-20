const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
//additional imports 
const {
  getHomePage,
  handleUploading,
} = require('./controllers/web');

//import multer
const multer = require("multer");
// Set up multer storage to specify where to store the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb is an call back jiska first value mostly null rhna 
    // hai yh basically error rkhe ke liye hai yaha 
    return cb(null, "Node JS Piyush Garg/ProjectsDev/03-FileUploadWithDiskStorage/Uploads");
     // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()} -${file.originalname}`); 
    // Adding timestamp to file name jisse yh koi samename 
    // ki file upload kare to exsting file overwrite na ho 
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });



// Set EJS as the template engine
app.set("view engine", "ejs");
// app.set('views', path.resolve("./views")); //or we can use this
app.set("views", path.join(__dirname, "./views"));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files (CSS and JS)  
app.use(express.static(path.join(__dirname ,'./public')));  

app
.get("/" , getHomePage)
.post("/upload" ,upload.single("myFile"),handleUploading );

// Start the server on port 3000
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
