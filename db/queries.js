const pool = require("./pool");


async function allItemsGet() {
    const { rows } = await pool.query(`SELECT * FROM items`)
    console.log(rows)
    return rows
}

async function allCategoriesGet() {
    console.log('here are categories')
    const { rows } = await pool.query(`SELECT * FROM categories`)
    return rows
}

async function findCategory(currentCatId) {
    // console.log('searching category')
    const { rows } = await pool.query(`
            SELECT * FROM categories
            WHERE id = $1
        `, [currentCatId])
    return rows[0]
}



async function findItemsInCategory(currentCatId) {
    const { rows } = await pool.query(`
            SELECT * FROM item_categories
            JOIN items ON item_id = id
            WHERE category_id = $1
        `, [currentCatId])
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