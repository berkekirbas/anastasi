import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createWrapper } from "next-redux-wrapper";

import authSlice from "./slices/authSlice";
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import publicSlice from "./slices/publicSlice";

import cardSlice from "./slices/cardSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  brand: brandSlice,
  category: categorySlice,
  product: productSlice,
  public: publicSlice,
  card: cardSlice,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["auth", "card"],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

/*let store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;*/

export const wrapper = createWrapper(makeStore);
