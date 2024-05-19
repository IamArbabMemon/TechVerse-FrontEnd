import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productsSlice'

export const store = configureStore({
  reducer: {
    productCount: productReducer,
  },
})