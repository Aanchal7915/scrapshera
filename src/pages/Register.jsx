import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNu, setPhoneNu] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const backendUri=process.env.REACT_APP_BACKEND_URI;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`${backendUri}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, phoneNu, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        toast.success('Registration successful! Redirecting to login...', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Registration failed. Please check your details.');
      }
    } catch (err) {
      setError('Network error or something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 animate-fadeIn">
  <ToastContainer position="top-right" />
  <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-200 animate-fadeIn">
  <h2 className="text-3xl font-extrabold mb-4 text-center text-green-900 drop-shadow animate-fadeIn">Create Your Account</h2>
  <p className="mb-6 text-green-700 text-center animate-fadeIn">Register to start managing your scrap rates and access exclusive features.</p>
  <form onSubmit={handleRegister} className="space-y-4 animate-fadeIn">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phoneNu" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phoneNu"
              value={phoneNu}
              onChange={e => setPhoneNu(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Create a password"
            />
          </div>
          
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow font-semibold flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center animate-pulse">
                <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              <span className="inline-block animate-fadeIn">Register</span>
            )}
          </button>
          {/* Error message below submit button */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
        <div className="mt-6 text-center animate-fadeIn">
          <span className="text-green-900 font-semibold">Already have an account?</span>
          <a href="/login" className="ml-2 text-green-600 hover:underline font-bold animate-pulse">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
