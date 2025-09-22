import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

export interface IUserInfo {
  name: string
  email: string
  address: string
  phone: string
}

export interface IPaymentPayload {
  user: IUserInfo
  price: number
}

export interface IPaymentState {
  user: IUserInfo | null
  price: number | null
}

const initialState: IPaymentState = {
  user: null,
  price: null,
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<IPaymentPayload>) => {
      state.user = action.payload.user
      state.price = action.payload.price
    },
    clearPaymentData: (state) => {
      state.user = null
      state.price = null
    },
  },
})

export const { setPaymentData, clearPaymentData } = paymentSlice.actions
export default paymentSlice.reducer

export const selectPaymentUser = (state: RootState) => state.payment.user
export const selectPaymentPrice = (state: RootState) => state.payment.price
