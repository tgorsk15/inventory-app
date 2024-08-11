const pool = require("./pool");


async function allItemsGet() {
    console.log('here are the items')
    const { rows } = await pool.query(`SELECT * FROM items`)
    console.log(rows)
    return rows
}

async function allCategoriesGet() {
    console.log('here are categories')
    const { rows } = await pool.query(`SELECT * FROM categories`)
    return rows
}

async function findSingleCategory(categoryId) {
    console.log('found category')
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
    findSingleCategory
}