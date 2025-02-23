import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {RouterProvider ,createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";

const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="login" element={<Login />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
