const router = require("express").Router();
const { getEntry, postEntry } = require("../controllers/entryController");

router.get("/", getEntry);

router.post("/", postEntry);

module.exports = router;
