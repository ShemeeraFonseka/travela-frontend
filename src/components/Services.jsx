import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get(`${API_URL}/travelaapi/services`);
                setServices(res.data);
            } catch (err) {
                console.error("❌ Error fetching servvices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Icons for each step (in the same order as DB steps)
    const serviceIcons = [
        "fa fa-3x fa-globe text-primary mb-4",
        "fa fa-3x fa-hotel text-primary mb-4",
        "fa fa-3x fa-user text-primary mb-4",
        "fa fa-3x fa-cog text-primary mb-4"
    ];

    return (
        <div class="container-fluid bg-light service py-5">
            <div class="container py-5">
                <div class="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                    <h5 class="section-title px-3">Services</h5>
                    <h1 class="mb-0">Our Services</h1>
                </div>
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="row g-4">
                            {services.map((service, index) => (
                                <div key={index} class="col-12">
                                    <div class="service-content-inner d-flex align-items-center bg-white border border-primary rounded p-4 pe-0">
                                        <div class="service-content text-end">
                                            <h5 class="mb-4">{service.topic}</h5>
                                            <p class="mb-0">{service.description}
                                            </p>
                                        </div>
                                        <div class="service-icon p-4">
                                            <i className={
                                                serviceIcons[index] ||
                                                "fa fa-3x fa-globe text-primary mb-4"
                                            }></i>
                                        </div>
                                    </div>
                                </div>



                            ))}
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="text-center">
                            <a class="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">Service More</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Services