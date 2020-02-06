const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/foo", (req, res) => {
  res.json({ bar: "baz" });
});

module.exports = router;
