import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Bgslide from '../Components/Bgslide'
import Testimonial from '../Components/Testimonial'
import Upload from '../Components/Upload'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Bgslide/>
      <Testimonial/>
      <Upload/>
    </div>
  )
}

export default Home