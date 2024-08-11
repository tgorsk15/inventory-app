const { Router } = require('express');
const indexRouter = Router();

const itemsController = require("../controllers/itemsController")
const brandsController = require("../controllers/brandsController")
const categoriesController = require("../controllers/categoriesController");

indexRouter.get("/", itemsController.allItemsGet)

// item form handler
indexRouter.get("/newitem", itemsController.newItemGet)
indexRouter.post("/newitem", itemsController.newItemPost)

// category link handler
indexRouter.get("/category/:categoryId", categoriesController.findCategoryGet)

module.exports = indexRouter