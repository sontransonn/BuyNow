import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/order',
    withCredentials: true
})

const initialState = {
    successMessage: '',
    errorMessage: '',
    totalOrder: 0,
    order: {},
    myOrders: []
}

// Lấy ra các đơn hàng theo query ở phía admin
export const get_admin_orders = createAsyncThunk(
    'order/get_admin_orders',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy ra chi tiết đơn hàng theo orderId ở phía admin
export const get_admin_order = createAsyncThunk(
    'order/get_admin_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/order/${orderId}`, { withCredentials: true })

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy ra các đơn hàng theo query ở phía seller
export const get_seller_orders = createAsyncThunk(
    'order/get_seller_orders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy ra chi tiết đơn hàng theo orderId ở phía seller
export const get_seller_order = createAsyncThunk(
    'order/get_seller_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/order/${orderId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Cập nhật status của order ở phía admin
export const admin_order_status_update = createAsyncThunk(
    'order/admin_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/admin/order-status/update/${orderId}`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'order/seller_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/seller/order-status/update/${orderId}`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders
                state.totalOrder = payload.totalOrder
            })
            .addCase(get_admin_order.fulfilled, (state, { payload }) => {
                state.order = payload.order
            })
            .addCase(admin_order_status_update.rejected, (state, { payload }) => {
                state.errorMessage = payload.message
            })
            .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })
            .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders
                state.totalOrder = payload.totalOrder
            })
            .addCase(get_seller_order.fulfilled, (state, { payload }) => {
                state.order = payload.order
            })
            .addCase(seller_order_status_update.rejected, (state, { payload }) => {
                state.errorMessage = payload.message
            })
            .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })
    }
})

export const {
    messageClear
} = orderSlice.actions

export default orderSlice.reducer