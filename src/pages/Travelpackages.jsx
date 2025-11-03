import React from 'react'
import Packages from '../components/Packages'
import Booking from '../components/Booking'

const Travelpackages = () => {
  return (
    <div>
        <div class="container-fluid bg-breadcrumb">
            <div class="container text-center py-5" style={{ maxWidth: '900px' }}>
                <h3 class="text-white display-3 mb-4">Travel Packages</h3>
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Pages</a></li>
                    <li class="breadcrumb-item active text-white">Packages</li>
                </ol>    
            </div>
        </div>
        <Packages/>
        <Booking/>    </div>
  )
}

export default Travelpackages