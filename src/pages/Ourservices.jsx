import React from 'react'
import Services from '../components/Services'

const Ourservices = () => {
  return (
    <div>
        <div class="container-fluid bg-breadcrumb">
            <div class="container text-center py-5" style={{ maxWidth: '900px' }}>
                <h3 class="text-white display-3 mb-4">Our Services</h3>
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Pages</a></li>
                    <li class="breadcrumb-item active text-white">Services</li>
                </ol>    
            </div>
        </div>
        <Services/>
  </div>
  )
}

export default Ourservices