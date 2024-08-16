const pool = require("./pool");


async function allItemsGet() {
    const { rows } = await pool.query(`SELECT * FROM items`)
    return rows
}

async function findItemById(itemId) {
    const { rows } = await pool.query(`
            SELECT * FROM items
            WHERE id = $1
        `, [itemId])
    return rows[0]
}

async function allCategoriesGet() {
    const { rows } = await pool.query(`SELECT * FROM categories`)
    return rows
}

async function findCategoryById(categoryId) {
    const { rows } = await pool.query(`
            SELECT id FROM categories
            WHERE id = $1
        `, [categoryId])
    return rows[0]
}

async function findCategoriesByName(namesArray) {
    const { rows } = await pool.query(`
            SELECT id FROM categories
            WHERE name = ANY($1)
        `, [namesArray])
    return rows
}


async function findItemsInCategory(categoryId) {
    const { rows } = await pool.query(`
            SELECT * FROM item_categories
            JOIN items ON item_id = id
            WHERE category_id = $1
        `, [categoryId])
    return rows
}

async function findCategoriesWhereItemExists(itemId) {
    const { rows } = await pool.query(`
            SELECT * FROM item_categories
            JOIN categories ON category_id = id
            WHERE item_id = $1
            
        `, [itemId])
    return rows
}

async function addNewItem(selectedCategories, newItem) {
    const categoryResults = await findCategoriesByName(selectedCategories)

    const insertItem = await pool.query(`
            INSERT INTO items (name, in_stock, price, image_url)
            VALUES
                ($1, $2, $3, $4);
        `, [newItem.itemName, newItem.units, newItem.price, newItem.itemImg])

    const { rows } = await pool.query(`
            SELECT id FROM items
            WHERE name = $1
        `, [newItem.itemName])

    categoryResults.forEach(async category => {
        console.log('here is item', rows[0].id)
        console.log('categoryId:', category.id)
        const referenceInsert = await pool.query(`
            INSERT INTO item_categories (item_id, category_id)
            VALUES
                ($1, $2)
        `, [rows[0].id, category.id])
    })
}

async function addNewCategory(newCategory) {
    console.log('adding new cat')
    console.log(newCategory)
    const insertCategory = await pool.query(`
            INSERT INTO categories (name, founder)
            VALUES
                ($1, $2)

        `, [newCategory.categoryName, newCategory.founderName])
}

module.exports = {
    allItemsGet,
    findItemById,
    allCategoriesGet,
    findCategoriesWhereItemExists,
    addNewItem,
    findCategoryById,
    findCategoriesByName,
    findItemsInCategory,
    addNewCategory
}