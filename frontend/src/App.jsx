import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';

import Signup from './pages/Signup';

import Stores from './pages/Stores';

import UpdatePassword from './pages/UpdatePassword';

import AdminDashboard from './pages/AdminDashboard';

import ManageUsers from './pages/ManageUsers';

import ManageStores from './pages/ManageStores';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate to='/login' />
          }
        />

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/signup'
          element={<Signup />}
        />

        <Route
          path='/stores'
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />

        <Route
          path='/update-password'
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/users'
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/stores'
          element={
            <ProtectedRoute>
              <ManageStores />
            </ProtectedRoute>
          }
        />

        <Route
          path='*'
          element={
            <h1 className='text-center text-3xl mt-10'>
              404 Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;