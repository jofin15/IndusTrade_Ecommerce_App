export function addToCart(items) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/cart',{
        method:"POST",
        body:JSON.stringify(items),
        headers:{"content-type":"application/json"}
      });
  
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }


  export function updateCart(update) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/cart/'+update.id,{
        method:"PATCH",
        body:JSON.stringify(update),
        headers:{"content-type":"application/json"}
      });
  
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }

  export function deleteItemFromCart(id) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/cart/'+id,{
        method:"DELETE",
        body:JSON.stringify(id),
        headers:{"content-type":"application/json"}
      });
  
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }




  export function fetchItemsByUserId(id) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/cart?user='+id);
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }


  export  function  resetCart(userId) {
    return new Promise(async (resolve) =>{
    const response=await fetchItemsByUserId(userId)
    const items=response.data 
    console.log("cart items which are in backend:- ",items);
    // for (let item in items){
    //   console.log("before delete",item.id);
    //   await deleteItemFromCart(item.id)
    //   console.log("after delete",item);
    // }
    items.map((item)=>{
      console.log("before delete ",item.id);
      deleteItemFromCart(item.id)
      console.log("item all are deleted");
    })
    resolve({status:"Success"})
  });
  }




  
  
