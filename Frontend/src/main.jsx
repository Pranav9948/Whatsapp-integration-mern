
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TourPackagesPage from "./pages/TourPackagesPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RegistrationPage />,
  },
  {
    path: "/tour-packages",
    element: <TourPackagesPage />,
  }
]);



createRoot(document.getElementById('root')).render(


    <div className="w-full bg-[#5DB996]  min-h-screen  ">
    <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-10 py-4">
    <RouterProvider router={router} />
    <ToastContainer />
    </div>
    </div>
   
 
 

)
