const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

const uri = 'your-mongodb-connection-string';
const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

app.post('/api/addStudent', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("studentDB").collection("students");
    const result = await collection.insertOne(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});;
