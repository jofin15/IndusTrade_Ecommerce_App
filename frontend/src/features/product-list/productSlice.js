import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { createProduct, fetchBrands, fetchCategories, fetchProduct, fetchProductById, fetchProducts, updateProduct } from "./productAPI"
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

export const fetchProductsByFilterAsync=createAsyncThunk(
    "products/fetchProducts",
async({pagination,filter,sort})=>{
const response=await fetchProducts(pagination,filter,sort)
console.log("response all fetched product data",response.data);
return response.data
})

export const fetchProductByIdAsync=createAsyncThunk(
    "products/fetchProductById",
async(id)=>{
const response=await fetchProductById(id)
console.log("response selected fetched product data",response.data);
return response.data
})


export const createProductAsync=createAsyncThunk(
    "product/createProduct",
    async(product)=>{
        const response=await createProduct(product)
        console.log("response createProduct data",response.data);
        return response.data
})

export const updateProductAsync=createAsyncThunk(
    "product/updateProduct",
    async(update)=>{
        const response=await updateProduct(update)
        console.log("response createProduct data",response.data);
        return response.data
})


const initialState={
    brand:[],
    category:[],
    products:[],
    selectedProduct:[],
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

        .addCase(fetchProductsByFilterAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchProductsByFilterAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.products=action.payload;
        })


        .addCase(fetchProductByIdAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.selectedProduct=action.payload;
        })


        .addCase(createProductAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(createProductAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.products.push(action.payload);
        })
        .addCase(createProductAsync.rejected,(state,action)=>{
            state.status="idle";
            state.products=action.error;


        })
        .addCase(updateProductAsync.pending,(state,action)=>{
            state.status="Loading";
            
        })

        .addCase(updateProductAsync.fulfilled,(state,action)=>{
            state.status="idle";
            const index=state.products.findIndex((item)=>item.id===action.payload.id)
            state.products[index]=action.payload;
        })

    }

})
export const selectBrands=(state)=>state.product.brand
export const selectCategories=(state)=>state.product.category
export const selectProducts=(state)=>state.product.products
export const selectedProductById=(state)=>state.product.selectedProduct


export default productSlice.reducer 