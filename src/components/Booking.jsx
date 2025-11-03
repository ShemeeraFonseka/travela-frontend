import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);



    // Icons for each step (in the same order as DB steps)
    const stepIcons = [
        "fa fa-globe fa-3x text-white",      // Step 1
        "fa fa-dollar-sign fa-3x text-white", // Step 2
        "fa fa-plane fa-3x text-white",       // Step 3
    ];
    useEffect(() => {
        fetchPackages();
    }, []);

    const [packages, setPackages] = useState([]);

    const [bookingFormData, setBookingFormData] = useState({
        name: '',
        email: '',
        bookingdatetime: '',
        destination: '',
        request: ''
    });

    const handleBookingInputChange = (e) => {
        setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
    };

    const fetchPackages = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/packages`);
            setPackages(res.data);
        } catch (err) {
            console.error('Error fetching packages:', err);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add current datetime when saving
            const bookingData = {
                ...bookingFormData,
                datetime: new Date().toISOString().slice(0, 19).replace('T', ' ') // Format: YYYY-MM-DD HH:MM:SS
            };

            await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/bookings`, bookingData);
            alert('Booking created successfully');

            // Reset form
            setBookingFormData({
                name: '',
                email: '',
                bookingdatetime: '',
                destination: '',
                request: ''
            });
        } catch (err) {
            console.error(err);
            alert('Error saving Booking');
        }
    };


    return (
        <div className="container-fluid booking py-5">
            <div className="container py-5">
                <div className="row g-5 align-items-center">

                    <div>
                        <h1 className="text-white mb-3">Book A Tour Deals</h1>
                        <form onSubmit={handleBookingSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control bg-white border-0" id="name" placeholder="Your Name" name="name"
                                            value={bookingFormData.name}
                                            onChange={handleBookingInputChange}
                                            required />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control bg-white border-0" id="email" placeholder="Your Email" name="email"
                                            value={bookingFormData.email}
                                            onChange={handleBookingInputChange}
                                            required />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="datetime-local" className="form-control bg-white border-0" id="bookingdatetime" placeholder="Date & Time" name="bookingdatetime"
                                            value={bookingFormData.bookingdatetime}
                                            onChange={handleBookingInputChange}
                                            required />
                                        <label htmlFor="datetime">Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select bg-white border-0" id="destination" name="destination"
                                            value={bookingFormData.destination}
                                            onChange={handleBookingInputChange}
                                            required>
                                            <option value="">Select Destination</option>
                                            {packages.map((pkg) => (
                                                <option key={pkg.id} value={pkg.place}>
                                                    {pkg.place}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="destination">Destination</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control bg-white border-0" placeholder="Special Request" id="request" name="request"
                                            value={bookingFormData.request}
                                            onChange={handleBookingInputChange} style={{ height: '100px' }}></textarea>
                                        <label htmlFor="message">Special Request</label>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
  <button class="btn btn-primary text-white w-50 py-3" type="submit">Book Now</button>
</div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking