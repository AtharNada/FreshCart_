import React, {useContext, useState} from 'react';
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Register from './../Register/Register';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
let {userLogin, setuserLogin} = useContext(UserContext)

  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)

  function handleLogin(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
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
    });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password should be between 6 and 10 char").required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  


  return <>
  <div className='my-8'>
    {ApiError ?
    <div className='w-1/2 text-center mx-auto p-2 rounded-lg text-slate-200 bg-red-600'>{ApiError}</div>: null}
  <h2 className='font-bold text-2xl py-3'>Login Now</h2>
  <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
  <div className="mb-5">
      <input 
      onBlur={formik.handleBlur} 
      onChange={formik.handleChange} 
      value={formik.values.email} 
      name="email" 
      type="email" 
      id="email" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Email" />
    </div>
    {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>): null}
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
    {formik.errors.password && formik.touched.password ? (<span className='text-red-500'>{formik.errors.password}</span>): null}
    <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"> {isLoading ? <i className= "fas fa-spinner fa-spin"></i> :"Login"} </button>
      <Link to={"/register"}><span className='text-blue-500 underline'>don't have an account? Register Now</span></Link>
    </div>
    
  </form>
  </div>
  
  </>
}
