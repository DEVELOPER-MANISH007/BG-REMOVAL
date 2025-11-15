import React, { useContext } from 'react'
import { plans, assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useNotifications } from 'reapop'
import axios from 'axios'

const BuyCredit = () => {
  const {backendUrl,loadCreditData} = useContext(AppContext)
  const navigate = useNavigate()
  const {getToken} = useAuth()
  const { notify } = useNotifications()


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
          notify({
            title: 'Success',
            message: 'Credit Added',
            status: 'success',
            dismissible: true,
            dismissAfter: 3000,
          })
        } else {
          notify({
            title: 'Error',
            message: data.message || 'Payment verification failed',
            status: 'error',
            dismissible: true,
            dismissAfter: 5000,
          })
        }
      } catch (error) {
        console.log(error)
        notify({
          title: 'Error',
          message: error.response?.data?.message || error.message,
          status: 'error',
          dismissible: true,
          dismissAfter: 5000,
        })
      }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay= async(planId)=>{
    try {
      if(!backendUrl){
        notify({
          title: 'Error',
          message: 'Backend URL is not configured',
          status: 'error',
          dismissible: true,
          dismissAfter: 5000,
        })
        return
      }
      
      const token = await getToken()
      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{planId},{headers:{token}})

      if(data.success && data.order){
        initPay(data.order)
      } else {
        notify({
          title: 'Error',
          message: data.message || 'Failed to create payment order',
          status: 'error',
          dismissible: true,
          dismissAfter: 5000,
        })
      }

    } catch (error) {
      console.log(error)
      notify({
        title: 'Error',
        message: error.response?.data?.message || error.message,
        status: 'error',
        dismissible: true,
        dismissAfter: 5000,
      })
    }
  }

  const popularPlan = 'Advanced'

  return (
    <div className="min-h-[85vh] py-12 px-4 animate-fade-in relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className='mb-12 animate-fade-in-down text-center'>
        <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
          <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
            Pricing Plans
          </p>
        </div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-4'>
          Choose the plan that's <span className='gradient-text'>right for you</span>
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Select a plan that fits your needs. All plans include high-quality background removal.
        </p>
      </div>

      {/* Plans Grid */}
      <div className='flex flex-wrap justify-center gap-6 lg:gap-8 max-w-6xl mx-auto'>
        {plans.map((item, index) => {
          const isPopular = item.id === popularPlan
          return (
            <div 
              className={`group relative bg-white rounded-2xl py-8 px-6 sm:px-8 text-left hover-lift border-2 transition-all duration-300 min-w-[280px] max-w-[320px] flex-1 ${
                isPopular 
                  ? 'border-violet-500 shadow-xl scale-105 lg:scale-110' 
                  : 'border-gray-200 shadow-md hover:border-violet-300'
              }`}
              key={item.id || index}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold rounded-full animate-pulse-slow'>
                  ⭐ Most Popular
                </div>
              )}

              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isPopular 
                  ? 'bg-gradient-to-br from-violet-50/80 to-purple-50/80' 
                  : 'bg-gradient-to-br from-violet-50/50 to-purple-50/50'
              }`}></div>

              {/* Content */}
              <div className='relative z-10'>
                {/* Icon */}
                <div className='mb-4'>
                  <div className={`inline-flex p-3 rounded-xl ${
                    isPopular 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-500' 
                      : 'bg-gradient-to-br from-violet-100 to-purple-100'
                  }`}>
                    <img 
                      src={assets.logo_icon} 
                      alt={item.id} 
                      className={`w-8 h-8 ${isPopular ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>{item.id}</h3>
                <p className='text-sm text-gray-600 mb-6'>{item.desc}</p>

                {/* Price */}
                <div className='mb-6 pb-6 border-b border-gray-200'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
                      ${item.price}
                    </span>
                    <span className='text-gray-500 text-sm'>/ {item.credits} credits</span>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>
                    ${(item.price / item.credits).toFixed(3)} per credit
                  </p>
                </div>

                {/* Features */}
                <ul className='mb-8 space-y-2 text-sm text-gray-600'>
                  <li className='flex items-center gap-2'>
                    <span className='text-green-500 font-bold'>✓</span>
                    <span>High-quality processing</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='text-green-500 font-bold'>✓</span>
                    <span>Instant results</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='text-green-500 font-bold'>✓</span>
                    <span>No watermarks</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={()=>paymentRazorpay(item.id)} 
                  className={`w-full font-semibold text-sm rounded-full py-3.5 transition-all duration-300 ${
                    isPopular
                      ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white hover:from-fuchsia-500 hover:via-purple-600 hover:to-violet-600 shadow-lg hover:shadow-xl hover:shadow-purple-500/50'
                      : 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105'
                  }`}
                >
                  Get Started
                </button>
              </div>

              {/* Decorative element */}
              <div className='absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default BuyCredit