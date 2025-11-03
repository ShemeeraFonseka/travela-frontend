import React from 'react'

const Explore = () => {
  return (
    <div className="container-fluid ExploreTour py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mb-5" style={{maxWidth: '900px'}}>
                    <h5 className="section-title px-3">Explore Tour</h5>
                    <h1 className="mb-4">The World</h1>
                </div>
                <div className="tab-class text-center">
                   
                    <div className="tab-content">
                        <div id="NationalTab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-1.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Weekend Tour</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-2.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Holiday Tour</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-3.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Road Trip</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-4.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Historical Trip</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-5.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Family Tour</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="national-item">
                                        <img src="img/explore-tour-6.jpg" className="img-fluid w-100 rounded" alt="Image" />
                                        <div className="national-content">
                                            <div className="national-info">
                                                <h5 className="text-white text-uppercase mb-2">Beach Tour</h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Explore