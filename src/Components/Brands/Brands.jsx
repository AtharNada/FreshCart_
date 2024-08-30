import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import Sliders from '../Sliders/Sliders'
import MainSlider from '../MainSlider/MainSlider'
export default function Brands() {

  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data}=useQuery({
    queryKey: ["allBrands"],
    queryFn: getBrands
  })
return (
<>
      <div className='w-[90%] m-auto mt-28 mb-16'>
      <div className='flex flex-wrap m-auto items-center gap-10 justify-center'>
        {data?.data?.data?.length> 0? data?.data?.data?.map((brand)=>(
          <div key={brand._id} className='flex flex-col w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 cursor-pointer justify-center items-center relative group'>
            <div className="relative flex w-full flex-col rounded-xl bg-[--light-color] bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-52 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 group-hover:scale-110 transition-all duration-500">
            <img src={brand.image} className="h-full w-full object-contain" alt={brand.name} />
            </div>
            <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="block text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
              {brand.name}
              </p>
            </div>
            </div>
          </div>
        </div>
        )) : <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>}
      </div>
    </div>
    </>
    
);
}