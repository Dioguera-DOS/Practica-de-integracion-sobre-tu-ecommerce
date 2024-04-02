const {Carts} = require('../dao/repositories/carts.service');
const Product = require('../dao/repositories/products.service');
const products = new Product();

const {CartsDAO} = require('../dao/repositories/carts.service');
const cartsServices = new CartsDAO();

const getcartsById = async (req, res) => {//
    let { cid } = req.params
    let carts = await cartsServices.getById(cid)

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({carts});
}

//get all carts.
// const getAllCarts = async (req, res) => {
//     try {
//         const carts = await cart.get({});
//         res.setHeader('Content-Type', 'application/json')
//         return res.status(200).json(carts);
//     } catch (error) {
//         res.status(500).json({ error: "Error de servidor" });
//     }

//     console.log('Controle Carts exitoso')

// }
//get carts by ID.

// const getCartsId = async (req, res) => {
//     let cartById
//     try {
//         const cartId = req.params.cid
//         cartById = await cart.getById(cartId)
//         console.log(cartById)
//         res.setHeader('Content-Type', 'application/json')
//         return res.status(200).json(cartById);
//     } catch (error) {
//         res.status(500).json({ error: "Error de servidor" });
//     }

//     console.log('Controle Carts exitoso')

// }

//create a cats
const createCarts = async (req, res) => {    
    try {
        let createCart = await cartsServices.create();
        let getCarts =  await cartsServices.getCarts();
        if (!getCarts) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ message: `Error al cargar tu carrito` });
        } else {
            res.status(201).json({carrito:getCarts});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}//revisar ese


const addProdTocart = async (req, res) => {
    //let { cartId, productId } = req.params
    // const cartId = req.params.cid;
    // const productId = req.params.pid;
    let {cid, pid} = req.params    
    try {
        const cartsServices = await cart.get(cid)
        console.log()
        //const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (!carts) {
            return { error: "Carrito no encontrado.", status: 404 };
        }
        let indexProduct = cartsServices.products.findIndex(p=>p.product._id===pid)

        if(indexProduct!==-1){
            carts.products[indexProduct].quantity++
        }else{
            carts.products.push({product:pid,quantity:1})
        }
        
        await cartsServices.update(cid, carts)

        // const productData = await products.getById(pid);

        // const productIndex = productData.findIndex(p => p.id === productId);

        // if (productIndex === -1) {
        //     return { error: "Producto no encontrado.", status: 400 };
        // }
        // const cartProductIndex = cart.products.findIndex(product => product.id === productId);
        // console.log(cartProductIndex)

        // if (cartProductIndex === -1) {
        //     cart.products.push({ id: productId, quantity: 1 });

        //     const updateCart = await cart.put({ cartId }, cart)
        //     console.log(updateCart)

        // } else {
        //     cart.products[cartProductIndex].quantity++;
        // }
        console.log(carts)
        return { message: "Producto agregado al carrito correctamente.", status: 200 };
    } catch (error) {
        console.error('Error al agregar producto al carrito!!!:', error.message);
        console.log(error.message);
        return { error: "Error al agregar producto al carrito.", status: 500 };
    }
}


//add product to cart
// const addProdTocart = async (req, res) => {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     try {
//         const carts = await cart.get(cartId)
//         //const carts = await cartsModel.find({_id:cartId})
//         const cartIndex = carts.findIndex(cart => cart.id === cartId);
//         if(cartIndex === -1) {
//             return { error: "Carrito no encontrado.", status: 404 };
//         }
//         const cart = carts[cartIndex];
//         const productData = await products.getById(productId);      
//         //const productData = await productosModel.find({_id:productId})

//         const productIndex = productData.findIndex(p => p.id === productId);       

//         if (productIndex === -1) {
//             return { error: "Producto no encontrado.", status: 400 };
//         }
//         const cartProductIndex = cart.products.findIndex(product => product.id === productId);
//         console.log(cartProductIndex)

//         if (cartProductIndex === -1) {
//             cart.products.push({ id: productId, quantity: 1 });

//             const updateCart = await cart.put({cartId }, cart)
//             console.log(updateCart)

//         } else {
//             cart.products[cartProductIndex].quantity++;
//         }
//         console.log(cart)
//         return { message: "Producto agregado al carrito correctamente.", status: 200 };
//     } catch (error) {
//         console.error('Error al agregar producto al carrito!!!:', error.message);
//         console.log(error.message);
//         return { error: "Error al agregar producto al carrito.", status: 500 };
//     }
// }

module.exports = {createCarts, addProdTocart, getcartsById}//getCartsId//getAllCarts