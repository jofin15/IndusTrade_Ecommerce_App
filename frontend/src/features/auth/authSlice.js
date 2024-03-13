import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { checkUser, createUser, signout } from "./authAPI"

export const createUserAsync=createAsyncThunk(
    "user/createUser",
    async(userData)=>{
        const response=await createUser(userData)
        return response.data
})

export const checkUserAsync=createAsyncThunk(
    "user/checkUser",
    async(loginInfo)=>{
        const response=await checkUser(loginInfo)
        return response.data
})

export const signOutAsync=createAsyncThunk(
    "user/signout",
    async()=>{
        const response=await signout()
        return response.data
})


const initialState={
    loggedInUser:null,
    status:"idle",
    error:null
}

export const createUserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(createUserAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.loggedInUser=action.payload;
        })

        .addCase(checkUserAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.loggedInUser=action.payload
        })
        .addCase(checkUserAsync.rejected,(state,action)=>{
            state.status="idle";
            state.error=action.error.message
        })


        .addCase(signOutAsync.pending,(state)=>{
            state.status="loading";
        })
        .addCase(signOutAsync.fulfilled,(state,action)=>{
            state.status="idle";
            state.loggedInUser=null;
        })
    }

})
export const selectUser=(state)=>state.auth.loggedInUser
export const selectError=(state)=>state.auth.error
export default createUserSlice.reducer