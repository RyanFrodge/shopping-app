import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        "id": nanoid(),
        "name": "Potatoes",
        "description": "Versatile Tubers",
        "quantity": "1",
        "purchased": false
    }, {
        "id": nanoid(),
        "name": "More Potatoes",
        "description": "Versatile Tubers",
        "quantity": "2",
        "purchased": false
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    }, {
        "id": nanoid(),
        "name": "Tubers",
        "description": "Versatile Potatoes",
        "quantity": "3",
        "purchased": true
    },]

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        itemAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(name, description, quantity, purchased) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        description,
                        quantity,
                        purchased
                    }
                }
            }
        },
        itemUpdated(state, action) {
            const { id, name, description, quantity, purchased } = action.payload
            const existingItem = state.find(item => item.id === id)
            if (existingItem) {
                existingItem.name = name
                existingItem.description = description
                existingItem.quantity = quantity
                existingItem.purchased = purchased
            }
        },
        itemDeleted(state, action) {
            const { id } = action.payload
            return state.filter(el => el.id !== id)
        }

    }
})

export const { itemAdded, itemUpdated, itemDeleted } = itemsSlice.actions

export default itemsSlice.reducer