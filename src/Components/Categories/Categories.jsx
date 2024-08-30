import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export default function Categories() {

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data}=useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories
  })
return (
<>
      <div className='w-[90%] m-auto mt-28 mb-16'>
      <div className='flex flex-wrap m-auto items-center gap-10 justify-center'>
        {data?.data?.data?.length > 0? data?.data?.data?.map((category)=>(
          <div key={category._id} className='flex flex-col w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 cursor-pointer justify-center items-center relative'>
            <div className="relative flex w-full flex-col rounded-xl bg-[--light-color] bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
            <img src={category.image} className="h-full w-full object-cover" alt={category.name} />
            </div>
            <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="block text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
              {category.name}
              </p>
            </div>
            </div>
          </div>
        </div>
        )): <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>}
      </div>
    </div>
    </>
    
);
}