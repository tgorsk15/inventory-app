const db = require("../db/queries")
const categoriesController = require("./categoriesController")


exports.allItemsGet = async (req, res, next) => {
    const items = await db.allItemsGet();
    const categories = await categoriesController.allCategoriesGet();
    console.log('first', categories);
    res.render("items", {
        title: 'Items',
        items: items,
        categories: categories
    })
    // next()
}

exports.newItemGet = async (req, res) => {
    res.render("newItem", {
        title: "Add Item"
    })
}

exports.newItemPost = async (req, res) => {
    const content = req.body;
    console.log(content)
    await db.addNewItem(content)
    res.redirect("/")
}

