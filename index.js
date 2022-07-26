const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;


const uri =
  "mongodb+srv://practice:89WXtDS6BAUtRk0K@cluster0.ycnng.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// services
// FoodExpress
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("FoodExpress").collection("services");

    // get user
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // post user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      // console.log("success" , req)
      res.send(result);
    });

    // delete user id

    app.delete("/user/:id", async (req, res) => {
     const id = req.params.id;
     const query = {_id:ObjectId(id)} 
     const result = await userCollection.deleteOne(query);
     res.send(result);
    });








  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.get("/user/:id", (req, res) => {
//   // res.send("finishing user");
//   const id = req.params.id;
//   const user = users.find (u => u.id == id);
//   res.send(user);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
