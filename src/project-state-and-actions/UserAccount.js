import { createSlice } from "@reduxjs/toolkit";

let userAccount = createSlice({
    name : "user-account",
    initialState : [],
    reducers : {
        addUserAccount : (state , action) => {
            return state = action.payload
        },
        deletUserAccount : () => []
    }
});
export default userAccount.reducer;
export let {addUserAccount , deletUserAccount} = userAccount.actions;