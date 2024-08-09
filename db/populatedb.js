const createItems = `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 100 ) NOT NULL,
        in_stock INTEGER,
        price INTEGER NOT NULL

    );

    INSERT INTO items (names, in_stock, price)
    VALUES
        (),
`

const createCategories = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 100 ) NOT NULL,
        founder VARCHAR ( 100 ),
    );

    INSERT INTO categories (name, founder)
    VALUES
        ('Fender', 'Leo Fender'),
        ('Gibson', 'Orville Gibson'),
        ('PRS', 'Paul Reed Smith'),
        ('Gretsch', 'Friedrich Gretsch')

    
`

const itemsToCategories = `
    CREATE TABLE IF NOT EXISTS item_categories (
        item_id INTEGER REFERENCES items(id),
        category_id INTEGER REFERENCES categories(id),
        PRIMARY KEY (item_id, category_id)
    )
`

async function main() {
    try {

    } catch (error) {
        
    }
}