const db = require('../db/queries')

const { body, validationResult } = require("express-validator");

const lengthError = 'Category name must be between 3 and 25 characters long'

const validateCategory = [
    // check that category name hasn't already been used
    body("categoryName").trim()
        .custom(async (value, { req }) => {
            console.log(req.body)
            const categories = await db.allCategoriesGet()
            categories.forEach(category => {
                if (category.name === value) {
                    throw new Error('This category already exists, try another!')
                }
            })
        }),
    body("categoryName").trim()
        .isLength({ min: 3, max: 25 }).withMessage(lengthError),
    body("founderName").trim()
        .optional({values: "falsy"})
    
]

const validateCategoryUpdate = [
    body("categoryName").trim()
        .isLength({ min: 3, max: 25 }).withMessage(lengthError),
    body("founderName").trim()
        .optional({values: "falsy"})
]

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

        const categoryItems = await db.findItemsInCategory(categoryId)
        res.render("category", {
            categories: categories,
            chosenCategory: chosenCategory,
            categoryItems: categoryItems
        })
        
    } catch (error) {
        console.log(error)
    }
    
}

exports.newCategoryGet = async (req, res) => {
    res.render("newCategory", {
        title: "New Category"
    })
}


exports.newCategoryPush = [
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("newCategory", {
                title: "New Category",
                errors: errors.array()
            })
        };

        await db.addNewCategory(req.body)
        res.redirect("/")
    } 
]

exports.updateCategoryGet = async (req, res) => {
    const categoryId = req.params.categoryId
    const chosenCategory = await db.findCategoryById(categoryId)

    res.render("updateCategory", {
        title: `Update ${chosenCategory.name}`,
        chosenCategory: chosenCategory
    })
}

exports.updateCategoryPush = [
    validateCategoryUpdate,
    async (req,res) => {
        const errors = validationResult(req);
        const updatedCategory = req.body

        const categoryId = req.params.categoryId
        const oldCategory = await db.findCategoryById(categoryId)

        if (!errors.isEmpty()) {
            return res.status(400).render("updateCategory", {
                title: `Update ${oldCategory.name}`,
                chosenCategory: oldCategory,
                errors: errors.array()
            })
        };

        await db.updateCategory(updatedCategory, categoryId)
        res.redirect("/")
    }
]

exports.deleteCategoryGet = async (req, res) => {
    const categoryId = req.params.categoryId

    const results = await db.findItemsInCategory(categoryId)

    const oldCategory = await db.findCategoryById(categoryId)

    if (results.length > 0) {
        const deleteError = 'All items must be removed from category before deleting'

        const showPopUp = true

        return res.render("updateCategory", {
            title: `Update ${oldCategory.name}`,
            chosenCategory: oldCategory,
            deleteError: deleteError,
            showPopUp: showPopUp
        })
    }

    await db.deleteCategory(categoryId);
    await db.deleteCategoryReferences(categoryId);
    res.redirect("/")
}
    
