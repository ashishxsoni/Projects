const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();
const {
  requireAuth,
} = require("../middlewares/authentication.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //in future we can modify this to paarticuler userid folder uploads but we can not doit as using diskstorage
    // we need to make the directory at my own  , infuture we will do it using mkdir with exist
    const filePath =path.resolve(__dirname,'../public/uploads/') ;
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});


const upload = multer({ storage: storage });

router.post("/", upload.single("coverImage"), handleFileUploading);

//using inline middleware
router.get("/add-new", requireAuth ,(req, res) => {
  try {
    // Render the add blog page
    return res.render("addBlog", { 
      //just render kiya hai to link wohi rhegi /blog/add-new  ab yh us addBlog wale page par aa jayega 
      //and addBlog par se post request /blog par ja rhi hai jise hm up handle kiya hai file uploading me 
      user: req.user,
    });
  }  catch (error) {
    // Log the error and redirect to '/' with a generic error message
    console.error("Error rendering add-new page:", error);
    return res.redirect("/?error=An error occurred while loading the add-new page.");
  }
});
//using inline middleware
router.post("/comment/:blogId", requireAuth , async (req, res) => {
  try {
   

    // Validate the comment content
    const { content } = req.body;
    if (!content || content.trim().length === 0) {
      return res.redirect(`/blog/${req.params.blogId}?error=Comment content cannot be empty.`);
    }

    // Create a new comment
    await Comment.create({
      content: content.trim(),
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    // Redirect back to the blog page after successful comment creation
    return res.redirect(`/blog/${req.params.blogId}?success=Comment added successfully.`);
  } catch (error) {
    // Log the error and redirect with an error message
    console.error("Error creating comment:", error);
    return res.redirect(`/blog/${req.params.blogId}?error=An error occurred while adding your comment.`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Check if the user is authenticated
    //current i allow them to access
    // if (!req.user) {
    //   return res.redirect("/"); // Redirect unauthenticated users to home page
    // }

    // Validate the blog ID
    console.log("Blog id :" , req.user);
    const blogId = req.params.id;

    // Fetch the blog and associated comments
    const blog = await Blog.findById(blogId).populate("createdBy");
    if (!blog) {
      // Redirect to home page with error message if blog not found
      return res.redirect("/?error=Blog not found.");
    }

    const comments = await Comment.find({ blogId }).populate("createdBy");

    // Render the blog details page
    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    // Log the error and redirect to home page with an error message
    console.error("Error fetching blog:", error);
    return res.redirect("/?error=An error occurred while fetching the blog.");
  }
});



async function handleFileUploading(req, res) {
  try {
    // Log the uploaded file details
    console.log("Request File:", req.file);

    // Validate that a file was uploaded
    if (!req.file) {
      return res.status(400).render("addBlog", { message:"No file uploaded."});
    }

    // Log the successful file upload
    console.log(`File uploaded successfully: ${req.file.filename}`);

    // Extract title and body from the request
    const { title, blogbody } = req.body;

    // Validate that required fields are provided
    if (!title || !blogbody) {
      return res.status(400).render("addBlog", { message:"Title and body are required."});
    }

    // Create a new blog entry
    const blog = await Blog.create({
      title,
      blogbody,
      createdBy: req.user._id, // Ensure `req.user` is populated via middleware
      coverImageURL: `/uploads/${req.file.filename}`, // Store the uploaded file's URL
    });

    // Redirect to the newly created blog page
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    // Handle errors during the process
    console.error("Error caught during file uploading:", error);
    // return res.status(500).json({ error: "Internal Server Error" });
    return res.status(400).render("addBlog", { message:"Error caught during file uploading."});
  }
 
}


module.exports = router;
