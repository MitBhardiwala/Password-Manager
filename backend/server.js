const express = require('express')
const app = express()
const port = process.env.port || 3000
var cors = require('cors')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
require('dotenv').config()

// Connection URL
const url=process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passop';
 

app.use(bodyparser.json());
app.use(cors())

//get passwords
app.get('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords')

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    res.json(findResult)
})


//save a passwors passwords
app.post('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const password = req.body
    const findResult = await collection.insertOne(password);
    console.log("request came")
    res.send({ success: true, result: findResult })
})

//delete a password
app.delete('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords')
    const password = req.body
    const findResult = await collection.deleteOne(password);
    console.log("request came")
    res.send({ success: true })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})