import { lazy } from 'react'

const AccountPending = lazy(() => import("../../pages/AccountPending"))
const AccountDeactive = lazy(() => import("../../pages/AccountDeactive"))
const SellerDashboard = lazy(() => import('../../pages/seller/SellerDashboard'))
const AddProduct = lazy(() => import("../../pages/seller/AddProduct"))
const Products = lazy(() => import("../../pages/seller/Products"))
const DiscountProducts = lazy(() => import("../../pages/seller/DiscountProducts"))
const Orders = lazy(() => import("../../pages/seller/Orders"))
const Payments = lazy(() => import("../../pages/seller/Payments"))
const ChatCustomer = lazy(() => import("../../pages/seller/ChatCustomer"))
const ChatSupport = lazy(() => import("../../pages/seller/ChatSupport"))

const sellerRoutes = [
    {
        path: '/seller/account-pending',
        element: <AccountPending />,
        ability: 'seller'
    },
    {
        path: '/seller/account-deactive',
        element: <AccountDeactive />,
        ability: 'seller'
    },
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        role: 'seller',
        status: 'active'
    },
    // {
    //     path: '/seller/dashboard/edit-product/:productId',
    //     element: <EditProduct />,
    //     role: 'seller',
    //     status: 'active'
    // },
    {
        path: '/seller/dashboard/products',
        element: <Products />,
        role: 'seller',
        status: 'active'
    },

    {
        path: '/seller/dashboard/discount-products',
        element: <DiscountProducts />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element: <Orders />,
        role: 'seller',
        visibility: ['active', 'deactive']
    },
    // {
    //     path: '/seller/dashboard/order/details/:orderId',
    //     element: <OrderDetails />,
    //     role: 'seller',
    //     visibility: ['active', 'deactive']
    // },
    {
        path: '/seller/dashboard/payments',
        element: <Payments />,
        role: 'seller',
        status: 'active'
    },
    // {
    //     path: '/seller/dashboard/chat-support',
    //     element: <SellerToAdmin />,
    //     role: 'seller',
    //     visibility: ['active', 'deactive', 'pending']
    // },
    {
        path: '/seller/dashboard/chat-customer/:customerId',
        element: <ChatCustomer />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-customer',
        element: <ChatCustomer />,
        role: 'seller',
        status: 'active'
    },
    // {
    //     path: '/seller/dashboard/profile',
    //     element: <Profile />,
    //     role: 'seller',
    //     visibility: ['active', 'deactive', 'pending']
    // },
    // {
    //     path: '/seller/dashboard/add-banner/:productId',
    //     element: <AddBanner />,
    //     role: 'seller',
    //     status: 'active'
    // },
    // {
    //     path: '/seller/dashboard/banners',
    //     element: <Banners />,
    //     role: 'seller',
    //     status: 'active'
    // }
]

export default sellerRoutes