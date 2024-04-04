import { createSlice } from '@reduxjs/toolkit'

export const fileSlice = createSlice({
    name: 'file',
    initialState: { value: File },
    reducers: {
        updatefile: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updatefile } = fileSlice.actions

export default fileSlice.reducer