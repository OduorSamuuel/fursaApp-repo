import React from 'react'
import Layout from '@/Layouts/Layout'
import Cardbox from '@/Components/Services/Cardbox'
import ServicesLeft from '@/Layouts/ServicesLeft'

function Services({auth} ) {
  return (
    <Layout auth={auth}>
      <ServicesLeft>
        <h1 className='text-2xl text-center m-5'>Find services</h1>
        <div className= '  justify-center overflow-hidden sm:grid    md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-4'>
          {/* Adjust the number of Cardbox components displayed based on screen size */}
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
          <Cardbox/>
        </div>
      </ServicesLeft>
    </Layout>
  )
}

export default Services
