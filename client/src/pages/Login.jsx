import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

const checkPasswordStrength = (pwd) => {
  let strength = '';

  const strong = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
  );
  const medium = new RegExp(
    '^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{6,}$'
  );

  if (strong.test(pwd)) {
    strength = 'Strong';
  } else if (medium.test(pwd)) {
    strength = 'Medium';
  } else {
    strength = 'Weak';
  }

  setPasswordStrength(strength);
};








  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        if (data.success) {
          if(passwordStrength==='Strong'){
          setIsLoggedin(true);
          getUserData();
          navigate('/');
          toast.success(data.message);
          }else{
            toast.error('Password must be strong')
          }
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="login-logo"
      />

      <div className="login-box">
        <h2 className="login-title">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className="login-subtitle">
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className="login-input">
              <img src={assets.person_icon} alt="person" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="login-input">
            <img src={assets.mail_icon} alt="email" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email id"
              required
            />
          </div>
          <div className="login-inputx">
            <img src={assets.lock_icon} alt="lock" />
            <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordStrength(e.target.value);
          }}
          placeholder="Password"
          required
        />
        

          </div>

          {state === 'Sign Up' && (
          <p
            className={`password-strength ${passwordStrength.toLowerCase()}`}
          >
            Password Strength: {passwordStrength}
          </p>
        )}

          <p className="forgot-password" onClick={() => navigate('/reset-password')}>
            Forgot password?
          </p>


            <button className="login-button"type= "submit">{state}</button>

        </form>

        {state === 'Sign Up' ? (
          <p className="login-footer">
            Already have an account?{' '}
            <span onClick={() => setState('Login')}>Login here</span>
          </p>
        ) : (
          <p className="login-footer">
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')}>Sign up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
