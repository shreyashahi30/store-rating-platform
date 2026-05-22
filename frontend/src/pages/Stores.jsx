import { useEffect, useState } from 'react';

import api from '../services/api';

export default function Stores() {
  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get(
        '/stores'
      );

      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitRating = async (
    storeId,
    rating
  ) => {
    try {
      await api.post('/ratings', {
        storeId,
        rating,
      });

      fetchStores();

      alert('Rating submitted');
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  const logout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      store.address
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-blue-100'>
      <div className='bg-white shadow-lg px-8 py-5 flex justify-between items-center sticky top-0 z-50'>
        <div>
          <h1 className='text-4xl font-bold text-blue-700'>
            Store Ratings
          </h1>

          <p className='text-gray-500 mt-1'>
            Discover and rate stores
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition'
        >
          Logout
        </button>
      </div>

      <div className='max-w-6xl mx-auto px-4 pt-10'>
        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl'>
          <h2 className='text-5xl font-bold mb-4'>
            Explore Amazing Stores
          </h2>

          <p className='text-lg text-blue-100 max-w-2xl'>
            Browse stores, submit ratings,
            and help others discover the
            best places around them.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 mt-8'>
        <input
          type='text'
          placeholder='Search stores by name or address...'
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className='w-full p-5 rounded-2xl border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
        />
      </div>

      <div className='max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-10'>
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300'
          >
            <div className='h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center'>
              <h2 className='text-3xl font-bold text-white'>
                {store.name}
              </h2>
            </div>

            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-gray-500'>
                  📍 {store.address}
                </span>

                <span className='bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold'>
                  ⭐ {store.overallRating}
                </span>
              </div>

              <p className='text-sm text-gray-600 mb-4'>
                Your Rating:
                {store.userSubmittedRating ||
                  'Not Rated'}
              </p>

              <div className='mt-5'>
                <label className='block text-gray-700 font-semibold mb-3'>
                  Submit Your Rating
                </label>

                <select
                  className='w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={(e) =>
                    submitRating(
                      store.id,
                      Number(
                        e.target.value
                      )
                    )
                  }
                >
                  <option>
                    Choose Rating
                  </option>

                  <option value='1'>
                    ⭐ 1 - Poor
                  </option>

                  <option value='2'>
                    ⭐ 2 - Fair
                  </option>

                  <option value='3'>
                    ⭐ 3 - Good
                  </option>

                  <option value='4'>
                    ⭐ 4 - Very Good
                  </option>

                  <option value='5'>
                    ⭐ 5 - Excellent
                  </option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}