const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ hello: "world" });
});

router.post("/", (req, res) => {
  res.json({ hello: "world" });
});

module.exports = router;
