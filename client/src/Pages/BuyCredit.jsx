import React, { useContext } from 'react'
import { plans, assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const {backendUrl,loadCreditData} = useContext(AppContext)
  const navigate = useNavigate()
  const {getToken} = useAuth()


  const initPay = async(order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payments',
      description:'Credits Payments',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)
      
      const token  = await getToken()
      try {
        const {data} = await axios.post(backendUrl+'/api/user/verify-razorpay-payment',response,{headers:{token}})
        if(data.success){
          loadCreditData()
          navigate('/')
          toast.success("Credit Added")
        } else {
          toast.error(data.message || 'Payment verification failed')
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message)
      }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay= async(planId)=>{
    try {
      if(!backendUrl){
        toast.error('Backend URL is not configured')
        return
      }
      
      const token = await getToken()
      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{planId},{headers:{token}})

      if(data.success && data.order){
        initPay(data.order)
      } else {
        toast.error(data.message || 'Failed to create payment order')
      }



    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }


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
          <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'> Get Started</button>
        </div>
      ))}
     </div>
    </div>
  )
}

export default BuyCredit