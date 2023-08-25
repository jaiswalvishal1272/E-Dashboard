const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json());
app.use(cors());

// Register API
app.post("/register", async (req, resp) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

// Login API
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    }
    else {
      resp.send({ result: "No user found" });
    }
  }
  else {
    resp.send({ result: "No user found" });
  }
});

// Add Product API
app.post("/add-product", async (req, resp) => {
 let product = new Product(req.body);
 let result = await product.save();
 resp.send(result);
});

// get product list API
app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if(products.length > 0) {
    resp.send(products);
  }
  else {
    resp.send({result: "No Products Found."})
  }
});

// get product list for particular user API
app.get("/products/:id", async (req, resp) => {
  let products = await Product.find({userId:req.params.id});
  if(products.length > 0) {
    resp.send(products);
  }
  else {
    resp.send({result: "No Products Found."})
  }
});


// Delete Product API
app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({_id:req.params.id});
  resp.send(result);
});

// get single product API through id
app.get("/product/:id", async (req, resp) => {
  const product = await Product.findOne({_id:req.params.id});
  if(product) {
    resp.send(product);
  }
  else {
    resp.send({result:"No Record found"});
  }
});
// update Product API
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  resp.send(result);
});

// search product API
app.get("/search/:id/:key", async (req, resp) => {
  let products = await Product.find({
    userId: req.params.id,
    "$or": [
      {
        name: { $regex: req.params.key }
      },
      {
        company: { $regex: req.params.key }
      },
      {
        category: { $regex: req.params.key }
      }
    ]
  });
  resp.send(products);
})

// Demo API
app.get("/", (req, resp) => {
  resp.send("this page is working fine");
  console.log("console is working fine");
});

app.listen(5001);
