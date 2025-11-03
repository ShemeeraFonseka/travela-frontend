import React, { useState, useEffect } from "react";
import axios from "axios";

const Guides = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [loading, setLoading] = useState(true);

    const [guides, setGuides] = useState([]);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await axios.get(`${API_URL}/travelaapi/guides`);
                setGuides(res.data);
            } catch (err) {
                console.error("❌ Error fetching guides:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    return (
        <div className="container-fluid guide py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                    <h5 className="section-title px-3">Travel Guide</h5>
                    <h1 className="mb-0">Meet Our Guide</h1>
                </div>
                <div className="row g-4">
                    {guides.map((guide, index) => (
                        <div className="col-md-6 col-lg-3">
                            <div className="guide-item">
                                <div className="guide-img">
                                    <div className="guide-img-efects">
                                        <img src={`${API_URL}/uploads/${guide.image}`}  className="img-fluid w-100 rounded-top" alt="Image" />
                                    </div>

                                </div>
                                <div className="guide-title text-center rounded-bottom p-4">
                                    <div className="guide-title-inner">
                                        <h4 className="mt-3">{guide.name}</h4>
                                        <p className="mb-0">{guide.designation}</p>
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

export default Guides