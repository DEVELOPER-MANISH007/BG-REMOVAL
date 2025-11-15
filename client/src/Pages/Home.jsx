import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Bgslide from '../Components/Bgslide'
import Testimonial from '../Components/Testimonial'
import Upload from '../Components/Upload'

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Header/>
      </section>

      {/* Steps Section */}
      <section className="relative bg-white/50 backdrop-blur-sm">
        <Steps/>
      </section>

      {/* Comparison Section */}
      <section className="relative bg-gradient-to-b from-white to-violet-50/30">
        <Bgslide/>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-white/50 backdrop-blur-sm">
        <Testimonial/>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-b from-violet-50/30 to-white">
        <Upload/>
      </section>
    </div>
  )
}

export default Home