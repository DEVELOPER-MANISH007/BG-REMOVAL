import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div className='py-20 px-4'>
        {/* Title */}
        <div className='text-center mb-12 animate-fade-in-up'>
          <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
            <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
              What Our Users Say
            </p>
          </div>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight'>
            Customer <span className='gradient-text'>Testimonials</span>
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto py-8'>
            {testimonialsData.map((item, index) => (
                <div 
                  className='group relative bg-white rounded-2xl p-8 hover-lift border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 max-w-lg mx-auto' 
                  key={index}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                    {/* Gradient background on hover */}
                    <div className='absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    
                    {/* Quote icon */}
                    <div className='relative z-10 mb-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center group-hover:from-violet-200 group-hover:to-purple-200 transition-all duration-300'>
                        <p className='text-2xl text-violet-600 font-bold'>"</p>
                      </div>
                    </div>
                    
                    {/* Testimonial text */}
                    <p className='text-base text-gray-700 leading-relaxed mb-6 relative z-10 italic'>
                      {item.text}
                    </p>
                    
                    {/* Author info */}
                    <div className='flex items-center gap-4 relative z-10 pt-4 border-t border-gray-100'>
                        <div className='relative'>
                          <img 
                            className='w-12 h-12 rounded-full object-cover ring-2 ring-violet-200 group-hover:ring-violet-400 transition-all duration-300' 
                            src={item.image} 
                            alt={item.author} 
                          />
                          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                        <div>
                            <p className='font-bold text-gray-800'>{item.author}</p>
                            <p className='text-sm text-gray-500'>{item.jobTitle}</p>
                        </div>
                    </div>
                    
                    {/* Decorative stars */}
                    <div className='absolute top-4 right-4 text-yellow-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300'>
                      ⭐⭐⭐⭐⭐
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonial