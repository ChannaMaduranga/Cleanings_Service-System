import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Home from './pages/user/Home';
import Navbar from './pages/user/Navbar';
import MyBookings from './pages/user/MyBookings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/admin/Admin';
import Bookings from './pages/admin/Bookings';
import Services from './pages/admin/Services';
import AdminNav from './pages/admin/AdminNav';
import { ToastContainer } from 'react-toastify';

const AppRoutes = () => {
  const location = useLocation();

 
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideNav = ['/login', '/signup'].some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideNav && (isAdminRoute ? <AdminNav /> : <Navbar />)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* user */}
        <Route path="/" element={<Home />} />
        <Route path="/mybookings" element={<MyBookings />} />

        {/* admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/services" element={<Services />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}

export default App;
