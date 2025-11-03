import React, { useState, useEffect } from "react";
import axios from "axios";

const Destination = () => {

    const API_URL = process.env.REACT_APP_API_URL;

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <div className="container-fluid destination py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
          <h5 className="section-title px-3">Destination</h5>
          <h1 className="mb-0">Popular Destination</h1>
        </div>

        <div className="row g-4">
         {packages.map((pkg, index) => (
            <div key={pkg._id} className="col-lg-3 col-md-6">
              <div className="destination-item">
                <div className="destination-img">
                  <img 
                    src={`${API_URL}/uploads/${pkg.image}`}
                    className="img-fluid w-100 rounded" 
                  />
                </div>
                <div className="destination-content bg-light p-4">
                  <h5 className="mb-0">{pkg.place}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destination