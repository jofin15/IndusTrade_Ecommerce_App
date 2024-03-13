import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { fetchBrands, fetchCategories } from "./productAPI"
import { useSelector } from "react-redux";

export const fetchBrandAsync=createAsyncThunk(
    "products/fetchBrands",
async()=>{
const response=await fetchBrands()
console.log("response brand data",response.data);
return response.data
})


export const fetchCategoryAsync=createAsyncThunk(
    "products/fetchCategory",
async()=>{
const response=await fetchCategories()
console.log("response category data",response.data);
return response.data
})


const initialState={
    brand:[],
    category:[],
    status:"idle",

}

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBrandAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchBrandAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.brand=action.payload;
        })


        .addCase(fetchCategoryAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchCategoryAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.category=action.payload;
        })
    }

})
export const selectBrands=(state)=>state.product.brand
export const selectCategories=(state)=>state.product.category

export default productSlice.reducer 