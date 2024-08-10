const { Client } = require('pg');
require('dotenv').config();

const resetTables = `
    DROP TABLE IF EXISTS item_categories;
    DROP TABLE IF EXISTS items CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
`

const createItems = `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 100 ) NOT NULL,
        in_stock INTEGER,
        price INTEGER NOT NULL,
        image_url VARCHAR ( 255 )
    );

    INSERT INTO items (name, in_stock, price, image_url)
    VALUES
        ('PRS SE Custom 24', 1, 1000, './imgs/prs-se-custom-24.jpg'),
        ('PRS SE DGT', 2, 600, './imgs/prs-se-dgt.jpg'),
        ('Ibanez Midnight', 3, 800, './imgs/ibanez-midnight.jpg'),
        ('Gretsch Electromatic Classic', 1, 700, './imgs/gretsch-electromatic-classic.jpg'),
        ('Les Paul 1959', 2, 1200, './imgs/gibson-lespaul-1959.jpg'),
        ('Fender Mustang', 3, 650, './imgs/fender-mustang'),
        ('Fender Kurt Cobain Jaguar', 1, 1800, './imgs/fender-cobain-jaguar.jpg')
        
`

const createCategories = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR ( 100 ) NOT NULL,
        founder VARCHAR ( 100 )
    );

    INSERT INTO categories (name, founder)
    VALUES
        ('Fender', 'Leo Fender'),
        ('Gibson', 'Orville Gibson'),
        ('PRS', 'Paul Reed Smith'),
        ('Gretsch', 'Friedrich Gretsch'),
        ('Ibanez', 'Hoshino Gakki')

`

const itemsToCategories = `
    CREATE TABLE IF NOT EXISTS item_categories (
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (item_id, category_id)
    );

    INSERT INTO item_categories (item_id, category_id)
    VALUES
        (1, 3),
        (2, 3),
        (3, 5),
        (4, 4),
        (5, 2),
        (6, 1),
        (7, 1)
`


async function main() {
    console.log('running tables')
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        })

        await client.connect()
        await client.query(resetTables);
        const items = await client.query(createItems)
        console.log(items)

        const categories = await client.query(createCategories)
        console.log(categories[0].rows)
        console.log('categories done')

        const itemToCategory = await client.query(itemsToCategories)
        console.log('created itemCategory table and inserted')

        await client.end();

    } catch (error) {
        console.log(error)
    }
}

main()