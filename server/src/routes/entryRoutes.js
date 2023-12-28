const router = require("express").Router();
const {
  getEntry,
  postEntry,
  getEntries,
  deleteEntry,
} = require("../controllers/entryController");

router.get("/", getEntries);
router.get("/:id", getEntry);
router.delete("/:id", deleteEntry);
router.post("/", postEntry);

module.exports = router;
