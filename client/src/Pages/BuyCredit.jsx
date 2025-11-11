import React from 'react'
import { plans, assets } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div  className=" text-center pt-14 mb-10  min-h-[80vh]">
     <button className='border border-gray-400 px-10 rounded-full mb-6'> Our Plans</button>
     <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'> Choose the plan that’s right for you</h1>
     <div className='flex flex-wrap justify-center text-left gap-6'>
      {plans.map((item, index) => (
        <div className=' bg-white drop-shadow-sm rounded-lg py-12 px-8  text-gray-700 hover:scale-105 transition-all duration-300  ' key={item.id || index}>
          <img src={assets.logo_icon} alt="" />
          <p className='mt-3 font-semibold'>{item.id}</p>
          <p className='text-sm'>{item.desc}</p>
          <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span>/{item.credits}credits </p>
          <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'> Get Started</button>
        </div>
      ))}
     </div>
    </div>
  )
}

export default BuyCredit