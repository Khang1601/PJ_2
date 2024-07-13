import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        // data: [],

        cart: [],
        receipts: []
    },


    reducers: {
        setData: function(state, action) {
            return {
                ...state,
                data: action.payload
            }
        },

        updateUser: function(state, action) {
            return {
                ...state,
                data: action.payload
            }
        },

        addUser: function (state, action) {
            return {
                ...state,
                data:  [...state.data, action.payload]
            };
        },

        deleteUser: (state, action) => {
            return {
                ...state,
                //data là một phần của trạng thái (state) trong Redux, và có thể chứa một danh sách các sản phẩm hoặc dữ liệu khác
                //User là biến tạm thời đại diện cho từng phần tử trong mảng state.data
                //id của sản phẩm trùng với action.payload, sản phẩm đó sẽ bị loại bỏ khỏi mảng kết quả
                data: state.data.filter(user => user.id !== action.payload)
            }
        },

        setCart: function(state, action) {
            return {
                ...state,
                cart: action.payload
            }
        },
        setReceipts: function(state, action) {
            return {
                ...state,
                receipts: action.payload
            }
        },
        addToCart: function(state, action) {
            let check = state.cart.find(item => item.id === action.payload.id);
            if(!check) {
                return {
                    ...state,
                    cart: [...state.cart, {
                        ...action.payload,
                        quantity: 1
                    }]
                }
            }else {
                return {
                    ...state,
                    cart: state.cart.map((item) => {
                        if(item.id == action.payload.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item
                    })
                }
            }

        },
        changeQuantity: function(state, action) {
            return {
                ...state, 
                cart: state.cart.map((item) => {
                    if(item.id == action.payload.id) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        }
                    }
                    return item
                })
            }
        },
        addNewReceipt: function(state, action) {
            return {
                ...state,
                cart: [],
                receipts: [...state.receipts, action.payload]
            }
        },
        deleteReceipt: function (state, action) {
            return {
                ...state,
                // - là một tham số được sử dụng khi không quan tâm đến giá trị của phần tử trong mảng mà đang lặp qua
                // ở đây được sử dụng để bỏ qua giá trị của phần tử trong mảng receipts
                // receipts: state.receipts.filter((_, index) => index !== action.payload)
                receipts: state.receipts.filter(item => item.id !== action.payload)


            }
        },
        deleteFromCart: function(state, action) {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
                

            };
        }
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;