import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  count: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemID = action.payload
      const existItem = state.items.find((singleItem) => singleItem.id === itemID)

      if (existItem) {
        state.items = state.items.map((singleItem) =>
          singleItem.id === existItem.id ? {
            ...existItem,
            amount: existItem.amount + 1,
          } : singleItem,
        )
      } else {
        state.items = [...state.items, {
          id: itemID,
          amount: 1,
        }]
      }
    },


    removeFromCart: (state, action) => {
      const itemID = action.payload
      const existItem = state.items.find((singleItem) => singleItem.id === itemID)

      if (existItem.amount === 1) {
        state.items = state.items.filter((singleItem) => singleItem.id !== itemID)
      } else {
        state.items = state.items.map((singleItem) =>
          singleItem.id === existItem.id ? {
            ...existItem,
            amount: existItem.amount - 1,
          } : singleItem,
        )
      }
    },


    removeAllFromCart: (state, action) => {
      const itemID = action.payload
      state.items = state.items.filter((singleItem) => singleItem.id !== itemID)
    },


    clearCart: (state) => {
      state.items = []
    },


    setCartItemCount: (state, action) => {
      let count = 0

      state.items.map((singleItem) => {
        count += singleItem.amount
      })

      state.count = count

    },

    fetchCart: (state, action) => {
      return state.items
    },

    fetchCartItemCount: (state) => {
      return state.count
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
  setCartItemCount,
  fetchCart,
  fetchCartItemCount,
} = cartSlice.actions

export default cartSlice.reducer