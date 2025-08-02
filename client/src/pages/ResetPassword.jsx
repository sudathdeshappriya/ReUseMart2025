import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/ResetPass.css'


const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmited, setOtpSubmited] = useState(false);
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(''));
    setOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="reset-container">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="reset-logo"
      />

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="reset-form">
          <h1 className="reset-title">Reset password</h1>
          <p className="reset-subtext">Enter your registered email address</p>

          <div className="input-group">
            <img src={assets.mail_icon} alt="mail" />
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="reset-button">Submit</button>
        </form>
      )}

      {!isOtpSubmited && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="reset-form">
          <h1 className="reset-title">Reset password OTP</h1>
          <p className="reset-subtext">Enter the 6-digit code sent to your email id</p>
          <div className="otp-input-group" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="reset-button">Submit</button>
        </form>
      )}

      {isOtpSubmited && (
        <form onSubmit={onSubmitNewPassword} className="reset-form">
          <h1 className="reset-title">New password</h1>
          <p className="reset-subtext">Enter the new password</p>

          <div className="input-group">
            <img src={assets.lock_icon} alt="lock" />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="reset-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
