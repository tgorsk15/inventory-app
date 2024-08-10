// insert pool here
const pool = require("./pool");


async function allItemsGet() {
    console.log('here are the items')
}

async function addNewItem(content) {
    console.log(content)
}


module.exports = {
    allItemsGet,
    addNewItem
}