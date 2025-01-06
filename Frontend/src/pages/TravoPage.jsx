import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function TravoPage() {
  const [selectPackageOptions, setSelectPackageOptions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomData = [
    { id: 1, name: "Premium Room", price: "MYR 1,000" },
    { id: 2, name: "Deluxe Room", price: "MYR 750" },
    { id: 3, name: "Standard Room", price: "MYR 500" },
  ];

  const dummyData = [
    { id: 1, title: "3 Days 2 Nights", price: "MYR 2,750" },
    { id: 2, title: "5 Days 4 Nights", price: "MYR 4,500" },
    { id: 3, title: "7 Days 6 Nights", price: "MYR 6,750" },
  ];

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleRoomChange = (event) => {
    setSelectedRooms(parseInt(event.target.value, 10));
  };

  const handleSelect = (card) => {
    setSelectPackageOptions((prev) => {
      const isSelected = prev.find((item) => item.id === card.id);
      return isSelected
        ? prev.filter((item) => item.id !== card.id)
        : [...prev, card];
    });
  };

  const handleSubmit = async () => {
    const payload = {
      selectedPackages: selectPackageOptions,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      selectedRooms,
      selectedRoom,
    };

    console.log("Payload to send to backend:", payload);

    try {
      const { data } = await axios.post(
        "http://localhost:8500/api/whatsapp/book-now",
        { payload }
      );
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-4 space-y-4">
      <h2 className="text-xl font-bold mb-6 text-white">
        Select Package Options
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-4 shadow-lg ${
              selectPackageOptions.includes(item.id)
                ? "bg-blue-300"
                : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-4">{item.price}</p>
            <button
              onClick={() => handleSelect(item)}
              className={`border rounded-lg p-2 shadow-lg w-full ${
                selectPackageOptions.some((card) => card.id === item.id)
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {selectPackageOptions.includes(item.id) ? "Selected" : "Select"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-start gap-6 items-center pt-2">
        <div>
          <h2 className="text-xl font-bold py-5 text-white">
            Choose start date
          </h2>
          <DatePicker
            className="p-4 rounded-md shadow-md text-md font-semibold"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold py-5 text-white">
            Choose end date
          </h2>
          <DatePicker
            className="p-4 rounded-md shadow-md text-md font-semibold"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold py-5 text-white">
              Select no of rooms
            </h2>
            <select
              id="rooms"
              value={selectedRooms}
              onChange={handleRoomChange}
              className="block w-full px-6 py-4 border rounded-lg bg-white shadow-sm"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="py-4 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-white">
          Select a Room Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roomData.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg p-4 shadow-lg ${
                selectedRoom?.id === room.id ? "bg-blue-100" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{room.name}</h3>
              <p className="text-gray-700 mb-4">Price: {room.price}</p>
              <button
                onClick={() => handleRoomSelect(room)}
                className={`w-full py-2 px-4 text-white rounded-lg ${
                  selectedRoom?.id === room.id
                    ? "bg-blue-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {selectedRoom?.id === room.id ? "Selected" : "Select"}
              </button>
            </div>
          ))}
        </div> 
      </div>

      <div className="py-6 flex justify- ems-end">
        <button
          onClick={handleSubmit}
          className=" max-w-md bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-bold hover:bg-blue-800"
        >
          Book Now
        </button>
      </div>

      <div className="chatbot">
        <FloatingWhatsApp
          phoneNumber="918848544230"
          accountName="Travoxis Technology Sdn Bhd"
          statusMessage="Typically replies within a minute"
          chatMessage="Hello there! 🤝 How can we help?"
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxM8oPXpQQZEXLm32owLFbbhgrF0zUMv2Mg&s" 
          buttonStyle={{
            background: "#25d366", 
            color: "#fff",
          }}
          iconColor="#fff" 
          chatBoxHeight="320" 
          notification
          notificationDelay={60} 
          onClick={() => console.log("Clicked on WhatsApp button")}
          onOpen={() => console.log("WhatsApp chat opened")}
          onClose={() => console.log("WhatsApp chat closed")}
        />
      </div>
    </div>
  );
}

export default TravoPage;
