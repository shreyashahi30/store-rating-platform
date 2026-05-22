import { useEffect, useState } from 'react';

import api from '../services/api';

import AdminSidebar from '../components/AdminSidebar';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'USER',
  });

  const [search, setSearch] =
    useState('');

  const [roleFilter, setRoleFilter] =
    useState('');

  const [sortOrder, setSortOrder] =
    useState('ASC');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, sortOrder]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(
        `/admin/users?role=${roleFilter}&sortBy=name&order=${sortOrder}`
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        '/admin/users',
        form
      );

      alert(
        'User added successfully'
      );

      setForm({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'USER',
      });

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data
          ?.message
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className='flex bg-slate-100 min-h-screen'>
      <AdminSidebar />

      <div className='ml-72 p-10 w-full'>
        <h1 className='text-5xl font-bold mb-10'>
          Manage Users
        </h1>

        <form
          onSubmit={addUser}
          className='bg-white p-8 rounded-3xl shadow-xl mb-10 grid md:grid-cols-2 gap-6'
        >
          <input
            type='text'
            placeholder='Full Name'
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
            placeholder='Email'
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
            type='password'
            placeholder='Password'
            value={form.password}
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
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

          <select
            value={form.role}
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value='USER'>
              USER
            </option>

            <option value='ADMIN'>
              ADMIN
            </option>

            <option value='STORE_OWNER'>
              STORE OWNER
            </option>
          </select>

          <button className='bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4'>
            Add User
          </button>
        </form>

        <div className='flex gap-4 mb-6'>
          <input
            type='text'
            placeholder='Search users...'
            className='border p-4 rounded-2xl w-full'
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className='border p-4 rounded-2xl'
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
          >
            <option value=''>
              All
            </option>

            <option value='USER'>
              USER
            </option>

            <option value='ADMIN'>
              ADMIN
            </option>

            <option value='STORE_OWNER'>
              STORE OWNER
            </option>
          </select>

          <button
            onClick={() =>
              setSortOrder(
                sortOrder === 'ASC'
                  ? 'DESC'
                  : 'ASC'
              )
            }
            className='bg-slate-800 text-white px-6 rounded-2xl'
          >
            {sortOrder}
          </button>
        </div>

        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-blue-600 text-white'>
              <tr>
                <th className='p-5 text-left'>
                  Name
                </th>

                <th className='p-5 text-left'>
                  Email
                </th>

                <th className='p-5 text-left'>
                  Role
                </th>

                <th className='p-5 text-left'>
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(
                (user) => (
                  <tr
                    key={user.id}
                    className='border-b hover:bg-slate-50'
                  >
                    <td className='p-5'>
                      {user.name}
                    </td>

                    <td className='p-5'>
                      {user.email}
                    </td>

                    <td className='p-5'>
                      {user.role}
                    </td>

                    <td className='p-5'>
                      {user.address}
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