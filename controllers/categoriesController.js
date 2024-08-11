const db = require('../db/queries')


exports.allCategoriesGet = async (req, res) => {
    const categories = await db.allCategoriesGet()
    return categories
}

exports.findCategoryGet = async (req, res) => {
    const categoryId = req.params.categoryId
    const chosenCategory = await db.findCategory(categoryId)
    console.log(chosenCategory)

    const categoryItems = await db.findItemsInCategory(categoryId)
    console.log(categoryItems)
    res.render("category", {
        chosenCategory: chosenCategory,
        categoryItems: categoryItems
    })
}