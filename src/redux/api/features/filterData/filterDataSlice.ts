import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    category: string,
    price: {
        min: number,
        max: number
    }
    sort: string
}

const initialState: CounterState = {
    category: "",
    price: {
        min: 0,
        max: 0
    },
    sort: "Ascending"
}
console.log(initialState)

const filterSlice = createSlice({
    name: 'filterData',
    initialState,
    reducers: {
        getCategoryData: (state, action) => {
            state.category = action.payload.category
        },
        getPriceData: (state, action) => {
            state.price.min = action.payload.min
            state.price.max = action.payload.max
        },
        getSortData: (state, action) => {
            state.sort = action.payload.sort
        },
    }
})
export const { getCategoryData, getPriceData, getSortData } = filterSlice.actions

export default filterSlice.reducer