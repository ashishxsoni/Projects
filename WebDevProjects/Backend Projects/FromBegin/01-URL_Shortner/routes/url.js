const express = require("express");
const router = express.Router();
const {
 generateShortURL,
 trackAndRedirect,
 getAnalytics,
} = require("../controllers/url");
//EJS RENDERING

router
.get("/:shortId" , trackAndRedirect) 
/*   /url/:shortId the path is basically means thi
  kyunki wha se maine /url pass kara hai index.js se to yha se me yh hta skta hu kuinii abhi urlrouter /url se start hone wale routes 
  ke liye hi hai  */

.get("/analytics/:shortId",getAnalytics)
.post("/" ,generateShortURL);
module.exports = router;

 