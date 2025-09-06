import express from "express";
import fetch from "node-fetch";
let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    // pass posts to the template
    res.render("posts", { posts });
  } catch (err) {
    console.error(err);
    res.send("Error fetching posts");
  }
});

// Show single post details
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post = await response.json();

    // Fetch comments
    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const comments = await commentsResponse.json();

    res.render("post", { post, comments });
  } catch (err) {
    console.error(err);
    res.send("Error fetching post");
  }
});

export default router;
