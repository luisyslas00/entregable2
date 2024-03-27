const express = require('express')
const {ProductManager} = require('./ProductManager')
const path = '../database.json'
const app = express()

const productManager = new ProductManager(path)
const products = productManager.getProducts()

//Se muestran los productos en la ruta '/products', además se trabaja con query ?limit
app.get('/products',async (req,res)=>{
        try{
            const productsDB = await products
            const {limit} = req.query
            if(limit>10)return res.send(productsDB)
            const productsFilter = productsDB.slice(0,limit)
            res.send(productsFilter)
        }
        catch(error){
            console.log(error)
        }
    }
)
//Param por su id
app.get('/products/:pid',async(req,res)=>{
    try{
        const productsDB = await products
        const {pid} = req.params
        const productSearch = productsDB.find(producto=>producto.id===Number(pid))
        res.send(productSearch)
    }
    catch(error){
        console.log(error)
    }
})

app.listen(8080,()=>{
    console.log('Escuchando el servidor')
})