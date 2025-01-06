import React, { useState } from 'react'
import {jsonData} from "../data"
import { Link, useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'

function TourPackagesPage() {


  const navigate=useNavigate()
 

  const EnquirePackageDetails=async(id)=>{



    try{


      const selectedPackage=jsonData.filter((pkg)=>pkg.id===id)

      if (selectedPackage) {
    
        localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
        console.log('Package stored successfully!');
      } 
      

      const {data} = await axios.post(
        "http://localhost:8500/api/whatsapp/enquire-package-details",{selectedPackage}
      );

      navigate('/tour-packages-video')

    }
    
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-14'>
       
      <h1 className="text-4xl text-center font-bold mb-16 text-white">
        Explore Our Tour Packages
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {jsonData.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden "
          >
            <img
              src={pkg.images}
              alt={pkg.name}
              className="h-48 w-full object-cover"
            />
            <div className="pt-2 pb-6 px-6">
              <h2 className="text-2xl text-center flex items-center justify-center pt-2 font-semibold text-gray-800 h-20 ">
                {pkg.name}
              </h2>
              <p className="text-gray-500 text-center text-sm my-3 ">{pkg.place}</p>
              <p className="text-lg font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-center text-transparent bg-clip-text mb-4">MYR {pkg.cost}</p>
            
            <button
              onClick={()=>EnquirePackageDetails(pkg.id)}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-3"
            >
              <FaWhatsapp size={30} />
              Enquire Now
            </button>
         
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TourPackagesPage
