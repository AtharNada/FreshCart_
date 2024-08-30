import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Wishlist from "../Components/Wishlist/Wishlist";

export let WishContext = createContext();

export default function WishContextProvider(props){

    let headers = {
        token: localStorage.getItem("userToken"),
    };
    const [wishId, setwishId] = useState(0);
    const [numberItems, setnumberItems] = useState(0);

    function addProductToWish(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId : productId}, { headers})
        .then((res) => res)
        .catch((err) => err);
    }

    function getLoggedUserWish(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
        .then((res)=> {
          // setnumberItems(res.data.numOfWishsItems);
          // setwishId(res.data.data._id)
          console.log(res)
          // return res
        })
        .catch((err)=> err);
    }
    function updateWishProductQuantity(productId, newCount){
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {count: newCount},{headers})
          .then((res)=> res)
          .catch((err)=> err);
      }

      function deleteWishItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers})
        .then((res)=> res)
        .catch((err)=> err);
      }
      useEffect(()=>{
        getLoggedUserWish()
      },[])
    return ( <WishContext.Provider value={{addProductToWish, getLoggedUserWish, updateWishProductQuantity, deleteWishItem, wishId, setnumberItems, numberItems}}>
        {props.children}
    </WishContext.Provider>
    );
}