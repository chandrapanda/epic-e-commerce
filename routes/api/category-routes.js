const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // TODO:  find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', (req, res) => {
  // TODO: find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // TODO:  create a new category
});

router.put('/:id', (req, res) => {
  // TODO: update a category by its `id` value
});

router.delete('/:id', (req, res) => {
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