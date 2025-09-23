import { createSlice } from '@reduxjs/toolkit'

export interface userData {
    name: string,
    email: string,
    address: string,
    phone: string
}

const initialState: userData = {
    name: '',
    email: '',
    address: '',
    phone: ''
}
console.log(initialState)

const filterSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.name = action.payload.name,
                state.address = action.payload.address,
                state.email = action.payload.email,
                state.phone = action.payload.phone
        }
    }
})
export const { getData } = filterSlice.actions;

export default filterSlice.reducer;