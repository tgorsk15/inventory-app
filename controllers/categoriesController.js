const db = require('../db/queries')


exports.allCategoriesGet = async (req, res) => {
    const categories = await db.allCategoriesGet()
    return categories
}

exports.findCategoryGet = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        // const categoryId = parseInt(initialId)
        console.log('categoryId type:', typeof categoryId)
        console.log('here is id', categoryId)
        // for rendering sidebar:
        const categories = await db.allCategoriesGet()
        console.log(categories)

        
        const chosenCategory = await db.findCategory(categoryId)
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