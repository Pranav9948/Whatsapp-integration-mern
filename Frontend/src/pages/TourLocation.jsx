import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function TourLocation() {

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
  }


   useEffect(() => {
      getSelectedPackage();
    }, []);


    const enquirePackageLocationDetails=async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:8500/api/whatsapp/send-location",
            { selectedPackageDetails }
          );
    
          
        } catch (error) {
          console.log(error);
        }
      };
    



  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-14">
        <h1 className="text-4xl text-center font-bold mb-16 text-white">
          Explore Our Tour Packages
        </h1>
  
        <div className="grid grid-cols-1 place-content-center">
          {selectedPackageDetails.map((pkg, index) => (
            <div
              key={index}
              className="bg-white flex justify-center items-center flex-col rounded-lg shadow-lg overflow-hidden   py-4  w-full mx-auto"
            >
              <div className="pt-2 pb-6 px-6">
                <div className="my-3">
                  <img
                    src={"https://thumbs.dreamstime.com/b/red-location-pin-stands-out-modern-map-blurred-background-perfect-navigation-apps-travel-services-323307618.jpg"}
                    alt={pkg.name}
                    className=" h-48 w-72 object-cover rounded-md"
                  />
                </div>
  
                <h2 className="text-2xl text-center flex items-center justify-center pt-2 font-semibold text-gray-800 h-20 ">
                  {pkg.name}
                </h2>
                
    
                <button
                  onClick={() => enquirePackageLocationDetails()}
                  className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-3"
                >
                  <FaWhatsapp size={30} />
                  See Location
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default TourLocation
