const express = require("express");
const DbProduct = require("../model/Product");
const Category = require("../model/Category");
const TopProduct = require("../model/TopProducts");
const CarouselProduct = require("../model/CarouselProducts");
const fileUpload = require('../middleware/fileUpload')
const auth = require('../middleware/auth')
const router = express.Router();

/* GET home page. */
router.get("/", auth, async (req, res) => {
  try {
    const product = await DbProduct.find();
    const topProduct = await TopProduct.find();
    const category = await Category.find();
    const carouselProduct = await CarouselProduct.find();

    res.render("admin/admin", {
      title: "Admin sahifa",
      product,
      topProduct,
      category,
      carouselProduct,
    });
  } catch (error) {
    console.log(error);
  }
});


router.post('/topProducts', auth, fileUpload.single('img'), async (req, res) => {
  const topProducts = new TopProduct({
    name: req.body.name,
    img: req.file.filename
  })
  await topProducts.save()
  res.redirect('/')
})



router.post('/addSlider',auth, fileUpload.single('img'), async (req, res) => {
  const ProductCarousel = new CarouselProduct({
    name: req.body.name,
    price: req.body.price,
    img: req.file.filename
  })

  await ProductCarousel.save()

  res.redirect('/')
})

module.exports = router;
