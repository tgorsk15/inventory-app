const { Router } = require('express');
const indexRouter = Router();

const itemsController = require("../controllers/itemsController")
const categoriesController = require("../controllers/categoriesController");

indexRouter.get("/", itemsController.allItemsGet)

// item form handler
indexRouter.get("/newitem", itemsController.newItemGet)
indexRouter.post("/newitem", itemsController.newItemPost)

// category link handler
indexRouter.get("/category/:categoryId", categoriesController.findCategoryGet)

// new category handler
indexRouter.get("/newCategory", categoriesController.newCategoryGet)
indexRouter.post("/newCategory", categoriesController.newCategoryPush)

//updating items
indexRouter.get("/updateItem/:itemId", itemsController.updateItemGet)

module.exports = indexRouter

