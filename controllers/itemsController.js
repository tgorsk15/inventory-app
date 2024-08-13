const db = require("../db/queries")
const categoriesController = require("./categoriesController")


exports.allItemsGet = async (req, res, next) => {
    const items = await db.allItemsGet();
    const categories = await categoriesController.allCategoriesGet();
    res.render("items", {
        title: 'Items',
        items: items,
        categories: categories
    })
}

exports.newItemGet = async (req, res) => {
    const categories = await categoriesController.allCategoriesGet();
    res.render("newItem", {
        title: "Add Item",
        categories: categories
    })
}

exports.newItemPost = async (req, res) => {
    const newItem = req.body;
    console.log(newItem)
    const selectedCategories = Object.entries(newItem)
        .filter(([key,value]) => value === "on")
        .map(([key]) => key);
    await db.addNewItem(selectedCategories, newItem)
    res.redirect("/")
}

