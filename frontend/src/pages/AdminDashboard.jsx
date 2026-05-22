import { useEffect, useState } from 'react';

import api from '../services/api';

import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  const [data, setData] =
    useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        '/admin/dashboard'
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex bg-slate-100 min-h-screen'>
      <AdminSidebar />

      <div className='ml-72 p-10 w-full'>
        <h1 className='text-5xl font-bold mb-10'>
          Admin Dashboard
        </h1>

        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-blue-600 text-white p-8 rounded-3xl shadow-xl'>
            <h2 className='text-2xl'>
              Total Users
            </h2>

            <p className='text-6xl font-bold mt-4'>
              {data.totalUsers}
            </p>
          </div>

          <div className='bg-green-600 text-white p-8 rounded-3xl shadow-xl'>
            <h2 className='text-2xl'>
              Total Stores
            </h2>

            <p className='text-6xl font-bold mt-4'>
              {data.totalStores}
            </p>
          </div>

          <div className='bg-purple-600 text-white p-8 rounded-3xl shadow-xl'>
            <h2 className='text-2xl'>
              Total Ratings
            </h2>

            <p className='text-6xl font-bold mt-4'>
              {data.totalRatings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}