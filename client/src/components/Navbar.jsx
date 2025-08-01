import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../css/Navbar.css";
import ItemCard from "../pages/item"; // Make sure this is the right card component

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

    const handleSearch = async (e) => {
  e.preventDefault();

  if (!searchQuery.trim()) return;

  try {
    const response = await axios.get(`${backendUrl}/api/items/search?q=${searchQuery}`);
    
    if (Array.isArray(response.data)) {
      setSearchResults(response.data); // Should be rendered as <ItemCard item={item} />
    } else {
      toast.error("Invalid response format.");
    }
  } catch (error) {
    console.error("Search error:", error);
    toast.error("Failed to fetch search results.");
  

        } finally {
            setLoading(false);
        }

        setSearchQuery("");
    };

    const sendVerificationOtp = async () => {
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
        <>
            <div className="navbar-containerx">
                <div className="navbarx">
                    <form onSubmit={handleSearch} className="search-formx">
                        <button 
                            type="button" 
                            className="add-itemx" 
                            onClick={() => navigate('/add-item')}
                        >
                            Add Item
                        </button>
                        <input
                            type="text"
                            placeholder="Search Items..."
                            className="search-inputx"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-itemx">Search</button>
                    </form>

                    <img src={assets.logo} alt="Logo" className="navbar-logox" />

                    {userData ? (
                        <div className="user-avatarx">
                            {userData.name[0].toUpperCase()}
                            <div className="user-menux">
                                <ul className="menu-listx">
                                    {!userData.isAccountVerified && (
                                        <li onClick={sendVerificationOtp} className="menu-itemx">
                                            Verify email
                                        </li>
                                    )}
                                    <li onClick={logout} className="menu-itemx">
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="login-buttonx">
                            Login
                            <img src={assets.arrow_icon} alt="" />
                        </button>
                    )}
                </div>
            </div>

            {/* Show search results below navbar */}
            <div className="search-results-containerx">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && searchResults.length > 0 && (
                    <div className="item-cards-wrapperx">
                        {searchResults.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
