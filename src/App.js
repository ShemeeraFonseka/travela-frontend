import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Ourservices from './pages/Ourservices';
import Travelpackages from './pages/Travelpackages';
import Contactus from './pages/Contactus';
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminLogin from './components/Admin/AdminLogin'
import ProtectedRoute from './components/Admin/ProtectedRoute'


const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <Copyright />
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes without Header/Footer */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<PublicLayout><Home /></PublicLayout>} />
        <Route path='/aboutus' element={<PublicLayout><Aboutus /></PublicLayout>} />
        <Route path='/ourservices' element={<PublicLayout><Ourservices /></PublicLayout>} />
        <Route path='/travelpackages' element={<PublicLayout><Travelpackages /></PublicLayout>} />
        <Route path='/contactus' element={<PublicLayout><Contactus /></PublicLayout>} />
      </Routes>


    </Router>
  );
}

