const db = require("../db/queries")


exports.allItemsGet = async (req, res) => {
    const items = await db.allItemsGet();
    res.render("items", {
        title: 'Items',
        items: items
    })
}

exports.newItemGet = async (req, res) => {
    res.render("newItem", {
        title: "Add Item"
    })
}

exports.newItemPost = async (req, res) => {
    const content = req.body;
    console.log(content)
    await db.addNewItem(content)
    res.redirect("/")
}

