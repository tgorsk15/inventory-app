const db = require("../db/queries")


exports.allItemsGet = async (req, res) => {
    await db.allItemsGet();
    res.render("items", {
        title: 'Items'
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

