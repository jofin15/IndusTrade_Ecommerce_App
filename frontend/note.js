const newPromise=new Promise((resolve,reject)=>{
    console.log("your data is getting requested")

    setTimeout(() => {
        async function fetchData(){
            try {   
                const response=await fetch("https://jsonplaceholder.typicode.com/users")
                const data=await response.json()
                resolve(data)
                }
             catch (error) {
                reject(error)
                console.log("data is not there");
            }
        }
        fetchData()  


    }, 3000);
  
})


newPromise.then((data)=>{
    console.log(data)
})
.catch((error)=>{
console.log(error);
})
