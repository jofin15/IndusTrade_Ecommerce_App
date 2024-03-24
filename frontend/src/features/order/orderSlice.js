import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './orderAPI';

export const createOrderAsync = createAsyncThunk(
    'counter/createOrder',
    async (order) => {
      const response = await createOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
    );

    export const fetchAllOrderAsync = createAsyncThunk(
      'counter/fetchAllOrders',
      async ({pagination,sort}) => {
        const response = await fetchAllOrders(pagination,sort);
        console.log("order pagination response:-",response.data);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      }
      );
    

    export const updateOrderAsync = createAsyncThunk(
      'counter/updateOrder',
      async (pagination) => {
        const response = await updateOrder(pagination);
        console.log("order pagination response:-",response.data);
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

        .addCase(updateOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          const index=state.orders.findIndex(order=>order.id===action.payload.id)
          state.orders[index]=action.payload;
        }) 
    },
  });

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
