import './AdminDashboard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminDashboard = () => {

    

    const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalPackages: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalGuides: 0,
    recentBookings: [],
    monthlyRevenue: 0,
    popularPackages: []
});

// Add this useEffect to fetch dashboard data when component mounts
useEffect(() => {
    fetchDashboardData();
}, []);

// Add this fetch function
const fetchDashboardData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/dashboard/stats`);
        setDashboardStats(response.data);
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
    }
};

    const navigate = useNavigate();
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear localStorage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            // Redirect to login page
            navigate('/admin/login');
        }
    }

    const [sidebarActive, setSidebarActive] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');

    // Packages state
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        place: '',
        days: '',
        persons: '',
        price: '',
        stars: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Guides state
    const [guides, setGuides] = useState([]);
    const [guideformData, setGuideFormData] = useState({
        name: '',
        designation: ''
    });
    const [guideimage, setGuideImage] = useState(null);
    const [guidepreview, setGuidePreview] = useState(null);
    const [editingGuideId, setEditingGuideId] = useState(null);

    // Contact Satate
    // Add these states at the top with other states
    const [contactInfo, setContactInfo] = useState([]);
    const [contactFormData, setContactFormData] = useState({
        office: '',
        mobile: '',
        email: '',
        mapUrl: ''
    });
    const [contactEditingId, setContactEditingId] = useState(null);

    // Steps state
    const [steps, setSteps] = useState([]);
    const [stepFormData, setStepFormData] = useState({
        topic: '',
        description: ''
    });
    const [stepEditingId, setStepEditingId] = useState(null);

    // About state
    const [abouts, setAbouts] = useState([]);
    const [aboutFormData, setAboutFormData] = useState({
        para1: '',
        para2: '',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: '',
        line6: ''
    });
    const [aboutEditingId, setAboutEditingId] = useState(null);

    // Services state
    const [services, setServices] = useState([]);
    const [serviceFormData, setServiceFormData] = useState({
        topic: '',
        description: ''
    });
    const [serviceEditingId, setServiceEditingId] = useState(null);

    // Bookings state
    const [bookings, setBookings] = useState([]);
    const [bookingStats, setBookingStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        cancelled: 0
    });
    const [bookingFilter, setBookingFilter] = useState('all');
    const [bookingSearch, setBookingSearch] = useState('');

    useEffect(() => {
        if (activeSection === 'packages') {
            fetchPackages();
        }
        if (activeSection === 'bookings') {
            fetchSteps();
            fetchBookings();
        }
        if (activeSection === 'services') {
            fetchServices();
        }
        if (activeSection === 'guides') {
            fetchGuides();
        }
        if (activeSection === 'about') {
            fetchAbouts();
        }
        if (activeSection === 'contact') {
            fetchContactInfo();
        }
    }, [activeSection]);

    const fetchPackages = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/packages`);
            setPackages(res.data);
        } catch (err) {
            console.error('Error fetching packages:', err);
        }
    };

    const fetchGuides = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/guides`);
            setGuides(res.data);
        } catch (err) {
            console.error('Error fetching guides:', err);
        }
    };

    const fetchSteps = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/bookingSteps`);
            setSteps(res.data);
        } catch (err) {
            console.error('Error fetching steps:', err);
        }
    };

    const fetchAbouts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/about`);
            setAbouts(res.data);
        } catch (err) {
            console.error('Error fetching Content:', err);
        }
    };

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/services`);
            setServices(res.data);
        } catch (err) {
            console.error('Error fetching services:', err);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/bookings`);
            setBookings(res.data);
            calculateBookingStats(res.data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const fetchContactInfo = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/contact-info`);
            setContactInfo([res.data]); // Wrap in array for table display
        } catch (err) {
            console.error('Error fetching contact info:', err);
        }
    };

    const handleContactInputChange = (e) => {
        setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            if (contactEditingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/contact-info/${contactEditingId}`, contactFormData);
                alert('Contact info updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/contact-info`, contactFormData);
                alert('Contact info created successfully');
            }

            setContactFormData({ office: '', mobile: '', email: '', mapUrl: '' });
            setContactEditingId(null);
            fetchContactInfo();
        } catch (err) {
            console.error(err);
            alert('Error saving contact info');
        }
    };

    const handleContactEdit = (contact) => {
        setContactEditingId(contact._id);
        setContactFormData({
            office: contact.office,
            mobile: contact.mobile,
            email: contact.email,
            mapUrl: contact.mapUrl,
            description: contact.description
        });
    };

    const calculateBookingStats = (bookingData) => {
        const stats = {
            total: bookingData.length,
            pending: bookingData.filter(b => b.status === 'pending').length,
            confirmed: bookingData.filter(b => b.status === 'confirmed').length,
            cancelled: bookingData.filter(b => b.status === 'cancelled').length
        };
        setBookingStats(stats);
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/travelaapi/bookings/${bookingId}/status`, {
                status: newStatus
            });

            const updatedBookings = bookings.map(booking =>
                booking._id === bookingId
                    ? { ...booking, status: newStatus }
                    : booking
            );
            setBookings(updatedBookings);
            calculateBookingStats(updatedBookings);

            alert(`Booking status updated to ${newStatus}`);
        } catch (err) {
            console.error("Error updating booking status:", err);
            alert("Error updating booking status");
        }
    };

    const deleteBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/travelaapi/bookings/${bookingId}`);

                const updatedBookings = bookings.filter(booking => booking._id !== bookingId);
                setBookings(updatedBookings);
                calculateBookingStats(updatedBookings);

                alert('Booking deleted successfully');
            } catch (err) {
                console.error("Error deleting booking:", err);
                alert("Error deleting booking");
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'confirmed': return 'status-confirmed';
            case 'cancelled': return 'status-cancelled';
            default: return 'status-default';
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = bookingFilter === 'all' || booking.status === bookingFilter;
        const matchesSearch = booking.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
            booking.email?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
            booking.destination?.toLowerCase().includes(bookingSearch.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatDateTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString();
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuideInputChange = (e) => {
        setGuideFormData({ ...guideformData, [e.target.name]: e.target.value });
    };

    const handleStepInputChange = (e) => {
        setStepFormData({ ...stepFormData, [e.target.name]: e.target.value });
    };

    const handleAboutInputChange = (e) => {
        setAboutFormData({ ...aboutFormData, [e.target.name]: e.target.value });
    };

    const handleServiceInputChange = (e) => {
        setServiceFormData({ ...serviceFormData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleGuideImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGuideImage(file);
            setGuidePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            if (image) {
                data.append('image', image);
            }

            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/packages/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Package updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/packages`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Package created successfully');
            }

            setFormData({ place: '', days: '', persons: '', price: '', stars: '', description: '' });
            setImage(null);
            setPreview(null);
            setEditingId(null);
            fetchPackages();
        } catch (err) {
            console.error(err);
            alert('Error saving package');
        }
    };

    const handleGuideSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(guideformData).forEach((key) => {
                data.append(key, guideformData[key]);
            });
            if (guideimage) {
                data.append('image', guideimage);
            }

            if (editingGuideId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/guides/${editingGuideId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Guide updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/guides`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Guide created successfully');
            }

            setGuideFormData({ name: '', designation: '' });
            setGuideImage(null);
            setGuidePreview(null);
            setEditingGuideId(null);
            fetchGuides();
        } catch (err) {
            console.error(err);
            alert('Error saving guide');
        }
    };

    const handleStepSubmit = async (e) => {
        e.preventDefault();
        try {
            if (stepEditingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/bookingSteps/${stepEditingId}`, stepFormData);
                alert('Step updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/bookingSteps`, stepFormData);
                alert('Step created successfully');
            }

            setStepFormData({ topic: '', description: '' });
            setStepEditingId(null);
            fetchSteps();
        } catch (err) {
            console.error(err);
            alert('Error saving step');
        }
    };

    const handleAboutSubmit = async (e) => {
        e.preventDefault();
        try {
            if (aboutEditingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/about/${aboutEditingId}`, aboutFormData);
                alert('Content updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/about`, aboutFormData);
                alert('Content created successfully');
            }

            setAboutFormData({ para1: '', para2: '', line1: '', line2: '', line3: '', line4: '', line5: '', line6: '' });
            setAboutEditingId(null);
            fetchAbouts();
        } catch (err) {
            console.error(err);
            alert('Error saving content');
        }
    };


    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        try {
            if (serviceEditingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/services/${serviceEditingId}`, serviceFormData);
                alert('Service updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/services`, serviceFormData);
                alert('Service created successfully');
            }

            setServiceFormData({ topic: '', description: '' });
            setServiceEditingId(null);
            fetchServices();
        } catch (err) {
            console.error(err);
            alert('Error saving Service');
        }
    };


    const handleEdit = (pkg) => {
        setEditingId(pkg._id);
        setFormData({
            place: pkg.place,
            days: pkg.days,
            persons: pkg.persons,
            price: pkg.price,
            stars: pkg.stars,
            description: pkg.description
        });
        setPreview(pkg.image ? `${process.env.REACT_APP_API_URL}/${pkg.image}` : null);
        setImage(null);
    };

    const handleGuideEdit = (guide) => {
        setEditingGuideId(guide._id);
        setGuideFormData({
            name: guide.name,
            designation: guide.designation
        });
        setGuidePreview(guide.guideimage ? `${process.env.REACT_APP_API_URL}/${guide.guideimage}` : null);
        setGuideImage(null);
    };

    const handleStepEdit = (step) => {
        setStepEditingId(step._id);
        setStepFormData({
            topic: step.topic,
            description: step.description
        });
    };

    const handleAboutEdit = (about) => {
        setAboutEditingId(about._id);
        setAboutFormData({
            para1: about.para1,
            para2: about.para2,
            line1: about.line1,
            line2: about.line2,
            line3: about.line3,
            line4: about.line4,
            line5: about.line5,
            line6: about.line6
        });
    };


    const handleServiceEdit = (service) => {
        setServiceEditingId(service._id);
        setServiceFormData({
            topic: service.topic,
            description: service.description
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/travelaapi/packages/${id}`);
                fetchPackages();
            } catch (err) {
                console.error(err);
                alert('Error deleting package');
            }
        }
    };

    const handleGuideDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this guide?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/travelaapi/guides/${id}`);
                fetchGuides();
            } catch (err) {
                console.error(err);
                alert('Error deleting guide');
            }
        }
    };

    const handleStepDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this step?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/travelaapi/bookingSteps/${id}`);
                fetchSteps();
            } catch (err) {
                console.error(err);
                alert('Error deleting step');
            }
        }
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (window.innerWidth <= 768) {
            setSidebarActive(false);
        }
    };

    const [users, setUsers] = useState([]);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active'
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [userStats, setUserStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        newThisMonth: 0
    });
    const [userSearch, setUserSearch] = useState('');

    // Add to useEffect dependencies
    useEffect(() => {
        if (activeSection === 'users') {
            fetchUsers();
            fetchUserStats();
        }
        // ... rest of your existing useEffect code
    }, [activeSection]);

    // Fetch functions
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/users`);
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            alert('Error fetching users');
        }
    };

    const fetchUserStats = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/travelaapi/users/stats/summary`);
            setUserStats(res.data);
        } catch (err) {
            console.error('Error fetching user stats:', err);
        }
    };

    // Handler functions
    const handleUserInputChange = (e) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                // Don't send password if it's empty during edit
                const updateData = { ...userFormData };
                if (!updateData.password) {
                    delete updateData.password;
                }

                await axios.put(`${process.env.REACT_APP_API_URL}/travelaapi/users/${editingUserId}`, updateData);
                alert('User updated successfully');
            } else {
                if (!userFormData.password) {
                    alert('Password is required for new users');
                    return;
                }
                await axios.post(`${process.env.REACT_APP_API_URL}/travelaapi/users`, userFormData);
                alert('User created successfully');
            }

            setUserFormData({ name: '', email: '', password: '', role: 'user', status: 'active' });
            setEditingUserId(null);
            setShowUserForm(false);
            fetchUsers();
            fetchUserStats();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Error saving user');
        }
    };

    const handleUserEdit = (user) => {
        setEditingUserId(user._id);
        setUserFormData({
            name: user.name,
            email: user.email,
            password: '', // Don't populate password for security
            role: user.role,
            status: user.status
        });
        setShowUserForm(true);
    };

    const handleUserDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/travelaapi/users/${id}`);
                alert('User deleted successfully');
                fetchUsers();
                fetchUserStats();
            } catch (err) {
                console.error(err);
                alert('Error deleting user');
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const searchLower = userSearch.toLowerCase();
        return user.name?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower) ||
            user.role?.toLowerCase().includes(searchLower);
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString();
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
    return (
        <div className="content-wrapper">
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">Dashboard Overview</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                        Real-time statistics and insights
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="users-content">
                    <div className="users-stats">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                                    <h5 style={{ color: 'rgba(255,255,255,0.9)' }}>Total Bookings</h5>
                                    <h3 style={{ color: 'white' }}>{dashboardStats.totalBookings}</h3>
                                    <small style={{ color: 'rgba(255,255,255,0.8)' }}>All time bookings</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                                    <h5 style={{ color: 'rgba(255,255,255,0.9)' }}>Pending Bookings</h5>
                                    <h3 style={{ color: 'white' }}>{dashboardStats.pendingBookings}</h3>
                                    <small style={{ color: 'rgba(255,255,255,0.8)' }}>Needs attention</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                                    <h5 style={{ color: 'rgba(255,255,255,0.9)' }}>Confirmed Bookings</h5>
                                    <h3 style={{ color: 'white' }}>{dashboardStats.confirmedBookings}</h3>
                                    <small style={{ color: 'rgba(255,255,255,0.8)' }}>Active bookings</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
                                    <h5 style={{ color: 'rgba(255,255,255,0.9)' }}>Total Revenue</h5>
                                    <h3 style={{ color: 'white' }}>Rs.{dashboardStats.monthlyRevenue?.toLocaleString()}</h3>
                                    <small style={{ color: 'rgba(255,255,255,0.8)' }}>This month</small>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Stats */}
                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h5>Total Packages</h5>
                                    <h3>{dashboardStats.totalPackages}</h3>
                                    <small className="text-info">Available tours</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h5>Total Users</h5>
                                    <h3>{dashboardStats.totalUsers}</h3>
                                    <small className="text-success">{dashboardStats.activeUsers} active</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h5>Tour Guides</h5>
                                    <h3>{dashboardStats.totalGuides}</h3>
                                    <small className="text-info">Active guides</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h5>Cancelled</h5>
                                    <h3>{dashboardStats.cancelledBookings}</h3>
                                    <small className="text-warning">This month</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Bookings Section */}
                    <div style={{ marginTop: '30px' }}>
                        <div className="dashboard-card">
                            <div className="card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>Recent Bookings</h3>
                            </div>
                            <div className="users-table">
                                {dashboardStats.recentBookings && dashboardStats.recentBookings.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer</th>
                                                <th>Destination</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dashboardStats.recentBookings.map(booking => (
                                                <tr key={booking._id}>
                                                    <td>#{booking._id}</td>
                                                    <td>{booking.name}</td>
                                                    <td>{booking.destination}</td>
                                                    <td>{new Date(booking.bookingdatetime).toLocaleDateString()}</td>
                                                    <td>
                                                        <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                                                            {booking.status?.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn-action edit"
                                                            onClick={() => handleSectionChange('bookings')}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '10px', opacity: 0.3 }}></i>
                                        <p>No recent bookings</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Popular Packages Section */}
                    <div style={{ marginTop: '30px' }}>
                        <div className="dashboard-card">
                            <div className="card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>Popular Packages</h3>
                            </div>
                            <div className="row">
                                {dashboardStats.popularPackages && dashboardStats.popularPackages.length > 0 ? (
                                    dashboardStats.popularPackages.map((pkg, index) => (
                                        <div className="col-md-4" key={pkg.packageID}>
                                            <div className="dashboard-card" style={{ 
                                                border: '1px solid #e2e8f0',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                    <span style={{ 
                                                        background: '#4fce5a', 
                                                        color: 'white', 
                                                        padding: '4px 12px', 
                                                        borderRadius: '20px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        #{index + 1}
                                                    </span>
                                                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                        {pkg.bookingCount} bookings
                                                    </span>
                                                </div>
                                                <h4 style={{ margin: '10px 0', color: '#1e293b' }}>{pkg.place}</h4>
                                                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                    <div>Rs.{pkg.price?.toLocaleString()} per person</div>
                                                    <div>{pkg.days} days • {pkg.persons} persons</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-md-12" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                        <i className="fas fa-box-open" style={{ fontSize: '3rem', marginBottom: '10px', opacity: 0.3 }}></i>
                                        <p>No package data available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
            case 'users':
                return (
                    <div className="content-wrapper">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">User Management</h2>
                            </div>

                            {/* User Statistics */}
                            <div className="users-content">
                                <div className="users-stats">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <h5>Total Users</h5>
                                                <h3>{userStats.total}</h3>
                                                <small className="text-success">All registered users</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <h5>Active Users</h5>
                                                <h3>{userStats.active}</h3>
                                                <small className="text-success">Currently active</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <h5>New This Month</h5>
                                                <h3>{userStats.newThisMonth}</h3>
                                                <small className="text-warning">Last 30 days</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <h5>Inactive Users</h5>
                                                <h3>{userStats.inactive}</h3>
                                                <small className="text-info">Deactivated</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* User Form */}
                                {showUserForm && (
                                    <div className="package-form" style={{ marginTop: '20px' }}>
                                        <h4>{editingUserId ? 'Edit User' : 'Add New User'}</h4>
                                        <form onSubmit={handleUserSubmit}>
                                            <input
                                                name="name"
                                                placeholder="Full Name"
                                                value={userFormData.name}
                                                onChange={handleUserInputChange}
                                                required
                                            />
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Email Address"
                                                value={userFormData.email}
                                                onChange={handleUserInputChange}
                                                required
                                            />
                                            <input
                                                name="password"
                                                type="password"
                                                placeholder={editingUserId ? "New Password (leave blank to keep current)" : "Password"}
                                                value={userFormData.password}
                                                onChange={handleUserInputChange}
                                                required={!editingUserId}
                                            />
                                            <select
                                                name="role"
                                                value={userFormData.role}
                                                onChange={handleUserInputChange}
                                                required
                                            >
                                                <option value="user">User</option>
                                                <option value="agent">Agent</option>
                                                <option value="editor">Editor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <select
                                                name="status"
                                                value={userFormData.status}
                                                onChange={handleUserInputChange}
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                            <button type="submit">
                                                {editingUserId ? 'Update User' : 'Create User'}
                                            </button>
                                            <button type="button" onClick={() => {
                                                setEditingUserId(null);
                                                setUserFormData({ name: '', email: '', password: '', role: 'user', status: 'active' });
                                                setShowUserForm(false);
                                            }}>Cancel</button>
                                        </form>
                                    </div>
                                )}

                                {/* Users Table Section */}
                                <div className="users-table-section" style={{ marginTop: '20px' }}>
                                    <div className="table-header">
                                        <h4>All Users ({filteredUsers.length})</h4>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                placeholder="Search users..."
                                                value={userSearch}
                                                onChange={(e) => setUserSearch(e.target.value)}
                                                style={{
                                                    padding: '8px 12px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #ddd',
                                                    minWidth: '200px'
                                                }}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setShowUserForm(true);
                                                    setEditingUserId(null);
                                                    setUserFormData({ name: '', email: '', password: '', role: 'user', status: 'active' });
                                                }}
                                            >
                                                Add New User
                                            </button>
                                        </div>
                                    </div>
                                    <div className="users-table">
                                        {filteredUsers.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                                No users found.
                                            </div>
                                        ) : (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Last Login</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map(user => (
                                                        <tr key={user._id}>
                                                            <td>{user._id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                <span className={`role-badge role-${user.role}`}>
                                                                    {user.role.toUpperCase()}
                                                                </span>
                                                            </td>
                                                            <td>{formatDate(user.lastLogin)}</td>
                                                            <td>
                                                                <span className={`status ${user.status}`}>
                                                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn-action edit"
                                                                    onClick={() => handleUserEdit(user)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn-action delete"
                                                                    onClick={() => handleUserDelete(user._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'packages':
                return (
                    <div className="content-wrapper">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">Tour Packages</h2>
                            </div>

                            {/* Form */}
                            <div className="package-form">
                                <h4>{editingId ? 'Edit Package' : 'Add New Package'}</h4>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input name="place" placeholder="Place" value={formData.place} onChange={handleInputChange} required />
                                    <input name="days" type="number" placeholder="Days" value={formData.days} onChange={handleInputChange} required />
                                    <input name="persons" type="number" placeholder="Persons" value={formData.persons} onChange={handleInputChange} required />
                                    <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                                    <input name="stars" type="number" placeholder="Stars" value={formData.stars} onChange={handleInputChange} required />
                                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />

                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                    {preview && <img src={preview} alt="Preview" width="150" style={{ marginTop: '10px', borderRadius: '10px' }} />}

                                    <button type="submit">{editingId ? 'Update Package' : 'Create Package'}</button>
                                    {editingId && <button type="button" onClick={() => {
                                        setEditingId(null);
                                        setFormData({ place: '', days: '', persons: '', price: '', stars: '', description: '' });
                                        setImage(null);
                                        setPreview(null);
                                    }}>Cancel</button>}
                                </form>
                            </div>

                            {/* Packages Table */}
                            <div className="packages-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Place</th>
                                            <th>Days</th>
                                            <th>Persons</th>
                                            <th>Price</th>
                                            <th>Stars</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {packages.map(pkg => (
                                            <tr key={pkg._id}>
                                                <td>
                                                    {pkg.image ? (
                                                        <img src={`${process.env.REACT_APP_API_URL}/${pkg.image}`} alt={pkg.place} width="80" />
                                                    ) : 'No Image'}
                                                </td>
                                                <td>{pkg.place}</td>
                                                <td>{pkg.days}</td>
                                                <td>{pkg.persons}</td>
                                                <td>Rs.{pkg.price}</td>
                                                <td>{pkg.stars}</td>
                                                <td>{pkg.description}</td>
                                                <td>
                                                    <button className='btn-action edit' onClick={() => handleEdit(pkg)}>Edit</button><br /><br />
                                                    <button className='btn-action delete' onClick={() => handleDelete(pkg._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'guides':
                return (
                    <div className="content-wrapper">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">Tour Guides</h2>
                            </div>

                            {/* Form */}
                            <div className="package-form">
                                <h4>{editingGuideId ? 'Edit Guides' : 'Add New Guide'}</h4>
                                <form onSubmit={handleGuideSubmit} encType="multipart/form-data">

                                    <input name="name" type="text" placeholder="Name" value={guideformData.name} onChange={handleGuideInputChange} required />
                                    <textarea name="designation" placeholder="Designation" value={guideformData.designation} onChange={handleGuideInputChange} required />

                                    <input type="file" accept="image/*" onChange={handleGuideImageChange} />
                                    {guidepreview && <img src={guidepreview} alt="Preview" width="150" style={{ marginTop: '10px', borderRadius: '10px' }} />}

                                    <button type="submit">{editingGuideId ? 'Update Guide' : 'Create Guide'}</button>
                                    {editingGuideId && <button type="button" onClick={() => {
                                        setEditingGuideId(null);
                                        setGuideFormData({ place: '', days: '', persons: '', price: '', stars: '', description: '' });
                                        setGuideImage(null);
                                        setGuidePreview(null);
                                    }}>Cancel</button>}
                                </form>
                            </div>

                            {/* Guides Table */}
                            <div className="packages-table">
                                <table>
                                    <thead>
                                        <tr>

                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guides.map(guide => (
                                            <tr key={guide._id}>
                                                <td>
                                                    {guide.image ? (
                                                        <img src={`${process.env.REACT_APP_API_URL}/${guide.image}`} alt={guide.name} width="80" />
                                                    ) : 'No Image'}
                                                </td>

                                                <td>{guide.name}</td>
                                                <td>{guide.designation}</td>
                                                <td>
                                                    <button className='btn-action edit' onClick={() => handleGuideEdit(guide)}>Edit</button>
                                                    <button className='btn-action delete' onClick={() => handleGuideDelete(guide._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'bookings':
                return (
                    <div className="content-wrapper">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">Bookings Management</h2>
                            </div>

                            {/* Booking Statistics */}
                            <div className="row" style={{ marginBottom: '30px' }}>
                                <div className="col-md-3">
                                    <div className="dashboard-card">
                                        <h5>Total Bookings</h5>
                                        <h3 style={{ color: '#007bff' }}>{bookingStats.total}</h3>
                                        <small>All time bookings</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card">
                                        <h5>Pending</h5>
                                        <h3 style={{ color: '#ffc107' }}>{bookingStats.pending}</h3>
                                        <small>Awaiting confirmation</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card">
                                        <h5>Confirmed</h5>
                                        <h3 style={{ color: '#28a745' }}>{bookingStats.confirmed}</h3>
                                        <small>Active bookings</small>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="dashboard-card">
                                        <h5>Cancelled</h5>
                                        <h3 style={{ color: '#dc3545' }}>{bookingStats.cancelled}</h3>
                                        <small>Cancelled bookings</small>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Filters and Search */}
                            <div className="booking-filters" style={{ marginBottom: '20px' }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="filter-buttons">
                                            <button
                                                className={bookingFilter === 'all' ? 'btn-filter active' : 'btn-filter'}
                                                onClick={() => setBookingFilter('all')}
                                            >
                                                All ({bookingStats.total})
                                            </button>
                                            <button
                                                className={bookingFilter === 'pending' ? 'btn-filter active' : 'btn-filter'}
                                                onClick={() => setBookingFilter('pending')}
                                            >
                                                Pending ({bookingStats.pending})
                                            </button>
                                            <button
                                                className={bookingFilter === 'confirmed' ? 'btn-filter active' : 'btn-filter'}
                                                onClick={() => setBookingFilter('confirmed')}
                                            >
                                                Confirmed ({bookingStats.confirmed})
                                            </button>
                                            <button
                                                className={bookingFilter === 'cancelled' ? 'btn-filter active' : 'btn-filter'}
                                                onClick={() => setBookingFilter('cancelled')}
                                            >
                                                Cancelled ({bookingStats.cancelled})
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            placeholder="Search by name, email, or destination..."
                                            value={bookingSearch}
                                            onChange={(e) => setBookingSearch(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                border: '1px solid #ddd'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bookings Table */}
                            <div className="bookings-table">
                                <h4>Bookings List ({filteredBookings.length})</h4>
                                {filteredBookings.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                        No bookings found.
                                    </div>
                                ) : (
                                    <table style={{ width: '100%', marginTop: '15px' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Destination</th>
                                                <th>Booking Date</th>
                                                <th>Created</th>
                                                <th>Status</th>
                                                <th>Request</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBookings.map((booking) => (
                                                <tr key={booking._id}>
                                                    <td>{booking._id}</td>
                                                    <td>{booking.name}</td>
                                                    <td>{booking.email}</td>
                                                    <td>{booking.destination}</td>
                                                    <td>{formatDateTime(booking.bookingdatetime)}</td>
                                                    <td>{formatDateTime(booking.datetime)}</td>
                                                    <td>
                                                        <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                                                            {booking.status?.toUpperCase() || 'UNKNOWN'}
                                                        </span>
                                                    </td>
                                                    <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {booking.request || 'No request'}
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            {booking.status === 'pending' && (
                                                                <>
                                                                    <button
                                                                        className="btn-action confirm"
                                                                        onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                                                        title="Confirm Booking"
                                                                    >
                                                                        ✓
                                                                    </button>
                                                                    <button
                                                                        className="btn-action cancel"
                                                                        onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                                                        title="Cancel Booking"
                                                                    >
                                                                        ✗
                                                                    </button>
                                                                </>
                                                            )}
                                                            {booking.status === 'confirmed' && (
                                                                <button
                                                                    className="btn-action pending"
                                                                    onClick={() => updateBookingStatus(booking._id, 'pending')}
                                                                    title="Mark as Pending"
                                                                >
                                                                    ⏱
                                                                </button>
                                                            )}
                                                            {booking.status === 'cancelled' && (
                                                                <button
                                                                    className="btn-action confirm"
                                                                    onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                                                    title="Confirm Booking"
                                                                >
                                                                    ✓
                                                                </button>
                                                            )}
                                                            <button
                                                                className="btn-action delete"
                                                                onClick={() => deleteBooking(booking._id)}
                                                                title="Delete Booking"
                                                            >
                                                                🗑
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Steps Management Section */}
<div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
    <h4>Booking Steps Management</h4>

    <div className="package-form" style={{ marginBottom: '20px' }}>
        <h5>{stepEditingId ? 'Edit Booking Step' : 'Add New Booking Step'}</h5>
        <form onSubmit={handleStepSubmit}>
            <input
                name="topic"
                placeholder="Topic"
                value={stepFormData.topic}
                onChange={handleStepInputChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={stepFormData.description}
                onChange={handleStepInputChange}
                required
            />
            <button type="submit">
                {stepEditingId ? 'Update Step' : 'Create Step'}
            </button>
            {stepEditingId && (
                <button type="button" onClick={() => {
                    setStepEditingId(null);
                    setStepFormData({ topic: '', description: '' });
                }}>Cancel</button>
            )}
        </form>
    </div>

    <div className="packages-table">
        <table>
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {steps.map(step => (
                    <tr key={step._id}>
                        <td>{step.topic}</td>
                        <td>{step.description}</td>
                        <td>
                            <button className='btn-action edit' onClick={() => handleStepEdit(step)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
                        </div>
                    </div>
                );

            case 'services':
    return (
        <div className="content-wrapper">
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">Services Management</h2>
                </div>

                <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                    <h4>Services Management</h4>

                    <div className="package-form" style={{ marginBottom: '20px' }}>
                        <h5>{serviceEditingId ? 'Edit Service' : 'Add New Service'}</h5>
                        <form onSubmit={handleServiceSubmit}>
                            <input
                                name="topic"
                                placeholder="Topic"
                                value={serviceFormData.topic}
                                onChange={handleServiceInputChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={serviceFormData.description}
                                onChange={handleServiceInputChange}
                                required
                            />
                            <button type="submit">
                                {serviceEditingId ? 'Update Service' : 'Create Service'}
                            </button>
                            {serviceEditingId && (
                                <button type="button" onClick={() => {
                                    setServiceEditingId(null);
                                    setServiceFormData({ topic: '', description: '' });
                                }}>Cancel</button>
                            )}
                        </form>
                    </div>

                    <div className="packages-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Topic</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(service => (
                                    <tr key={service._id}>
                                        <td>{service.topic}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <button className='btn-action edit' onClick={() => handleServiceEdit(service)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
            case 'about':
    return (
        <div className="content-wrapper">
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">About Content Management</h2>
                </div>

                <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>

                    <div className="package-form" style={{ marginBottom: '20px' }}>
                        <h5>{aboutEditingId ? 'Edit About Content' : 'Add New About Content'}</h5>
                        <form onSubmit={handleAboutSubmit}>
                            <textarea
                                name="para1"
                                placeholder="Paragraph 1"
                                value={aboutFormData.para1}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="para2"
                                placeholder="Paragraph 2"
                                value={aboutFormData.para2}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line1"
                                placeholder="Line 1"
                                value={aboutFormData.line1}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line2"
                                placeholder="Line 2"
                                value={aboutFormData.line2}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line3"
                                placeholder="Line 3"
                                value={aboutFormData.line3}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line4"
                                placeholder="Line 4"
                                value={aboutFormData.line4}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line5"
                                placeholder="Line 5"
                                value={aboutFormData.line5}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <textarea
                                name="line6"
                                placeholder="Line 6"
                                value={aboutFormData.line6}
                                onChange={handleAboutInputChange}
                                required
                            />
                            <button type="submit">
                                {aboutEditingId ? 'Update Content' : 'Create Content'}
                            </button>
                            {aboutEditingId && (
                                <button type="button" onClick={() => {
                                    setAboutEditingId(null);
                                    setAboutFormData({ para1: '', para2: '', line1: '', line2: '', line3: '', line4: '', line5: '', line6: '' });
                                }}>Cancel</button>
                            )}
                        </form>
                    </div>

                    <div className="packages-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Paragraph 1</th>
                                    <th>Paragraph 2</th>
                                    <th>Line 1</th>
                                    <th>Line 2</th>
                                    <th>Line 3</th>
                                    <th>Line 4</th>
                                    <th>Line 5</th>
                                    <th>Line 6</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {abouts.map(about => (
                                    <tr key={about._id}>
                                        <td>{about.para1}</td>
                                        <td>{about.para2}</td>
                                        <td>{about.line1}</td>
                                        <td>{about.line2}</td>
                                        <td>{about.line3}</td>
                                        <td>{about.line4}</td>
                                        <td>{about.line5}</td>
                                        <td>{about.line6}</td>
                                        <td>
                                            <button className='btn-action edit' onClick={() => handleAboutEdit(about)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

            case 'contact':
    return (
        <div className="content-wrapper">
            <div className="dashboard-card">
                <div className="card-header">
                    <h2 className="card-title">Contact Information Management</h2>
                </div>

                <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                    <h4>Contact Details</h4>

                    <div className="package-form" style={{ marginBottom: '20px' }}>
                        <h5>{contactEditingId ? 'Edit Contact Information' : 'Add New Contact Information'}</h5>
                        <form onSubmit={handleContactSubmit}>
                            <input
                                name="office"
                                placeholder="Office Address"
                                value={contactFormData.office}
                                onChange={handleContactInputChange}
                                required
                            />
                            <input
                                name="mobile"
                                placeholder="Mobile Number"
                                value={contactFormData.mobile}
                                onChange={handleContactInputChange}
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={contactFormData.email}
                                onChange={handleContactInputChange}
                                required
                            />
                            <textarea
                                name="mapUrl"
                                placeholder="Google Maps Embed URL"
                                value={contactFormData.mapUrl}
                                onChange={handleContactInputChange}
                                required
                                rows="3"
                            />
                            
                            <button type="submit">
                                {contactEditingId ? 'Update Contact Info' : 'Create Contact Info'}
                            </button>
                            {contactEditingId && (
                                <button type="button" onClick={() => {
                                    setContactEditingId(null);
                                    setContactFormData({ office: '', mobile: '', email: '', mapUrl: ''});
                                }}>Cancel</button>
                            )}
                        </form>
                    </div>

                    <div className="packages-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Office</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                
                                    <th>Map URL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactInfo.map(contact => (
                                    <tr key={contact._id}>
                                        <td>{contact.office}</td>
                                        <td>{contact.mobile}</td>
                                        <td>{contact.email}</td>
                                       
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {contact.mapUrl ? contact.mapUrl.substring(0, 50) + '...' : 'N/A'}
                                        </td>
                                        <td>
                                            <button className='btn-action edit' onClick={() => handleContactEdit(contact)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

            default:
                return (
                    <div className="content-wrapper">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h2 className="card-title">
                                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management
                                </h2>
                            </div>
                            <p>This section is under development.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h3>Travela Admin Panel</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '8px' }}>
                        Welcome, {adminUser.name || 'Admin'}
                    </p>
                </div>

                <ul className="sidebar-nav">
                    <li>
                        <a
                            href="#"
                            className={activeSection === 'dashboard' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('dashboard');
                            }}
                        >
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeSection === 'users' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('users');
                            }}
                        >
                            <i className="fas fa-box"></i>
                            <span>Users</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={activeSection === 'packages' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('packages');
                            }}
                        >
                            <i className="fas fa-box"></i>
                            <span>Packages</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeSection === 'bookings' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('bookings');
                            }}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Bookings</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={activeSection === 'guides' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('guides');
                            }}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Guides</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={activeSection === 'services' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('services');
                            }}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Services</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={activeSection === 'about' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('about');
                            }}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>About</span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSectionChange('contact');
                            }}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Contact</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;