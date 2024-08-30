import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function RecentProducts() {
    
  let {data, isError, error, isLoading} = useProducts()

  let {addProductToCart, setnumberItems, numberItems} = useContext(CartContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0)

  async function addToCart(id){
    setcurrentId(id);
    setloading(true); 

    let response = await addProductToCart(id)
    if(response.data.status == "success"){
      setnumberItems(numberItems + 1)
      toast.success(response.data.message);
      setloading(false)
    }
    else{
      toast.error(response.data.message);
      setloading(false)

    }
  }

  async function addToWish(id){
    setcurrentId(id);
    setloading(true);

    let res = await addProductToWish(id)
    console.log(res)
  }

  if(isError){
    return <h3>{error.message}</h3>
  }
  if (isLoading){
    return <div className="spinner"></div>;
  }

  return <>
  <div className='row'>
      {data?.data?.data.map((product)=> (
      <div key={product.id} className='w-1/6'>
       <div className="product p-2 my-2"> 
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' />
          <h3 className=' text-emerald-600'>{product.category.name}</h3>
          <h3 className='font-semibold mb-1'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
          <div className='flex justify-between p-3'>
            <span>{product.price} EGP</span>
            <span><i className='fas fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
            <button onClick={()=> addToWish(product._id)} ><i className='fas fa-heart'></i></button>
          </div>
        </Link>
        <button onClick={()=> addToCart(product.id)} className='btn'>{loading && currentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add to Cart"}
        </button>
        </div>
      </div>
    )) }
  </div>
   
  </>
}
