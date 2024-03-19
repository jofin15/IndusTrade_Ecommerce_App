import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

export const createOrderAsync = createAsyncThunk(
    'counter/createOrder',
    async (order) => {
      const response = await createOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
    );

const initialState = {
    orders: [],
    status: 'idle',
    currentOrder:null,
    totalOrders:0
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      resetOrder:(state)=>{
        state.currentOrder=null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.currentOrder=action.payload
        
        }) 
    },
  });

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
