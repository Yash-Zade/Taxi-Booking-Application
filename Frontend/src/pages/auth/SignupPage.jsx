import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., registration logic)
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-5 p-5 animate-pulse">
        Sign Up
      </h2>
      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition duration-300 ease-in-out hover:scale-105">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-6"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full mb-4"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-500 hover:text-yellow-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
