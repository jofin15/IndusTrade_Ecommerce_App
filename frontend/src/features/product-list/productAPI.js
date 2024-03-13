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