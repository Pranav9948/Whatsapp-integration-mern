import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function tourDetailsPdf() {
  const [selectedPackageDetails, setSelectedPackageDetails] = useState([]);

  const navigate=useNavigate()

  const getSelectedPackage = () => {
    const storedPackage = localStorage.getItem("selectedPackage");
    if (storedPackage) {
      const packageData = JSON.parse(storedPackage);
      console.log("Retrieved package:", packageData);
      setSelectedPackageDetails(packageData);
      return packageData;
    } else {
      console.log("No package data found in localStorage.");
      return null;
    }
  };

  const EnquirePackagePdfDetails = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8500/api/whatsapp/get-package-pdf",
        { selectedPackageDetails }
      );

      navigate("/tour-location");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectedPackage();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-14">
      <h1 className="text-4xl text-center font-bold mb-16 text-white">
        Explore Our Tour Packages
      </h1>

      <div className="grid grid-cols-1 place-content-center    px-6">
        {selectedPackageDetails.map((pkg, index) => (
          <div
            key={index}
            className="bg-white flex justify-center items-center flex-col rounded-lg shadow-lg overflow-hidden   py-4  w-full mx-auto"
          >
            <div className="pt-2 pb-6 px-6">
              <div className="my-3">
                <img
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRirdro-GQkZktB7D9h_-1MyHoeCVrJjlvMdA&s"}
                  alt={pkg.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="text-2xl text-center flex items-center justify-center pt-2 font-semibold text-gray-800 h-20 ">
                {pkg.name}
              </h2>
              <p className="text-gray-500 text-center text-sm my-3 ">
                {pkg.place}
              </p>
              <p className="text-lg font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-center text-transparent bg-clip-text mb-4">
                MYR {pkg.cost}
              </p>

              <p className="text-lg font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400  text-center text-transparent bg-clip-text mb-4">
                {pkg.travelDate}
              </p>

              <button
                onClick={() => EnquirePackagePdfDetails()}
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-3"
              >
                <FaWhatsapp size={30} />
                Get pdf via whatsapp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default tourDetailsPdf;
