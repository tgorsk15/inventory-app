const db = require("../db/queries")


exports.allItemsGet = async (req, res) => {
    await db.allItemsGet();
    res.render("items", {
        title: 'Items'
    })
}

