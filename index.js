const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://smart-deals-server-side:Fp7V85yQDId7CifR@cluster0.9a0hyyx.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

async function run() {
  try {
    await client.connect();

    const productsDB = client.db("smart_deal");
    const productsCollection = productsDB.collection("products");
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      u88;
      const updatedProducts = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: { Name: updatedProducts.Name, Price: updatedProducts.Price },
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// smart-deals-server-side
// Fp7V85yQDId7CifR
