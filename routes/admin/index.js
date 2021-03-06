const express = require("express");
const Category = require("../../models/Category");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categories", (req, res) => {
  Category.find({})
    .sort({ $natural: -1 })
    .lean()
    .then(categories => {
      res.render("admin/categories", { categories });
    });
});

router.post("/categories", (req, res) => {
  Category.create(req.body, (error, category) => {
    if (!error) {
      res.redirect("categories");
    }
  });
});

router.delete("/categories/:id", (req, res) => {
  Category.remove({ _id: req.params.id })
    .lean()
    .then(() => {
      res.redirect("/admin/categories");
    });
});
module.exports = router;
