const { Router } = require("express");
const mongoose = require("mongoose");
const DbProduct = require("../model/Product");
const Category = require("../model/Category");
const TopProducts = require("../model/TopProducts");
const CarouselProducts = require("../model/CarouselProducts");
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/fileUpload");
const toDelete = require("../middleware/delete");

const router = Router();

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    const products = await DbProduct.find();
    const topProduct = await TopProducts.find();
    const CarouselProduct = await CarouselProducts.find();
    res.render("index", {
      title: "Express",
      category,
      products,
      topProduct,
      CarouselProduct,
    });
    // console.log(category);
  } catch (error) {
    console.log(error);
  }
});

router.get("/category/:id", async (req, res) => {
  const products = await Category.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "categoryId",
        as: "products",
      },
    },
    {
      $unwind: {
        path: "$products",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
        },
        products: {
          $push: "$products",
        },
      },
    },
  ]);

  const prod = products[0];
  const prood = prod.products;
  // console.log();

  // if (products.length) {
  //     products = products
  //     console.log(products);
  // } else {
  //     products = ''
  // }
  // console.log(products);
  const category = await Category.find();
  res.render("categories", {
    title: "Category",
    prood,
    category,
  });
});

router.get("/delete/:id", auth, (req, res) => {
  const Id = { _id: req.params.id };
  Category.deleteOne(Id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/deleteCarouselProduct/:id", auth, async (req, res) => {
  const { img } = await DbProduct.findById(req.params.id);
  toDelete(img);
  const Id = { _id: req.params.id };
  CarouselProducts.deleteOne(Id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/deleteTop/:id", auth, (req, res) => {
  const Id = { _id: req.params.id };
  TopProducts.deleteOne(Id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/deleteBySubscribes/:id", auth, async (req, res) => {
  const { img } = await DbProduct.findById(req.params.id);
  toDelete(img);
  const Id = { _id: req.params.id };
  DbProduct.deleteOne(Id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});
router.get("/updateBySubscribes/:id", auth, async (req, res) => {
  const category = await Category.find();
  DbProduct.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin/updateProducts", {
        title: "Category Update",
        data,
        category,
      });
    }
  });
});

router.post(
  "/updateBySubscribs/:id",
  auth,
  fileUpload.single("img"),
  async (req, res) => {
    const Update = {};
    (Update.name = req.body.name),
      (Update.price = req.body.price),
      (Update.select = req.body.select),
      (Update.img = req.file.filename),
      (Update.more = req.body.more);

    const categoryId = { _id: req.params.id };

    await DbProduct.updateOne(categoryId, Update, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin");
      }
    });
  }
);

router.get("/update/:id", auth, (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("updateCategory", {
        title: "Category Update",
        data,
      });
    }
  });
});

router.post("/update/:id", auth, async (req, res) => {
  const Update = {};
  Update.category = req.body.category;

  const categoryId = { _id: req.params.id };

  Category.updateOne(categoryId, Update, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin");
    }
  });
});

router.post("/getUsers", async (req, res) => {
  let payload = req.body.payload.trim();
  let search = await DbProduct.find({
    name: {
      $regex: new RegExp("^" + payload + ".*", "i"),
    },
  }).exec();
  search = search.slice(0, 10);
  res.send({
    payload: search,
  });
});

router.get("/products/:id", (req, res) => {
  DbProduct.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("more", {
        title: "Batafsil",
        data,
      });
    }
  });
});

module.exports = router;
