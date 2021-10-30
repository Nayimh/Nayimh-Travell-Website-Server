const express = require('express');
const cors = require('cors');

require('dotenv').config()

const app = express();

const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');


const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// uri 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cetyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('TravellData');
        const servicesCollection = database.collection('services');
        const orderCollection = database.collection('order');
        
        // GET API package
        app.get('/package', async (req, res) => {
            const cursor = servicesCollection.find({});
            const package = await cursor.toArray();
            res.send(package);
        })

        // GET SINGLE SERVICE package
        app.get('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })


        // POST API package
        app.post('/package', async (req, res) => {
            const package = req.body;
            
            const result = await servicesCollection.insertOne(package);
            res.json(result);
        })

        // Order post api
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result)
        })

        // Order get api
        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const cursor = orderCollection.find({});
            const orders = await cursor.toArray();
            const userOrder = orders.filter((mail) => mail.email === email);
            res.send(userOrder)
        })

        // Get All Order
        app.post('/allorders', async (req, res) => {
            const cursor = orderCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })

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