import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const isValidEmail = (email) => {
    // Simple email validation pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const register = async () => {
    // ✅ Simple validation
    if (!username || !password || !email) {
      alert("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email format.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email
      });
      alert(res.data.message);
      setIsRegisterMode(false); // Switch to login
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

const login = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    alert(res.data.message);

    // Save token (for protected routes)
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    alert(err.response.data.message || 'Login failed');
  }
};
  const getProtectedData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Protected Message: " + res.data.message);
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Access denied');
    }
  };

  return (
    <div className='loginContainer'>
      <h2><b>{isRegisterMode ? 'Register' : 'Login'}</b></h2>
      {isRegisterMode && (
        <>
          <input className='text'
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
          /><br /><br />
        </>
      )}
      {!isRegisterMode && (
        <>
          <input className='text'
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br /><br />
        </>
      )}


      <input className='text'
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />

      {isRegisterMode && (
        <>
          <input className='text'
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br /><br />
        </>
      )}

      {isRegisterMode ? (
        <>
          <button className='registerbutton' onClick={register}><b>Register</b></button>
          <p>
            Already have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsRegisterMode(false)}>
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <button className='loginbutton' onClick={login}><b>Login</b></button>
          <p>
            Don't have an account?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsRegisterMode(true)}>
              Create new account
            </span>
          </p>
        </>
      )}
      <button onClick={getProtectedData}>Get Protected Data</button>  
    </div>
  );
}

export default App;
