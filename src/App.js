import './output.css';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ToastJs
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// font chữ
import '@fontsource/signika-negative';
// Choicejs
import 'choices.js/public/assets/styles/choices.min.css';
// confirm
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutAdmin from './layout/Admin/Index';
import LayoutCustomer from './layout/Cusstomer/Index';
import { adminRoute, privateRouter, pulicRouter } from './routers/Index';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App ">
        <Routes>
          {
            /* Thiết lập route cho người dùng */
            pulicRouter.map((route, index) => {
              const Pages = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<LayoutCustomer><Pages /></LayoutCustomer>}
                />
              );
            })
          }
          {
            /* Thiết lập route cho admin */
            privateRouter.map((route, index) => {
              const Pages = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <LayoutCustomer><Pages /></LayoutCustomer>
                    </PrivateRoute>
                  }
                />
              );
            })
          }
          {
            /* Thiết lập route cho admin */
            adminRoute.map((route, index) => {
              const Pages = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <LayoutAdmin><Pages /></LayoutAdmin>
                    </PrivateRoute>
                  }
                />
              );
            })
          }
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
