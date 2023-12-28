const Entry = require("../models/entryModel");

module.exports.getEntries = async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page ?? 1);
  limit = parseInt(limit ?? 5);

  try {
    const entries = await Entry.paginate(
      {},
      { page, limit, sort: { createdAt: -1 } },
    );
    res.status(200).json({ data: entries });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports.postEntry = async (req, res) => {
  const { title, body, date } = req.body;
  try {
    const entry = await Entry.create({ title, body, date });
    res.status(201).json(entry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports.deleteEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await Entry.deleteOne({ _id: id });
    if (!entry.deletedCount) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ data: "Entry deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.getEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await Entry.findById(id);
    if (!entry) {
      return res.status(404).json({ message: "No such entry." });
    }
    res.status(200).json({ data: entry });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
