import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        '/auth/login',
        form
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'role',
        res.data.role
      );
      
      if (res.data.role === 'ADMIN') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/stores';
}
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 px-4'>
      <div className='w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white'>
            Welcome Back
          </h1>

          <p className='text-gray-300 mt-3'>
            Login to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          <div>
            <label className='text-white text-sm mb-2 block'>
              Email
            </label>

            <input
              type='email'
              placeholder='Enter email'
              required
              className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className='text-white text-sm mb-2 block'>
              Password
            </label>

            <input
              type='password'
              placeholder='Enter password'
              required
              className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold py-4 rounded-2xl transition duration-300'
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>
        </form>

        <p className='text-center text-gray-300 mt-6'>
          Don’t have an account?
          <Link
            to='/signup'
            className='text-cyan-400 font-semibold ml-1 hover:text-cyan-300'
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}