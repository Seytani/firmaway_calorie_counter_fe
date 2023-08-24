import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import calorieCounterSlice from "./calorieCounterSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    calorieCounter: calorieCounterSlice
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch