import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'

const Upload = () => {

  const {removeBg} = useContext(AppContext)
  return (
    <div className='pb-20 px-4'>
        {/* Title */}
        <div className='text-center mb-12 animate-fade-in-up'>
          <div className='inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full border border-violet-200'>
            <p className='text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
              Ready to Get Started?
            </p>
          </div>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-4'>
            See the <span className='gradient-text'>magic</span>. Try now
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Upload your image and watch our AI remove the background in seconds
          </p>
        </div>
        
        <div className='text-center mt-8 max-w-md mx-auto'>
          <input onChange={e=>removeBg(e.target.files[0])} type="file" id="upload2" accept='image/*' hidden />
          <label 
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden" 
            htmlFor="upload2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <img 
              width={22} 
              src={assets.upload_btn_icon} 
              alt="Upload" 
              className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <p className="text-white text-base font-semibold relative z-10">Upload your image</p>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </label>
          
          {/* Features */}
          <div className='mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 font-bold'>✓</span>
              <span>Instant processing</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 font-bold'>✓</span>
              <span>High quality</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-green-500 font-bold'>✓</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Upload