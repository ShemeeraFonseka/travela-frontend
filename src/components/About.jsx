import React, { useState, useEffect } from "react";
import axios from "axios";

const About = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const res = await axios.get(`${API_URL}/travelaapi/about`);
        setAbouts(res.data);
      } catch (err) {
        console.error("❌ Error fetching Content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <div>
      <div className="container-fluid about py-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div
                className="h-100"
                style={{
                  border: "50px solid",
                  borderColor: "transparent #13357B transparent #13357B",
                }}
              >
                <img
                  src="img/about-img.jpg"
                  className="img-fluid w-100 h-100"
                  alt=""
                />
              </div>
            </div>
            <div
              className="col-lg-7"
              style={{
                background: `linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)), url(img/about-img-1.png)`,
              }}
            >
              <h5 className="section-about-title pe-3">About Us</h5>
              <h1 className="mb-4">
                Welcome to <span className="text-primary">Travela</span>
              </h1>
              <p className="mb-4">
                {abouts[0]?.para1}
              </p>
              <p className="mb-4">
                {abouts[0]?.para2}
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line1}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line2}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line3}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line4}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line5}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {abouts[0]?.line6}
                  </p>
                </div>
              </div>
              <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="#">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
