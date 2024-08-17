const db = require('../db/queries')
const asyncHandler = require("express-async-handler")

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

        console.log(req.body)
        await db.addNewCategory(req.body)
        res.redirect("/")
    } 
]

exports.updateCategoryGet = async (req, res) => {
    console.log(req.body)
    res.render("updateCategory", {
        title: 'update'
    })
}

exports.updateCategoryPush = [
    validateCategory,
    async (req,res) => {

    }
]
    
