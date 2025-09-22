import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../redux/api/features/cart/cartSlice'
import filterReducer from '../redux/api/features/filterData/filterDataSlice'
import authReducer from './api/features/auth/authSlice'
import paymentReducer from './api/features/payment/paymentSlice'
import productApi from './api/features/products/productApi'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Persist configs
const persistAuthConfig = { key: 'auth', storage }
const persistPaymentConfig = { key: 'payment', storage }

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer)
const persistedPaymentReducer = persistReducer(persistPaymentConfig, paymentReducer)

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filterData: filterReducer,
    auth: persistedAuthReducer,
    payment: persistedPaymentReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
