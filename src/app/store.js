import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { test } from "./features/test";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const presistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(presistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [test.reducerPath]: test.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(test.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
