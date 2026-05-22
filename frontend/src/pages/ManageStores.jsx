import { useEffect, useState } from 'react';

import api from '../services/api';

import AdminSidebar from '../components/AdminSidebar';

export default function ManageStores() {
  const [stores, setStores] =
    useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: '',
  });

  const [search, setSearch] =
    useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get(
        '/admin/stores'
      );

      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addStore = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        '/admin/stores',
        form
      );

      alert(
        'Store added successfully'
      );

      setForm({
        name: '',
        email: '',
        address: '',
        ownerId: '',
      });

      fetchStores();
    } catch (error) {
      alert(
        error.response?.data
          ?.message
      );
    }
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
    <div className='flex bg-slate-100 min-h-screen'>
      <AdminSidebar />

      <div className='ml-72 p-10 w-full'>
        <h1 className='text-5xl font-bold mb-10'>
          Manage Stores
        </h1>

        <form
          onSubmit={addStore}
          className='bg-white p-8 rounded-3xl shadow-xl mb-10 grid md:grid-cols-2 gap-6'
        >
          <input
            type='text'
            placeholder='Store Name'
            value={form.name}
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type='email'
            placeholder='Store Email'
            value={form.email}
            className='border p-4 rounded-2xl'
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
            value={form.address}
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
          />

          <input
            type='number'
            placeholder='Owner ID'
            value={form.ownerId}
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setForm({
                ...form,
                ownerId:
                  e.target.value,
              })
            }
          />

          <button className='bg-green-600 hover:bg-green-700 text-white rounded-2xl p-4'>
            Add Store
          </button>
        </form>

        <input
          type='text'
          placeholder='Search stores...'
          className='border p-4 rounded-2xl w-full mb-6'
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-green-600 text-white'>
              <tr>
                <th className='p-5 text-left'>
                  Store
                </th>

                <th className='p-5 text-left'>
                  Email
                </th>

                <th className='p-5 text-left'>
                  Address
                </th>

                <th className='p-5 text-left'>
                  Rating
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStores.map(
                (store) => (
                  <tr
                    key={store.id}
                    className='border-b hover:bg-slate-50'
                  >
                    <td className='p-5'>
                      {store.name}
                    </td>

                    <td className='p-5'>
                      {store.email}
                    </td>

                    <td className='p-5'>
                      {store.address}
                    </td>

                    <td className='p-5'>
                      ⭐ {store.rating}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
