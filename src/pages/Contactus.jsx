import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contactus = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [contactInfo, setContactInfo] = useState({
    office: '',
    mobile: '',
    email: '',
    mapUrl: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${API_URL}/travelaapi/contact-info`);
        setContactInfo(res.data);
      } catch (err) {
        console.error("❌ Error fetching contact info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div>
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h3 className="text-white display-3 mb-4">Contact Us</h3>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Contact</li>
          </ol>
        </div>
      </div>

      <div className="container-fluid contact bg-light py-5">
        <div className="container py-5">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
            <h5 className="section-title px-3">Contact Us</h5>
            <h1 className="mb-0">Contact For Any Query</h1>
          </div>
          <div className="row  align-items-center">
            <div >
              <div className="bg-white rounded p-4">
                <div className="text-center mb-4">
                  <i className="fa fa-map-marker-alt fa-3x text-primary"></i>
                  <h4 className="text-primary">Address</h4>
                  <p className="mb-0">{contactInfo.office || 'Loading...'}</p>
                </div>
                <div className="text-center mb-4">
                  <i className="fa fa-phone-alt fa-3x text-primary mb-3"></i>
                  <h4 className="text-primary">Mobile</h4>
                  <p className="mb-0">{contactInfo.mobile || 'Loading...'}</p>

                </div>

                <div className="text-center">
                  <i className="fa fa-envelope-open fa-3x text-primary mb-3"></i>
                  <h4 className="text-primary">Email</h4>
                  <p className="mb-0">{contactInfo.email || 'Loading...'}</p>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="rounded">
                {contactInfo.mapUrl ? (
                  <iframe
                    className="rounded w-100"
                    style={{ height: '450px' }}
                    src={contactInfo.mapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex={0}
                  />
                ) : (
                  <iframe
                    className="rounded w-100"
                    style={{ height: '450px' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex={0}
                  />
                   )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;