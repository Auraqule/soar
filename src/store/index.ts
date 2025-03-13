import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { useDispatch } from "react-redux";
import { storeReducer } from "../slices/storeSlice";

export const store = configureStore({
  reducer: {
    store: storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
