import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const res = await axios.get('http://localhost:4000/items')
    return res.data
})

export const addNewItem = createAsyncThunk(
    'items/addNewItem',
    async initialItem => {
        const res = await axios.post('http://localhost:4000/items/addItem', initialItem)
        return res.data
    }
)

export const deleteExistingItem = createAsyncThunk(
    'items/deleteItem',
    async initialItem => {
        const res = await axios.delete('http://localhost:4000/items/deleteItem/' + initialItem._id)
        return res.data
    }
)

export const editExistingItem = createAsyncThunk(
    'items/editItem',
    async initialItem => {
        const res = await axios.post('http://localhost:4000/items/editItem/' + initialItem._id, initialItem)
        return res.data
    }
)

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(deleteExistingItem.fulfilled, (state, action) => {
                state.items = state.items.filter(el => el._id !== action.payload)
            })
            .addCase(editExistingItem.fulfilled, (state, action) => {
                const editIndex = state.items.findIndex(item => item._id === action.payload["_id"])
                state.items[editIndex] = action.payload
            })
    }
})

export default itemsSlice.reducer

export const selectAllItems = state => state.items.items
