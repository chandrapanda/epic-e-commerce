const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  //find all tags
  try {
    const tagData = await Tag.findAll({
      fields: ['id'],
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //get a single tag by its `id`
router.get('/:id', (req, res) => {

  try {
    const tagData = await.Tag.findbyPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({message: "No tag with this ID found"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tag) => {
    if (req.body.tag_name.length) {
      res.status(200).json(tag);
    };
  });
   if (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  if (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!tagData) {
      res.status(400).json({message: "Tag ID not found"});
      return;
    } 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
