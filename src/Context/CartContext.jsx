import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Checkout from './../Components/Checkout/Checkout';

export let CartContext = createContext();

export default function CartContextProvider(props){

    let headers = {
        token: localStorage.getItem("userToken"),
    };
    const [cartId, setcartId] = useState(0);
    const [numberItems, setnumberItems] = useState(0);

    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId : productId}, { headers})
        .then((res) => res)
        .catch((err) => err);
    }

    function getLoggedUserCart(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((res)=> {
          setnumberItems(res.data.numOfCartItems);
          setcartId(res.data.data._id)
          return res
        })
        .catch((err)=> err);
    }
    function updateCartProductQuantity(productId, newCount){
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count: newCount},{headers})
          .then((res)=> res)
          .catch((err)=> err);
      }

      function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers})
        .then((res)=> res)
        .catch((err)=> err);
      }

      function checkout(cartId, url, formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
          shippingAddress: formData
        },{
        headers,
        }
      )
        .then((res)=> res)
        .catch((err)=> err);
      }
      useEffect(()=>{
        getLoggedUserCart()
      },[])
    return ( <CartContext.Provider value={{addProductToCart, getLoggedUserCart, updateCartProductQuantity, deleteCartItem, checkout, cartId, setnumberItems, numberItems}}>
        {props.children}
    </CartContext.Provider>
    );
}