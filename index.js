const express = require('express');
const cors = require('cors');

require('dotenv').config()

const app = express();

const ObjectedId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cetyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('TravellData');
        const servicesCollection = database.collection('services');
        const doc = {
            name: "nayim",
            email: "hnaim51@gmail.com"
        }
        const result = await servicesCollection.insertOne(doc);
        
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('my server ready to use nicely.')
})

app.listen(port, () => {
    console.log('listning to port', port)
})