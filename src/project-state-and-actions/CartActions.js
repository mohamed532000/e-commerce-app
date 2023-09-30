import { createSlice } from "@reduxjs/toolkit";
let selectedProducts = createSlice({
    name : "addition",
    initialState : [],
    reducers : {
        AddToCart : (state , action) => {
            let find = state.find((product) => product.id === action.payload.id);
            if(find){
                find.quantity += 1;
            }else {
                state.push({...action.payload , quantity : 1});
            }
        },
        increment : (state , action) => {
            let product = state.find(produc => produc.id === action.payload.id);
            product ? product.quantity += 1 : console.log("not found");
        },
        decrement: (state, action) => {
            let newState = state.map(product => {
                if(product.id === action.payload.id) {
                    let updateProduct = {...product};
                    updateProduct.quantity -= 1
                    return updateProduct
                }
                return product
            });
            return newState;
        },
        deleteProduct : (state , action) => {
            return state.filter(product => {
                return product.id !== action.payload.id;
            })
        },
        clearCart: () => []
    }
})
export default selectedProducts.reducer;
export let { AddToCart , increment, decrement , deleteProduct , clearCart} = selectedProducts.actions;