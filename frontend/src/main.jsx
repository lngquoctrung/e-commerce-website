import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import { Home } from './pages/Home';
import { Account } from './pages/Account';
import { Detail } from './pages/Detail';
import { Shop } from './pages/Shop';
import { CheckOut } from './pages/CheckOut';
import { BillingDetails } from './pages/BillingDetails';
import { Admin } from './pages/Admin'
import Dashboard from './components/Admin/Dashboard';
import Welcome from './components/Admin/Welcome';
import Category from './components/Admin/Category';
import Product from './components/Admin/Products'
import Products from './components/Admin/Products';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/profile',
    element: <Account/>
  },
  {
    path:'/detail',
    element: <Detail/>
  },
  {
    path:'/shopnow',
    element: <Shop/>
  },
  {
    path:'/cart',
    element: <CheckOut/>
  },
  {
    path:'/checkout',
    element: <BillingDetails/>
  },
  {
    path: '/admin',
    element: <Admin/>,
    children: [
      {
        path: '',
        element: <Welcome />,
      },
      {
        path: 'overview',
        element: <Dashboard />,
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'product',
        element: <Products/>
      },
      {
        path: 'orders',
        element: <Orders/>
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetails/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
