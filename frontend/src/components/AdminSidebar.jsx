import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  const logout = () => {
    localStorage.clear();

    window.location.href = '/login';
  };

  return (
    <div className='w-72 min-h-screen bg-slate-900 text-white p-6 fixed'>
      <h1 className='text-3xl font-bold mb-10'>
        Admin Panel
      </h1>

      <div className='space-y-4'>
        <Link
          to='/admin'
          className='block bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl transition'
        >
          Dashboard
        </Link>

        <Link
          to='/admin/users'
          className='block bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl transition'
        >
          Manage Users
        </Link>

        <Link
          to='/admin/stores'
          className='block bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl transition'
        >
          Manage Stores
        </Link>

        <button
          onClick={logout}
          className='w-full bg-red-500 hover:bg-red-600 p-4 rounded-2xl transition'
        >
          Logout
        </button>
      </div>
    </div>
  );
}