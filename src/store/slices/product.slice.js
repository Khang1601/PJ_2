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
                //data là một phần của trạng thái (state) trong Redux, và có thể chứa một danh sách các sản phẩm hoặc dữ liệu khác
                //product là biến tạm thời đại diện cho từng phần tử trong mảng state.data
                //id của sản phẩm trùng với action.payload, sản phẩm đó sẽ bị loại bỏ khỏi mảng kết quả
                data: state.data.filter(product => product.id !== action.payload)
            }
        },
        addProduct: (state, action) => {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        },


    }
})

export const productAction = productSlice.actions;
export const productReducer = productSlice.reducer;