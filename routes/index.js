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
indexRouter.post("/updateItem/:itemId", itemsController.updateItemPost)

// updating categories
indexRouter.get("updateCategory/categoryId", categoriesController.updateCategoryGet)

// deleting items
indexRouter.get("/deleteItem/:itemId", itemsController.deleteItemGet)

module.exports = indexRouter

