import React from 'react'
import About from '../components/About'
import Services from '../components/Services'
import Destination from '../components/Destination'
import Explore from '../components/Explore'
import Packages from '../components/Packages'
import Booking from '../components/Booking'
import Guides from '../components/Guides'
import Carousel from '../components/Carousel'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <About />
      <Services />
      <Destination />
      <Explore />
      <Packages />
      <Booking />
      <Guides />
    </div>
  )
}

export default Home