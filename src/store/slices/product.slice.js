import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: []
    },
    reducers: {
        setProduct:  (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        },
        deleteProduct: (state, action) => {
            return {
                ...state,
                data: state.data.filter(product => product.id !== action.payload)
            }
        },
        addProduct: (state, action) => {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        },
        // updateProduct: (state, action) => {
        //     return state.map(product => {
        //         if (product.id == action.payload.id) {
        //             return action.payload
        //         }
        //         return product
        //     })
        // }
        
        // updateProduct: (state, action) => {
           
        //     const index = state.data.findIndex(product => product.id === action.payload.id);

        //     if (index !== -1) {
        //         state.data[index] = action.payload;
        //     }
        // }

    }
})

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;