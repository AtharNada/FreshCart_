import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Register from './../Register/Register';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function Checkout() {
  let {cartId} = useContext(CartContext);
  let {checkout} = useContext(CartContext);
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartId, url){
    let {data} = await checkout(cartId, url, formik.values);
    window.location.href = data.session.url
  }

  return <>
  <h2 className='font-bold text-2xl py-3'>Checkout Now</h2>
  <form onSubmit={formik.handleSubmit} className='max-w-md mx-auto'>
  <div className="mb-5">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name="details" type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your details" />
    </div>
    <div className="mb-5">
      <input name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} placeholder="Your phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
    <div className="mb-5">
      <input name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} placeholder="Your city" type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
    <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"> 
      Checkout
      </button>
      
    </div>
    
  </form>
  </>
}
