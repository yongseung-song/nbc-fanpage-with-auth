import Layout from 'components/layout/Layout';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Profile from 'pages/Profile';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

function Router() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={isLoggedIn ? <Layout /> : <Navigate to={'/login'} />}>
          {/* <Route element={<Layout />}> */}
          <Route path="/" element={<Home />} />
          <Route path="details/:id" element={<Detail />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
