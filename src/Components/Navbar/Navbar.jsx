import React, { useContext } from 'react'
import style from './Navbar.module.css'
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import Wishlist from './../Wishlist/Wishlist';


export default function Navbar() {

  let {userLogin, setuserLogin} = useContext(UserContext);
  let navigate = useNavigate()
 
  let {numberItems, setnumberItems} = useContext(CartContext);

  function signOut(){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate("/login")
  }
  
  return <>
<nav className="bg-slate-100 border-gray-200 fixed top-0 left-0 right-0  z-10">
  <div className="max-w-screen-xl justify-center md:justify-between flex items-center mx-auto p-4">
   <div className='flex items-center gap-5'> 
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} width={"100px"} className="h-8" alt="FreshCart Logo" />
    </Link>
    {userLogin != null ? <> <ul className='flex gap-4'>
          <li><Link to="">Home</Link></li>
          <li><Link to="cart" className='relative'>Cart 
          <div className='absolute top-[-13px] right-[-13px] size-5 bg-emerald-600 text-white rounded-full flex items-center justify-center'>
          {numberItems}
          </div>
            </Link></li>
          <li><Link to="categories">Categories</Link></li>
          <li><Link to="brands">Brands</Link></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="wishlist">Wishlist</Link></li>
        </ul> </> : null}
        </div>
    <div className='flex items-center space-x-6 rtl:space-x-reverse'>
      <div className='icons flex gap-4'>
        <i className="fab fa-facebook"></i>
        <i className='fab fa-linkedin'></i>
        <i className='fab fa-youtube'></i>
        <i className='fab fa-tiktok'></i>
        <i className='fab fa-twitter'></i>
      </div>
      <div className='links flex gap-4'>
        {userLogin != null? <span onClick={signOut} className='text-sm cursor-pointer'>
      SignOut
      </span> :  <> <Link to="login" className='text-sm'>
      Login
      </Link>
      <Link to="register" className='text-sm'>
      Register
      </Link>
      </>}
       
      </div>
    </div>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
</nav>

  </>
}
