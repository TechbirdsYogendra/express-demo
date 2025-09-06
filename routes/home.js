import express from "express";
let router = express.Router();

router.get("/", (req, res) => {
    // res.send(`Hare Krishna Hare Krishna Krishna Krishna Hare Hare \n Hare Rama Hare Rama Rama Rama Hare Hare`);
    // Render the index.pug template and pass data to it
    res.render("index.pug", { title: "My Express App", message: "Hello there and welcome to my Express app!" });
  });

export default router;