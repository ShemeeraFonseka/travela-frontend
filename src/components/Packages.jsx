import React, { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null); // for modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${API_URL}/travelaapi/packages`);
        setPackages(res.data);
      } catch (err) {
        console.error("❌ Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container-fluid packages py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
          <h5 className="section-title px-3">Packages</h5>
          <h1 className="mb-0">Awesome Packages</h1>
        </div>

        <div className="row g-4">
         {packages.map((pkg, index) => (
            <div  key={pkg.packageID || index} className="col-lg-3 col-md-6">
              <div className="packages-item">
                <div className="packages-img">
                  <img src={`${API_URL}/uploads/${pkg.image}`} className="img-fluid w-100 rounded-top" alt="Image" />
                  <div className="packages-info d-flex border border-start-0 border-end-0 position-absolute" style={{ width: '100%', bottom: '0', left: '0', zIndex: '5' }}>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt me-2"></i>{pkg.place}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-calendar-alt me-2"></i>{pkg.days} days
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user me-2"></i>{pkg.persons} Person
                    </small>
                  </div>
                  <div className="packages-price py-2 px-4">{pkg.price}</div>
                </div>
                <div className="packages-content bg-light">
                  <div className="p-4 pb-0">
                    <div className="mb-3">
                     {[...Array(pkg.stars)].map((_, i) => (
                          <small key={i} className="fa fa-star text-primary" />
                        ))}
                    </div>
                    <p className="mb-4">{pkg.description.substring(0, 60)}...</p>
                  </div>
                  <div className="row bg-primary rounded-bottom mx-0">
                    
                    <div className=" text-center px-0">
                      <a href="#" className="btn-hover btn text-white py-2 px-4">Book Now</a>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Packages