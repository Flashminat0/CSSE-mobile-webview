import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "./cartSlice"
import UserReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: UserReducer,
  },
})