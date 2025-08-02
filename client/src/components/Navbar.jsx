import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import "../css/Navbar.css"

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);
    

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search functionality here
    };

    const sendVerificationOtp = async () => {
        setIsClicked(true);
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <form onSubmit={handleSearch} className="search-form">
                    { userData && userData.role === 'user' && (
                    <button 
                        type="button" 
                        className="add-item" 
                        onClick={() => { userData.isAccountVerified ? navigate('/add-item'):toast.warn("Please verify your email to add items") }} 
                    >
                        Add Item
                    </button>
                    )}
                    <input
                        type="text"
                        placeholder="Search Items..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                    />
                    <button type="submit" className="search-item">Search</button>
                    
                </form>

                <img src={assets.logo} alt="Logo" className="navbar-logo" />

                {userData ? (
                    <div className="user-avatar">
                        {userData.name[0].toUpperCase()}
                        <div className="user-menu">
                            <ul className="menu-list">
                                {!userData.isAccountVerified && (
                                    <li onClick={sendVerificationOtp} className={`menu-item ${isClicked ? 'disabled' : ''}`}>
                                        Verify email
                                    </li>
                                )}
                                <li onClick={logout} className="menu-item">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className="login-button">
                        Login
                        <img src={assets.arrow_icon} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;