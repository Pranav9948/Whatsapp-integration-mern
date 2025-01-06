import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();

  const generateTemplateWhatsappMessage = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8500/api/whatsapp/welcome-message",
        { recipientName: "Pranav" }
      );

      alert(data);
      navigate("/tour-packages");
    } catch (error) {
      console.error("Error making API call:", error);
      alert("Failed to make the API call.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-y-hidden">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-96">
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-24"></div>
        <div className="flex justify-center -mt-12">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-teal-400 overflow-hidden">
            <img
              src="https://media.licdn.com/dms/image/v2/C4E0BAQH2SWVlXKGCMQ/company-logo_200_200/company-logo_200_200/0/1659012686392/travoxis_logo?e=2147483647&v=beta&t=vGT-Cle-MMRBAyCP2ZbKi5SFPOSvkumQ-jwVNQ3eNyM"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-transparent bg-clip-text">
            TRAVOAXIS
          </h2>
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <Link to={"/"}>
            <button
              onClick={generateTemplateWhatsappMessage}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-3"
            >
              <FaWhatsapp size={30} />
              Whatsapp Now
            </button>
          </Link>



         
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
