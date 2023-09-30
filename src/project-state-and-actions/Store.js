import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedProducts from "../project-state-and-actions/CartActions";
import WishList from "../project-state-and-actions/AddToWishList";
import storage from "redux-persist/lib/storage";
import accounts from "./Accounts.js"
import UserAccount from "./UserAccount";
import { persistStore, persistReducer ,   FLUSH, REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER} from "redux-persist";
let persistConfig = {
    key: "state",
    storage,
};
let persistedReducer = persistReducer(persistConfig, combineReducers({
    WishList,
    selectedProducts,
    accounts,
    UserAccount
}));
export let Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
let persistor = persistStore(Store);
export default persistor;