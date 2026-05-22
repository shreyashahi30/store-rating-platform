import { useState } from 'react';

import api from '../services/api';

export default function UpdatePassword() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        '/users/password',
        form
      );

      alert(
        'Password updated successfully'
      );

      window.location.href =
        '/stores';
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          'Update failed'
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Update Password
        </h1>

        <input
          type='password'
          placeholder='Current Password'
          className='w-full border p-4 rounded-xl mb-4'
          onChange={(e) =>
            setForm({
              ...form,
              currentPassword:
                e.target.value,
            })
          }
        />

        <input
          type='password'
          placeholder='New Password'
          className='w-full border p-4 rounded-xl mb-2'
          onChange={(e) =>
            setForm({
              ...form,
              newPassword:
                e.target.value,
            })
          }
        />

        <p className='text-sm text-gray-500 mb-4'>
          Password must contain:
          uppercase letter, special
          character and 8-16
          characters.
        </p>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl'
        >
          Update Password
        </button>
      </form>
    </div>
  );
}