import React from 'react'
import Shape from '../../components/Hero_section/hero_shape'
import Box from '../../components/Hero_section/glasspane'
import Navbar from '../../components/navbar/navbar'
import './Homepage.css'

const Home = () => {
  return (
    <div className='bg-[#242424]'>
      <Navbar/>
      <div className="main_container">
        <Shape/>
        <div className="box_container">
          <Box/>
          <Box/>
        </div>
      </div>
    </div>
  )
}

export default Home