import './App.css';
import Blog from './components/blog';
import Login from './components/login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [isLoading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/user/check", {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      setIsAuth(data.loggedIn);
      setLoading(false);
    })
    .catch(() => {
      setIsAuth(false);
      setLoading(false)
    })
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            isAuth ? <Navigate to='/blog' /> : <Navigate to="/login" />
          } />

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route path='/blog' element={
            <ProtectedRoute isAuth={isAuth} >
              <Blog />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
