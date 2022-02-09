const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    //Find all categories

  try {
    const categoryData = await Category.findAll({
      fields: ['id'],
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get one category
router.get('/:id', async (req, res) => {
  // Find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({message: "No category with this id."});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new category
router.post('/', (req, res) => {

  Category.create({
    category_name: req.body.category_name
  })
  .then((category) => {
    if (req.body.category_name.length) {
      res.status(200).json(category);
    };
  });
   if (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

//Update category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  if (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category with this ID found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
