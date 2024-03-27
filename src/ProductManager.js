const fs = require('fs')
const path = '../database.json'

class ProductManager{
    #products
    constructor(path){
        this.#products = []
        this.path = path
    }
    async addProduct(objeto){
        try{
            this.#products = await this.leerArchivo()
            const product = {
                id:this.#agregarId(),
                title:objeto.title,
                description:objeto.description,
                price:objeto.price,
                thumbnail:objeto.thumbnail,
                code:objeto.code,
                stock:objeto.stock
            }
            const {title,description,price,thumbnail,code,stock} = product
            if(title===""||description===""||price===0||thumbnail===""||code===""||stock===0){
                console.log("Rellenar correctamente los campos")
                return "Rellenar correctamente los campos"
            }
            let repite = this.#products.some(elemento=>{
                return elemento.code === code
            })
            if(repite){
                console.log("Código repetido")
                return "Código repetido"
            }else{
                this.#products.push(product)
                this.writeFile()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async getProducts(){
        try{
            this.#products = await this.leerArchivo()
            return this.#products
        }
        catch(error){
            console.log(error)
        }
    }
    async getProductById(identificador){
        try{
            this.#products = await this.leerArchivo()
            let buscar= this.#products.find(elemento =>{
                return elemento.id === identificador
            })
            if(buscar){
                console.log(buscar)
            }else{
                console.log("Not Found")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async updateProduct(id,objeto){
        try{
            this.#products = await this.leerArchivo()
            let existeProducto = this.#products.find(producto=>{
                return producto.id === id
            })
            if(existeProducto){
                const {id,title,description,price,thumbnail,code,stock}= objeto
                let nuevoProducto = {
                    id:existeProducto.id,
                    title:title||existeProducto.title,
                    description:description||existeProducto.description,
                    price:price||existeProducto.price,
                    thumbnail:thumbnail||existeProducto.thumbnail,
                    code:code||existeProducto.code,
                    stock:stock||existeProducto.stock
                }
                let buscarProducto = this.#products.findIndex(elemento=>{
                    return elemento.id === existeProducto.id
                })
                this.#products[buscarProducto] = nuevoProducto
                this.writeFile()
            }else{
                console.log("Producto con ID inexistente")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async deleteProduct(identificador){
        try{
            this.#products = await this.leerArchivo()
            let indexProduct = this.#products.findIndex(elemento=>{
                return elemento.id === identificador
            })
            if(indexProduct!==-1){
                this.#products.splice(indexProduct,1)
                this.writeFile()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async writeFile(){
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.#products,null,'\t'),'utf-8')
            console.log("Archivo guardado")
        }
        catch(error){
            console.log("Error")
        }
    }
    async leerArchivo(){
        try{
            let archivoJSON = await fs.promises.readFile(this.path,'utf-8')
            this.#products = JSON.parse(archivoJSON)
            return this.#products
        }
        catch(error){
            return []
        }
    }
    #agregarId(){
        if(this.#products.length ===0){
            return 1
        }
        return this.#products.at(-1).id + 1
    }
}
module.exports ={
    ProductManager
}

const product = new ProductManager(path)
//Algunos productos (objeto) para agregar al array products
const product1= {
    title:"Arroz",
    description:"Parboil",
    price:2200,
    thumbnail:"https://www.google.com.ar/",
    code:"ASHSEJ1928",
    stock:50
}
const product2 ={
    title:"Fideos",
    description:"Tallarines",
    price:990,
    thumbnail:"https://www.google.com.ar",
    code:"AKASJA28171",
    stock:100
}
const product3 ={
    title:"Gaseosa",
    description:"Pepsi",
    price:1200,
    thumbnail:"https://www.google.com.ar",
    code:"AKASJA28201",
    stock:100
}
const product4 ={
    title:"Puré de tomate",
    description:"Botella 1L",
    price:740,
    thumbnail:"https://www.google.com.ar",
    code:"AKASJAURHJ1",
    stock:100
}
const product5={
    title:"Servilletas",
    description:"3 rollos",
    price:2100,
    thumbnail:"https://www.google.com.ar",
    code:"ASIAUJSKA19",
    stock:100
}
const product6={
    title:"Carne Picada",
    description:"500 gr",
    price:2500,
    thumbnail:"https://www.google.com.ar",
    code:"ASIAUJSUAJ9",
    stock:20
}
const product7={
    title:"Agua",
    description:"Botella 2L",
    price:1100,
    thumbnail:"https://www.google.com.ar",
    code:"ASI982SKA19",
    stock:80
}
const product8={
    title:"Galletas Rumba",
    description:"Chocolate 160gr",
    price:800,
    thumbnail:"https://www.google.com.ar",
    code:"ASIAUJSK09SY",
    stock:70
}
const product9={
    title:"Mermelada",
    description:"Durazno",
    price:3000,
    thumbnail:"https://www.google.com.ar",
    code:"ASIAUJSLIKUS",
    stock:110
}
const product10={
    title:"Helado",
    description:"3 sabores",
    price:5000,
    thumbnail:"https://www.google.com.ar",
    code:"ASIAUJMNAJSU",
    stock:20
}

// product.addProduct(product1)
// product.addProduct(product2)
// product.addProduct(product3)
// product.addProduct(product4)
// product.addProduct(product5)
// product.addProduct(product6)
// product.addProduct(product7)
// product.addProduct(product8)
// product.addProduct(product9)
// product.addProduct(product10)