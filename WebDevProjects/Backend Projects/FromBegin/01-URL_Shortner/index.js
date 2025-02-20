const express = require("express");
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');
const {restrictToLoggedinUserOnly , restrictTo} = require('./middlewares/auth');
//connect MongoDB
const {connectMongoDB} = require('./connection');
connectMongoDB("mongodb://127.0.0.1:27017/shortURL").then((result) => {
    console.log("DataBase Connected SuccessFully!");
  })
  .catch((err) => {
    console.log("Database Can't Connect Error:", err);
  });
  
  // Set EJS as the template engine
  app.set('view engine', 'ejs');
  // app.set('views', path.resolve("./views")); //or we can use this
  app.set('views', path.join(__dirname, './views'));
  
  //adding middlewares
  // Serve static files (CSS and JS)  
  app.use(express.static(path.join(__dirname ,'./public')));  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json()); // Parse JSON data
  app.use(cookieparser());




//Adding routers
const staticRouter = require("./routes/staticRouter");
app.use("/" , staticRouter);
const userRouter = require("./routes/user");
app.use("/user" , userRouter);
const urlRouter = require("./routes/url");
app.use("/url" , restrictToLoggedinUserOnly,urlRouter);

const PORT=8000;
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  