const express = require('express');
const DbProduct = require('../model/Product')
const DbCategory = require('../model/Category')
const fileUpload = require('../middleware/fileUpload')
const auth = require('../middleware/auth')
const router = express.Router();

/* GET home page. */
router.get('/', auth, async function (req, res, next) {
  const category = await DbCategory.find()
  res.render('account/add', {
    title: 'Express',
    category
  });
  console.log(category);
});

router.post('/', auth, fileUpload.single("img"), async (req, res) => {
  const db = new DbProduct({
    name: req.body.name,
    price: req.body.price,
    more: req.body.more,
    categoryId: req.body.categoryId,
    img: req.file.filename
  })
  await db.save()
  res.redirect('/')
})


module.exports = router;