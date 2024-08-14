const db = require('../db/queries')
const asyncHandler = require("express-async-handler")

const { body, validationResult } = require("express-validator");
// TMW 8/14: start incorporating form validation
// using asyncHandler

const validateUser = [
    
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

exports.newCategoryPush = async (req, res) => {
    console.log(req.body)
    await db.addNewCategory(req.body)
    res.redirect("/")
}