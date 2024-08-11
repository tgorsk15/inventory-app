const db = require('../db/queries')


exports.allCategoriesGet = async (req, res) => {
    const categories = await db.allCategoriesGet()
    return categories
}

exports.findCategoryGet = async (req, res) => {
    const categoryId = req.params.categoryId
    console.log('working?', categoryId)
    const chosenCategory = await db.findSingleCategory(categoryId)
    console.log(chosenCategory)
    res.render("category")
}