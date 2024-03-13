export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response=await fetch("http://localhost:8081/users",{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{"content-type":"application/json"}
        })
        const data=response.json()
        resolve({data})
    })
}


export function checkUser(loginInfo){
    return new Promise(async(resolve,reject)=>{
        console.log("logininfo",loginInfo);
        const email=loginInfo.email
        const password=loginInfo.password
        console.log("email",email);
        const response=await fetch("http://localhost:8081/users?email="+email)
        
        const data=await response.json()
        console.log("matched email id ",data);

        if(data.length){
            if(password===data[0].password){
                console.log("you are logged in ");
                resolve({data})
            }else{
                reject({message:"Worng Password"})
            }
        }else{
            reject({message:"User Not Found"})
        }
    })
}


export function signout(){
    return new Promise(async(resolve)=>{
        resolve({data:"success"})
    })
}
