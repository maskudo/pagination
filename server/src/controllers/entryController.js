const Entry = require("../models/entryModel");
const CustomError = require("../utils/CustomError");

module.exports.getEntries = async (req, res, next) => {
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
    next(new CustomError(400, e.message));
  }
};

module.exports.postEntry = async (req, res, next) => {
  const { title, body, date } = req.body;
  try {
    const entry = await Entry.create({ title, body, date });
    res.status(201).json({ data: entry });
  } catch (e) {
    next(new CustomError(400, e.message));
  }
};

module.exports.deleteEntry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const entry = await Entry.deleteOne({ _id: id });
    if (!entry.deletedCount) {
      return next(new CustomError(404, "Entry not found"));
    }
    res.status(200).json({ data: "Entry deleted successfully" });
  } catch (e) {
    next(new CustomError(400, e.message));
  }
};

module.exports.getEntry = async (req, res, next) => {
  const { id } = req.params;
  try {
    const entry = await Entry.findById(id);
    if (!entry) {
      return next(new CustomError(404, "Entry not found"));
    }
    res.status(200).json({ data: entry });
  } catch (e) {
    next(new CustomError(400, e.message));
  }
};
