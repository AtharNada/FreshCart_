import { Children, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Notfound from './Components/Notfound/Notfound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout'
import Allorders from './Components/Allorders/Allorders'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import Login from './Components/Login/Login'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Wishlist from './Components/Wishlist/Wishlist';


let query = new QueryClient();

let x = createBrowserRouter([
  {path: "", element: <Layout />, children: [
    {index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    {path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
    {path: "categories", element: <ProtectedRoute><Categories/></ProtectedRoute> },
    {path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
    {path: "register", element: <Register /> },
    {path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
    {path: "login", element: <Login/>},
    {path:"*", element: <Notfound />},
    {path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path:"checkout", element:<ProtectedRoute><Checkout /></ProtectedRoute> },
    {path:"allorders", element:<ProtectedRoute><Allorders /></ProtectedRoute> },
    {path:"wishlist", element:<ProtectedRoute><Wishlist/></ProtectedRoute> },
    
  ]}
])



export default function App() {


  return <>
    <UserContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
       <RouterProvider router={x}></RouterProvider>;
       <Toaster />
          </CartContextProvider>
          <ReactQueryDevtools />
       </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>
    </>
}
