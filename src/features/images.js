import { createSlice } from '@reduxjs/toolkit'

export const imageSlice = createSlice({
    name: 'image',
    initialState: { value: '' },
    reducers: {
        updateimage: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateimage } = imageSlice.actions

export default imageSlice.reducer