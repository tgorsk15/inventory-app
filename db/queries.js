const pool = require("./pool");


async function allItemsGet() {
    console.log('here are the items')
    const { rows } = await pool.query(`SELECT * FROM items`)
    console.log(rows)
    return rows
}

async function addNewItem(content) {
    console.log(content)
}


module.exports = {
    allItemsGet,
    addNewItem
}