export function fetchBrands(){
    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/brands")
        const data=await response.json()
        resolve({data})
    })
}


export function fetchCategories(){
    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/category")
        const data=await response.json()
        resolve({data})
    })
}

export function fetchProducts(pagination,filter,sort){

    let querySelector=""
    console.log("my paginated value:",pagination)

    for(let key in filter){
        const categoryValues=filter[key]
        if (categoryValues.length>0){
            const lastCategoryValue=categoryValues[categoryValues.length-1];
            console.log("last category value",lastCategoryValue);
            querySelector+=`${key}=${lastCategoryValue}&`;
        }  
    }

    for (let key in sort){
        querySelector+=`${key}=${sort[key]}&` 
       }

    for (let key in pagination){
        querySelector+=`${key}=${pagination[key]}&` 
       }

    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/products?"+querySelector)
        const data=await response.json()
        resolve({data})
    })
} 


export function fetchProductById(id){
    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/products?id="+id)
        const data=await response.json()
        resolve({data})
    })
}

export function createProduct(product){
    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/products",{
            method:"POST",
            body:JSON.stringify(product),
            headers:{"content-type":"application/json"}
            
        })
        const data=await response.json()
        resolve({data})
    })
}


export function updateProduct(update){
    return new Promise(async (resolve,reject)=>{
        const response= await fetch("http://localhost:8081/products/"+update.id,{
            method:"PATCH",
            body:JSON.stringify(update),
            headers:{"content-type":"application/json"}
            
        })
        const data=await response.json()
        resolve({data})
    })
}

