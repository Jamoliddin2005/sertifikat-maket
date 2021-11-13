const express = require('express');
const DbProduct = require('../model/Product')
const Category = require("../model/Category");
const auth = require('../middleware/auth')
const fileUpload = require('../middleware/fileUpload')
const router = express.Router();

/* GET home page. */
router.get('/', auth, async function (req, res, next) {
    const category = await Category.find();
    res.render('admin/add', {
        title: 'Category',
        category
    });
});

router.post('/', auth, async (req, res) => {
    const db = new Category({
        category: req.body.category,
    })
    await db.save()
    res.redirect('/')
})






module.exports = router;