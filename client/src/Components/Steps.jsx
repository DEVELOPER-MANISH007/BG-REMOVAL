import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  const steps = [
    {
      icon: assets.upload_icon,
      title: 'Upload image',
      description: 'Simply drag and drop or click to upload your image. We support JPG, PNG, and WebP formats.',
      delay: '0.1s'
    },
    {
      icon: assets.remove_bg_icon,
      title: 'Remove background',
      description: 'Our AI automatically detects and removes the background with precision in just a few seconds.',
      delay: '0.2s'
    },
    {
      icon: assets.download_icon,
      title: 'Download image',
      description: 'Download your processed image with transparent background in high quality, ready to use.',
      delay: '0.3s'
    }
  ]

  return (
    <div className='mt-8 lg:mx-44 py-20 xl:py-40 px-4'>
      <div className='text-center mb-16 animate-fade-in-up'>
        <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
          <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
            How It Works
          </p>
        </div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight'>
          Steps to remove background <br className="max-md:hidden" /> 
          <span className='gradient-text'>image in seconds</span>
        </h1>
      </div>
      <div className='flex flex-row items-stretch flex-wrap gap-6 mt-16 xl:mt-24 justify-center'>
        {steps.map((step, index) => (
          <div 
            key={index}
            className='group relative flex flex-col items-start gap-4 bg-white rounded-2xl p-8 pb-10 hover-lift flex-1 min-w-[280px] max-w-[340px] border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300'
            style={{ animationDelay: step.delay }}
          >
            {/* Gradient background on hover */}
            <div className='absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            
            {/* Icon container */}
            <div className='relative z-10 p-4 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl group-hover:from-violet-200 group-hover:to-purple-200 transition-all duration-300'>
              <img 
                className='w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6' 
                src={step.icon} 
                alt={step.title} 
              />
            </div>
            
            {/* Content */}
            <div className='flex-1 relative z-10'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-sm font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full'>
                  {index + 1}
                </span>
                <p className='text-xl font-bold text-neutral-800'>{step.title}</p>
              </div>
              <p className='text-sm text-gray-600 leading-relaxed'>{step.description}</p>
            </div>
            
            {/* Decorative element */}
            <div className='absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps