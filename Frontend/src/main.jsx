import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TourPackagesPage from "./pages/TourPackagesPage";
import TourPackagesVideo from "./pages/TourPackageVideo";
import TourPackagesPdf from "./pages/tourDetailsPdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourLocation from "./pages/TourLocation";
import TravoPage from "./pages/TravoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegistrationPage />,
  },
  {
    path: "/tour-packages",
    element: <TourPackagesPage />,
  },

  {
    path: "/tour-packages-video",
    element: <TourPackagesVideo />,
  },

  {
    path: "/tour-details-pdf",
    element: <TourPackagesPdf />,
  },

  {
    path: "/tour-location",
    element: <TourLocation />,
  },
  {
    path: "/travo",
    element: <TravoPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <div className="w-full bg-[#5DB996]  min-h-screen  ">
    <div className="container mx-auto max-w-7xl px-6 md:px-8 lg:px-10 py-4">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  </div>
);
