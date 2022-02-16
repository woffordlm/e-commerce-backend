const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
    },
  })
    .then((catData) => {
      if (!catData) {
        res.status(404).json({ message: "No tag found" });
        return;
      }
      res.json(catData)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id:req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then((catData) => {
    if(!catData){
      res.status(404).json({"message": "id not found"})
    }
    res.json(catData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
    
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(catName => {
    res.json(catName);

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // create a new category
});

router.put("/:id", (req, res) => {
  Category.update({
    category_name: req.body.category_name,
    where: {
      id: req.body.id
    }
  })
  .then(updateData => {
    res.json(updateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteData => {
    res.json(deleteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // delete a category by its `id` value
});

module.exports = router;
