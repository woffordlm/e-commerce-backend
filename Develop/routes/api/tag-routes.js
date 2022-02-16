const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { destroy } = require('../../models/Tag');

router.get('/', (req, res) => {
  // fix this route
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
       include: {
        model: Product
     }
    }
  )
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log (err);
    res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {

  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id","tag_name"],
    include: [
      {
        model: Product
      }
    ]

  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  
  Tag.create({
    id:req.body.id,
    tag_name: req.body.tag_name
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log (err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found with that ID.' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found by that ID.' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
