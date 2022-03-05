//This isn't being used but I am leaving it to practice for next project.
const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

module.exports = router;
