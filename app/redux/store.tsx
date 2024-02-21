import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { reduxStorage } from "./storage";
import { SLICES } from "@utils";
import { TaskSlice, UserSlice } from "./slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  user: UserSlice,
  task: TaskSlice,
});

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  blacklist: [SLICES.user, SLICES.task],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
