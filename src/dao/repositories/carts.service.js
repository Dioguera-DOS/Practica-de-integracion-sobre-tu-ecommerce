const cartsModel = require('../models/carts.model');

class CartsDAO{
    async create(){
        try {
            //return await cartsModel.create({products:[]})
            return await cartsModel.create()
        } catch (error) {
            console.log(error.message)
            return null
            
        }
    }
    async getCarts(){
        try {
            return await cartsModel.find({})
        } catch (error) {
            console.log(error.message)
            
        }
    }
    async getById(id){
        try {
            return await cartsModel.findOne({_id:id}).populate("products.product").lean()
        } catch (error) {
            console.log(error.message)
            return null
            
        }

    }

    async update(id, cart){
        try {
            return await cartsModel.updateOne({_id:id}, cart)
        } catch (error) {
            console.log(error.message)
            return null
            
        }

    }

    async deleteAll(){
        try {
            return await cartsModel.deleteMany({})
        } catch (error) {
            console.log(error.message)
            
        }
    }
}


module.exports = {CartsDAO}