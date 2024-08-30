import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import Login from './../Login/Login';
import { UserContext } from '../../Context/UserContext';


export default function Register() {

  let {userLogin, setuserLogin} = useContext(UserContext)

  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)

  function handleRegister(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .then((res)=>{
      setisLoading(false)
      if(res.data.message == "success"){
        localStorage.setItem("userToken", res.data.token)
        setuserLogin(res.data.token)
        navigate('/')
      }
    })
    .catch((res)=>{
      setisLoading(false)
      setApiError(res.response.data.message)
    })
  }



    let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Min Lenght is 3").max(10, "Max Length is 10").required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("Phone is Required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password should be between 6 and 10 char").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword and password not the same").required("rePassword is Required"),
  });
  
//     axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
//     .then((res)=>{
//       // 
//       // {
//       //   
//       //   setuserLogin(res.data.token)
//       //  
//       // }
//       console.log(res);
//     })
//     .catch((res)=>{
//       // setisLoading(false)
//       // setAPIError(res.response.data.message)
//       console.log(res);
//     });
//   }



  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  




  return <>
<div className='my-8'>
  {ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white rounded-lg font-bold p-3'>{ApiError}</div> : null}
  <h2 className='font-bold text-2xl py-3'>Register Now</h2>
  <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
    <div className="mb-5">
      <input 
      onBlur={formik.handleBlur} 
      onChange={formik.handleChange} 
      value={formik.values.name} 
      name="name" 
      type="text" 
      id="name" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
      placeholder="Your Name" />
    </div>
    {formik.errors.name && formik.touched.name ? (<span className='text-red-500'>{formik.errors.name}</span>) : null}
    <div className="mb-5">
      <input 
      onBlur={formik.handleBlur} 
      onChange={formik.handleChange} 
      value={formik.values.email} 
      name="email" 
      type="email" 
      id="email" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
      placeholder="Your Email" />
    </div>
    {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>): null}
    <div className="mb-5">
      <input 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur} 
      value={formik.values.phone} 
      type="tel" 
      id="phone" 
      name="phone" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
      placeholder="Your phone" />
    </div>
    {formik.errors.phone && formik.touched.phone ? (<span className='text-red-500'>{formik.errors.phone}</span>): null}
    <div className="mb-5">
      <input 
      name="password" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur} 
      value={formik.values.password} 
      placeholder="Your Password" 
      type="password" 
      id="password" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
    {formik.errors.password && formik.touched.password ? (<span className='text-red-500'>{formik.errors.password}</span>) : null}
    <div className="mb-5">
      <input 
      name="rePassword" 
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur} 
      value={formik.values.rePassword} 
      placeholder="RePassword" 
      type="password" 
      id="rePassword" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
    {formik.errors.rePassword && formik.touched.rePassword ? (<span className='text-red-500'>{formik.errors.rePassword}</span>): null}
    <div className="flex items-start mb-5">
      <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"/>
      </div>
      <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
    </div>
    <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"> {isLoading ? <i className= "fas fa-spinner fa-spin"></i> :"Register"}</button>
      
      <Link to={"/login"}><span className='text-blue-600 underline'>do you have an account?</span></Link>
    </div>
    
  </form>
</div> 
  </>
}

