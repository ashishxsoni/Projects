const path = require("path");
const envPath = path.join(__dirname, './.env');
// Environement Vairables
require('dotenv').config({ path: envPath });


const express = require("express");
const app = express();
//connect MongoDB

const {connectMongoDB} = require('./connection.js');
connectMongoDB(process.env.MONGO_URL).then((result) => {
    console.log("DataBase Connected SuccessFully!");
})
.catch((err) => {
    console.log("Database Can't Connect Error:", err);
});
//Cokies handling
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const {
    checkForAuthenticationCookie,
  } = require("./middlewares/authentication.js");
     
// Set EJS as the template engine
app.set("view engine", "ejs");
// app.set('views', path.resolve("./views")); //or we can use this
app.set("views", path.join(__dirname, "./views"));

// Serve static files (CSS and JS)  
app.use(express.static(path.join(__dirname ,'./public'))); // not used right now  


//MIDDLEWARES

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

//Adding routers
const staticRouter = require("./routes/staticRouter.js");
app.use("/" , staticRouter);
const userRouter = require("./routes/userRouter.js");
app.use("/user" , userRouter);
const blogRouter = require("./routes/blogRouter.js");
app.use("/blog" , blogRouter);

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
