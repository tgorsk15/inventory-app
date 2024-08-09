const { Router } = require('express');
const indexRouter = Router();

const itemsController = require("../controllers/itemsController")
const brandsController = require("../controllers/brandsController")
const categoriesController = require("../controllers/categoriesController")

indexRouter.get("/", itemsController.allItemsGet)



module.exports = indexRouter