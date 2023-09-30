import { createSlice } from "@reduxjs/toolkit";
let WishList = createSlice({
    name : "add-wish-list",
    initialState : [],
    reducers : {
        AddToWishList : (state , action) => {
            let find = state.find((produc)=> produc.id === action.payload.id);
            if(!find) {
                return [...state , action.payload];
            }
        },
        removeFromWishlist : (state , action) => {
            return state.filter(produc => {
                return produc.id !== action.payload.id;
            });
        }
    }
})
export default WishList.reducer;
export let { AddToWishList , removeFromWishlist} = WishList.actions;