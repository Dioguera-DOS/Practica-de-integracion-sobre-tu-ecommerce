console.log('teste')

const getAllProducts = async()=>{
    let result = await fetch('http://localhost:3000/api/products', {method:'get'})
    console.log(result)
    let dataProd = await result.json()

}

//getAllProducts()