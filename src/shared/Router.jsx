import Layout from 'components/layout/Layout';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'redux/config/configStore';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="details/:id" element={<Detail />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default Router;
