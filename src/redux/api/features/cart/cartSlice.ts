import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    quantity: number
}

const initialState: CounterState = {
    quantity: 1,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.quantity += 1
        },
        decrement: (state) => {
            state.quantity -= 1
        },
        quantityByPayload: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload
        },
    }
})
export const { increment, decrement, quantityByPayload } = cartSlice.actions

export default cartSlice.reducer