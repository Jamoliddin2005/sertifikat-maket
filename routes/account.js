var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const Category = require('../model/Category')

/* GET users listing. */
router.get('/', auth, async function (req, res, next) {
    const category = await Category.find()
    res.render('account/account', {
        title: 'Account',
        category,
    })
});



router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})


module.exports = router;