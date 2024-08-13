const db = require('../db/queries')


exports.allCategoriesGet = async (req, res) => {
    const categories = await db.allCategoriesGet()
    return categories
}

exports.findCategoryGet = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        // for rendering sidebar:
        const categories = await db.allCategoriesGet()
        
        const chosenCategory = await db.findCategoryById(categoryId)
        console.log('chosen', chosenCategory)

        const categoryItems = await db.findItemsInCategory(categoryId)
        console.log(categoryItems)
        res.render("category", {
            categories: categories,
            chosenCategory: chosenCategory,
            categoryItems: categoryItems
        })
        
    } catch (error) {
        console.log(error)
    }
    
}