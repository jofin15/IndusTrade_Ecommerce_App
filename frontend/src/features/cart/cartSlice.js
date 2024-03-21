import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteItemFromCart,fetchItemsByUserId, resetCart, updateCart } from './cartAPI';


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    console.log("my cart consist of ",response.data);
    return response.data;
  }
);
  


export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',    
  async (user) => {
    const userId=user[0]
    console.log("my user id :- ",userId.id);
    const response = await fetchItemsByUserId(userId.id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    console.log("updated cart :- ",update);
   const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
   const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
   const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

  const initialState = {
    cartItems: [],
    status: 'idle',
    
  };

export const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(updateItemAsync.pending,(state)=>{
        state.status="loading"
      })
      .addCase(updateItemAsync.fulfilled,(state,action)=>{
        state.status="idle";
        const index=state.cartItems.findIndex((item)=>item.id===action.payload.id)
        state.cartItems[index]=action.payload;
      })

      .addCase(deleteItemFromCartAsync.pending,(state)=>{
        state.status="loading"
      })
      .addCase(deleteItemFromCartAsync.fulfilled,(state,action)=>{
        state.status="idle";
        const index=state.cartItems.findIndex((item)=>item.id===action.payload.id)
        state.cartItems.splice(index,1)
      })

      .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
        state.status="loading"
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
        state.status="idle";
        state.cartItems=action.payload
      })

      .addCase(resetCartAsync.pending,(state)=>{
        state.status="loading"
      })
      .addCase(resetCartAsync.fulfilled,(state,action)=>{
        state.status="idle";
        state.cartItems=[]
      })
  },
});



export const selectCart = (state) => state.cart.cartItems;

export default addToCartSlice.reducer;