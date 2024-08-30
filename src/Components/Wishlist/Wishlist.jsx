import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Wishlist() {

  let {getLoggedUserWish, updateWishProductQuantity, deleteWishItem, setnumberItems, numberItems} = useContext(WishContext);
  const [WishDetails, setWishDetails] = useState(null)

  async function getWishItems(){
   let response = await getLoggedUserWish();
   console.log(response)
    // if(response.data.status == "success"){
    //   setwishDetails(response.data.data);
    // }
  }

  async function updateProduct(id, count){

    if(count == 0){
      deleteItem(id)
    }
    else{
      let response = await updateWishProductQuantity(id, count);
    if (response.data.status == "success"){
      setWishDetails(response.data.data);
      toast.success("Product Updated Successfully");
    }
    else{
      toast.error("error")
    }
    }
  }

  async function deleteItem(productId){
    let response =  await deleteWishItem(productId);
    if (response.data.status == "success"){
      setnumberItems(numberItems - 1)
      setWishDetails(response.data.data);
  }
}

  useEffect(() => {
    getWishItems()
  }, [])

  return ( 
  <> 
  
  {WishDetails?.data?.data?.data?.length > 0 ? <>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {WishDetails?.data?.data?.data?.map((product)=><tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteItem(product._id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>)}
      
      
    </tbody>
  </table>
</div></> : <h2 className='text-3xl capitalize font-semibold text-emerald-500 items-center justify-center'>No Products Yet</h2>}
  

  </>
  );
}
