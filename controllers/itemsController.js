const db = require("../db/queries")
const asyncHandler = require("express-async-handler")
const categoriesController = require("./categoriesController")
const { body, validationResult } = require("express-validator")

const nameError = "Name must be between 3 and 25 characters"
const unitsError = "Max amount of units is 1 billion"



const validateItem = [
    body("itemName").trim()
        .isLength({ min: 3, max: 25 }).withMessage(`${nameError}`),
    body("units").trim()
    .isInt({max: 1000000000}).withMessage(`${unitsError}`),
    // checks if at least one category is selected:
    body().custom(async (value, { req }) => {
        const hasSelectedCategory = Object.values(req.body).some(value => value === 'on')

        if (!hasSelectedCategory) {
            throw new Error('At least one category needs to be selected')
        }


    })
    
]

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

// exports.newItemPost = async (req, res) => {
//     const newItem = req.body;
//     console.log(newItem)
//     const selectedCategories = Object.entries(newItem)
//         .filter(([key,value]) => value === "on")
//         .map(([key]) => key);
//     await db.addNewItem(selectedCategories, newItem)
//     res.redirect("/")
// }

exports.newItemPost = [
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        const categories = await categoriesController.allCategoriesGet();

        if (!errors.isEmpty()) {
            return res.status(400).render("newItem", {
                title: "Add Item",
                categories: categories,
                errors: errors.array()
            })
        };

        const newItem = req.body;
        console.log(newItem)

        if (req.body.itemName.length > 16) {

        }

        const selectedCategories = Object.entries(newItem)
            .filter(([key,value]) => value === "on")
            .map(([key]) => key);
        await db.addNewItem(selectedCategories, newItem)
        res.redirect("/")
    }
]


exports.updateItemGet = async (req, res) => {
    // need to figure out how to pass selected item into here
    const itemId = req.params.itemId
    console.log(itemId)

    const categories = await categoriesController.allCategoriesGet();
    const results = await db.findCategoriesWhereItemExists(itemId)
    const currentCategories = results.map(category => category.name)
    console.log(currentCategories)

    const chosenItem = await db.findItemById(itemId);
    console.log('here is chosen1', chosenItem)
    res.render("updateItem", {
        title: `${chosenItem.name}`,
        categories: categories,
        chosenItem: chosenItem,
        currentCategories: currentCategories
    })
}

exports.updateItemPost = [
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        const categories = await categoriesController.allCategoriesGet();
        
        
        const itemId = req.params.itemId;
        const item = req.body
        const oldItem = await db.findItemById(itemId)
        console.log('here is old', oldItem)
        
        const currentCategories = Object.entries(item)
            .filter(([key,value]) => value === "on")
            .map(([key]) => key);
        console.log('here is search item', item)

        if (!errors.isEmpty()) {
            return res.status(400).render("updateItem", {
                title: `${oldItem.name}`,
                categories: categories,
                chosenItem: oldItem,
                currentCategories: currentCategories,
                errors: errors.array()
            })
        };



        // replace item row in items
        const updatedItem = await db.updateItem(item, itemId)
        // AND update entries in item_categories
        const updatedReferences = await db.updateItemReferences(itemId, currentCategories)
        res.redirect("/")

    }
]


exports.deleteItemGet = async (req, res) => {
    const itemId = req.params.itemId
    console.log('here it is boys', itemId)

    await db.deleteItem(itemId)
    await db.deleteItemReferences(itemId)
    console.log('deleted')

    res.redirect("/")
}

