import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post('/auth/signup', form);

      alert('Signup successful');

      window.location.href = '/login';
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 px-4'>
      <div className='w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-white'>
            Create Account
          </h1>

          <p className='text-gray-300 mt-3'>
            Join the platform today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >
          <input
            type='text'
            placeholder='Full Name'
            required
            className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type='email'
            placeholder='Email'
            required
            className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type='text'
            placeholder='Address'
            required
            className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          <input
            type='password'
            placeholder='Password'
            required
            className='w-full p-4 rounded-2xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold py-4 rounded-2xl transition duration-300'
          >
            {loading
              ? 'Creating Account...'
              : 'Signup'}
          </button>
        </form>

        <p className='text-center text-gray-300 mt-6'>
          Already have an account?
          <Link
            to='/login'
            className='text-cyan-400 font-semibold ml-1 hover:text-cyan-300'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}