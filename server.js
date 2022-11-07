const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const port = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'drinkWater'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/',(request, response)=>{
    db.collection('drinkingWater').find().toArray()
    .then(data => {
        response.render('index.ejs')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || port, ()=>{
    console.log(`Server running on port ${port}`)
})