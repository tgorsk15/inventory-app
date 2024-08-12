const pool = require("./pool");


async function allItemsGet() {
    const { rows } = await pool.query(`SELECT * FROM items`)
    return rows
}

async function allCategoriesGet() {
    const { rows } = await pool.query(`SELECT * FROM categories`)
    return rows
}

async function findCategory(categoryId) {
    // console.log('searching category')
    const { rows } = await pool.query(`
            SELECT * FROM categories
            WHERE id = $1
        `, [categoryId])
    return rows[0]
}



async function findItemsInCategory(categoryId) {
    const { rows } = await pool.query(`
            SELECT * FROM item_categories
            JOIN items ON item_id = id
            WHERE category_id = $1
        `, [categoryId])
    return rows
}

async function addNewItem(content) {
    console.log(content)
}


module.exports = {
    allItemsGet,
    allCategoriesGet,
    addNewItem,
    findCategory,
    findItemsInCategory
}