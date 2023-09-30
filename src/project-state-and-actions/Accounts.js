import { createSlice } from "@reduxjs/toolkit";

// let addAccounts = createSlice({
//     name : "add-account",
//     initialState : [],
//     reducers : {
//         addAccount : (state , action) => {
//             let find = state.find((account)=> account.id === action.payload.id);
//             if(!find) {
//                 return [...state , action.payload];
//             }
//         }
//         // removeFromWishlist : (state , action) => {
//         //     return state.filter(produc => {
//         //         return produc.id !== action.payload.id;
//         //     });
//         // }
//     }
// })
// export default addAccounts.reducer;
// export let { addAccount } = addAccounts.actions;


let accounts = createSlice({
    name : "accounts",
    initialState : [],
    reducers : {
        add : (state , action) => {
            let find = state.find((account) =>
            account.name === action.payload.name &&
            account.email === action.payload.email &&
            account.userID === action.payload.userID);
            if(find){
                console.log("sorry")
            }else {
                state.push({...action.payload , userID : 1});
            }
        }
    }
});

export default accounts.reducer;
export let {add} = accounts.actions;