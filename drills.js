require('dotenv').config()
const knex= require('knex')

const knexInstance= knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function itemsThatContainText(searchTerm) {
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

itemsThatContainText('burger')

function paginateList(pageNumber) {
    const productsPerPage= 6;
    const offset= productsPerPage * (pageNumber - 1)

    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateList(3)

function itemsByDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(results)
        })
}

itemsByDate(5)

function costPerCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

costPerCategory()