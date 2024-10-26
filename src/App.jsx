import { lazy, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CheckLoginContext } from './Contexts/Login/CheckLoginContext';
import { isLoggedIn, getCurrentUserDetail } from './Authorisation';

// Components import for routing
// Auth
const Login = lazy(() => import('./Pages/Authentication/Login'));
const SignUp = lazy(() => import('./Pages/Authentication/SignUp'));
// Admin
const DashboardLayout = lazy(() => import('./Layout/Admin/DashboardLayout'));
const Products = lazy(() => import('./Pages/Admin/Products/Products'))
const ProductDetails = lazy(() => import('./Pages/Admin/Products/ProductDetails'))
const Color = lazy(() => import('./Pages/Admin/Color/Color'))
const Orders = lazy(() => import('./Pages/Admin/Orders/Orders'))
const OrderDetails = lazy(() => import('./Pages/Admin/Orders/OrderDetails'))
// Customer
const CustomerDashboardLayout = lazy(() => import('./Layout/Customer/CustomerLayout'))
const ProductsList = lazy(() => import('./Pages/Users/ProductsList'))
const MyOrders = lazy(() => import('./Pages/Users/MyOrder'))

function App() {
  const { globalBoolean } = useContext(CheckLoginContext);

  // using useEffect to check user is loggedIn or not. If user loggedIn then fetching the list of Sidebar Items.
  useEffect(() => {
    isLoggedIn();
  }, [globalBoolean]);

  return (
    <>
      {
        isLoggedIn()
          ?
          (
            <Routes>
              {getCurrentUserDetail()?.user?.userType === 'Admin' ?
                <Route path='/' element={<DashboardLayout />}>
                  <Route path='/products' element={<Products />} />
                  <Route path='/products/:id' element={<ProductDetails />} />
                  <Route path='/color' element={<Color />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='/orders/:id' element={<OrderDetails />} />
                  <Route path='/*' element={<Navigate to={'/'} />} />
                </Route>
                :
                <Route path='/' element={<CustomerDashboardLayout />}>
                  <Route index element={<ProductsList />} />
                  <Route path='/my-order' element={<MyOrders />} />
                  <Route path='/my-order/:id' element={<OrderDetails />} />
                  <Route path='/*' element={<Navigate to={'/'} />} />
                </Route>
              }
            </Routes>
          )
          : (
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/*' element={<Navigate to={'/login'} />} />
            </Routes>
          )
      }
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;

