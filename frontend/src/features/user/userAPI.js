export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      console.log("my user id in fectch logged in user",userId);
      const response = await fetch('http://localhost:8081/users/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }


  export function updateUser(updateUser) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/users/'+updateUser.id,{
        method:"PATCH",
        body:JSON.stringify(updateUser),
        headers:{"content-type":"application/json"}
      }) 
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }


  export function fetchOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/orders?user1.id='+userId)
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }