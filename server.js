const express=require('express');
const app = express();
const mongoose=require("mongoose");
const product = require('./model/productmodel')
app.use(express.json());



app.get("/product", async(req, res)=>{
    try{
     const products= await product.find({})
     res.status(200).json(products);
    }
    catch(err){
     res.status(500).json({message:err.message})
    }
})

app.get("/product/:id", async(req, res)=>{
    try{
        const {id}= req.params;
     const produ= await product.findById(id);
     res.status(200).json(produ);
    }
    catch(err){
     res.status(500).json({message:err.message})
    }
})

app.delete("/product/:id", async(req, res)=>{
    try{
        const {id}= req.params;
     const produ= await product.findByIdAndDelete(id);
     if(!produ){
        return res.status(404).json({ message: "No product found with that id" });
        }
     res.status(200).json(produ);
    }
    catch(err){
     res.status(500).json({message:err.message})
    }
})



app.put("/product/:id", async(req, res)=>{
    try{
        const {id}= req.params;
     const produ= await product.findByIdAndUpdate(id, req.body)
     if(!produ){
     return res.status(404).json({ message: "No product found with that ${id}" });
     }
     const  updatedProduct = await product.findById(id)
     res.status(200).json(updatedProduct);
    }
    catch(err){
     res.status(500).json({message:err.message})
    }
})

 app.post("/product", async(req, res) =>{
    try{
      const prod=await product.create(req.body)
      res.status(200).json(prod);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 })


mongoose
.connect("mongodb+srv://<username>:<password>@cluster0.nipvn5z.mongodb.net/NODEAPI?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Mongodb connected successfully!");
    app.listen(3000, ()=>{
        console.log("NODE API RUNNING ON SERVER 3000")
    })
    
}).catch((err) => {
    console.log(err);
})