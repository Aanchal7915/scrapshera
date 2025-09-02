import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'newspaper': return '📰';
    case 'clothes': return '👕';
    case 'glassBottle': return '🍾';
    case 'officePaper': return '📄';
    case 'copiesBooks': return '📚';
    case 'cardboard': return '📦';
    case 'plasticBottle': return '🧴';
    case 'iron': return '🔩';
    case 'steelUtensils': return '🍴';
    case 'aluminum': return '🥫'; // Using can for aluminum
    case 'brass': return '📯'; // Using horn for brass
    case 'copper': return '🔌';
    case 'ac': return '❄️';
    case 'washingMachine': return '🧺';
    case 'geyser': return '🚿';
    case 'fridge': return '🧊';
    case 'cooler': return '💨'; // Using puff of smoke for cooler
    case 'printer': return '🖨️';
    case 'eWasteMetal': return '⚙️';
    case 'eWastePlastic': return '♻️';
    case 'crtTv': return '📺';
    case 'ceilingFan': return '🌀';
    case 'motor': return ' موتور'; // Placeholder, could use inline SVG if complex
    case 'microwave': return '♨️';
    case 'ups': return '🔋';
    case 'inverterStabilizer': return '⚡';
    case 'battery': return '🔋';
    case 'laptop': return '💻';
    case 'crtMonitor': return '🖥️';
    case 'lcdMonitor': return '💻';
    case 'cpu': return '🧠';
    case 'bike': return '🏍️';
    case 'car': return '🚗';
    case 'boxOpen': return '📦';
    case 'calendarAlt': return '🗓️';
    case 'wallet': return '💰';
    case 'tint': return '💧';
    case 'tree': return '🌳';
    case 'bolt': return '⚡';
    case 'oilCan': return '🛢️';
    default: return '✨'; // Default icon
  }
};

const scrapData = [
  { item: "Newspaper", price: "₹14/kg", note: "Market Rates Dropped Recently", icon: "newspaper" },
  { item: "Clothes", price: "₹2/kg", note: "Accepted only when given with other scrap items (We don't accept undergarments)", icon: "clothes" },
  { item: "Glass Bottles", price: "₹2/kg", note: "Accepted only when given with other scrap items", icon: "glassBottle" },
  { item: "Office Paper", price: "₹14/kg", icon: "officePaper" },
  { item: "Copies/Books", price: "₹12/kg", icon: "copiesBooks" },
  { item: "Cardboard", price: "₹8/kg", note: "Call +91-8595358613 for bulk", icon: "cardboard" },
  { item: "Plastic Bottles", price: "₹8/kg", icon: "plasticBottle" },
  { item: "Iron", price: "₹26/kg", note: "Call +91-8595358613 for bulk", icon: "iron" },
  { item: "Steel Utensils", price: "₹40/kg", icon: "steelUtensils" },
  { item: "Aluminium", price: "₹105/kg", icon: "aluminum" },
  { item: "Brass", price: "₹305/kg", icon: "brass" },
  { item: "Copper", price: "₹425/kg", icon: "copper" },
  { item: "Split AC (Copper Coil) 1.5 Ton", price: "₹4150/piece", icon: "ac" },
  { item: "Window AC 1.5 Ton", price: "₹4050/piece", icon: "ac" },
  { item: "Split/Window AC 1 Ton (Copper Coil)", price: "₹1350/piece", icon: "ac" },
  { item: "Window/Split AC 2 Ton (Copper Coil)", price: "₹1000/piece", icon: "ac" },
  { item: "Front Load Fully Automatic Washing Machine", price: "₹5600/piece", icon: "washingMachine" },
  { item: "Top Load Fully Automatic Washing Machine", price: "₹750/piece", icon: "washingMachine" },
  { item: "Semi Automatic Washing Machine (Double Drum)", price: "₹20/kg", icon: "washingMachine" },
  { item: "Geyser", price: "₹1200/piece", icon: "geyser" },
  { item: "Single Door Fridge", price: "₹1350/piece", icon: "fridge" },
  { item: "Double Door Fridge", price: "₹20/kg", icon: "fridge" },
  { item: "Iron Cooler", price: "₹30/kg", icon: "cooler" },
  { item: "Plastic Cooler", price: "₹15/kg", icon: "cooler" },
  { item: "Printer/Scanner/Fax Machine", price: "₹200/piece", icon: "printer" },
  { item: "Metal E-waste", price: "₹28/kg", icon: "eWasteMetal" },
  { item: "Plastic E-waste", price: "₹15/kg", icon: "eWastePlastic" },
  { item: "CRT TV", price: "₹200/piece", icon: "crtTv" },
  { item: "Ceiling Fan", price: "₹35/kg", icon: "ceilingFan" },
  { item: "Motors (Copper wiring)", price: "₹35/kg", icon: "motor" },
  { item: "Microwave", price: "₹350/piece", icon: "microwave" },
  { item: "UPS", price: "₹180/piece", icon: "ups" },
  { item: "Inverter/Stabilizer (Copper Coil)", price: "₹40/kg", icon: "inverterStabilizer" },
  { item: "Battery (used with inverters)", price: "₹81/kg", icon: "battery" },
  { item: "Scrap Laptop", price: "₹300/piece", icon: "laptop" },
  { item: "CRT Monitor", price: "₹150/piece", icon: "crtMonitor" },
  { item: "LCD Monitor", price: "₹20/kg", icon: "lcdMonitor" },
  { item: "Computer CPU", price: "₹225/piece", icon: "cpu" },
  { item: "Bike", price: "₹2100/piece", icon: "bike" },
  { item: "Car", price: "₹20000/piece", icon: "car" },
];
// --- END: Moved from src/data/scrapData.js ---


const reviews = [
  {
    name: "Aman Verma",
    comment: "Fast service and great rates! Highly recommend.",
  },
  {
    name: "Priya Sharma",
    comment: "Easy to book, and they picked up everything on time.",
  },
  {
    name: "Rahul Mehta",
    comment: "Reliable and eco-friendly way to dispose of scrap.",
  },
  {
    name: "Neha Singh",
    comment: "Very smooth process from scheduling to payment.",
  },
  {
    name: "Suresh Rathi",
    comment: "Professional pickup staff. Will use again!",
  },
  {
    name: "Divya Patel",
    comment: "Loved the service and instant payment!",
  },
];

export default function Home() {
  const homePageScrapItems = scrapData.slice(0, 12); // Take a subset of items for the home page
  const navigate = useNavigate();

  // Animation variants for looping icons in "How It Works"
  const iconVariants = {
    animate: {
      y: [0, -10, 0], // Move up and down
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  // State for form inputs
  const [pickupLocation, setPickupLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [itemsList, setItemsList] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [locationChecked, setLocationChecked] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- Add this state
  const mapRef = useRef(null);

  // Modified: When checkbox is checked, get location
  const handleLocationCheckbox = async (e) => {
    const checked = e.target.checked;
    setLocationChecked(checked);
    if (checked) {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        setLocationChecked(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationError('');
        },
        (error) => {
          setLocationError("Unable to retrieve your location.");
          setLocationChecked(false);
        }
      );
    } else {
      setLatitude(null);
      setLongitude(null);
      setLocationError('');
    }
  };

  // Send data to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true); // <-- Start loading

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      toast.error("Please login first to book a pickup.");
      setIsSubmitting(false); // <-- Stop loading
      navigate("/login");
      return;
    }

    const formData = {
      pickupLocation,
      dateTime,
      itemsList,
      latitude,
      longitude,
    };

    if(!latitude || !longitude || !locationChecked || !pickupLocation || !dateTime || !itemsList){
      setSubmitError("All fields are required including location.");
      setIsSubmitting(false); // <-- Stop loading
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/pickups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401 || response.status === 403) {
        setSubmitError("You are not authorized. Please login again.");
        toast.error("Session expired or not authorized. Please login again.");
        localStorage.removeItem("token");
        setIsSubmitting(false); // <-- Stop loading
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setSubmitError("Something went wrong. Please try again.");
        setIsSubmitting(false); // <-- Stop loading
        return;
      }

      toast.success("Pickup booked successfully!");
      setPickupLocation('');
      setDateTime('');
      setItemsList('');
      setLatitude(null);
      setLongitude(null);
      navigate('/dashboard/user'); // Redirect to user dashboard
    } catch (error) {
      setSubmitError("Network error or something went wrong. Please try again later.");
    }
    setIsSubmitting(false); // <-- Stop loading
  };
  return (
    <div className="bg-green-50 text-gray-800 font-sans">
      <ToastContainer position="top-right" />
      {/* Tailwind CSS CDN and Google Font */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}


      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <motion.img
          src={logo} // Placeholder for ScrapShera logo
          alt="ScrapShera Logo"
          className="mx-auto w-32 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/CCCCCC/000000?text=Logo"; }}
        />
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Turn Scrap into Cash with <span className="text-green-600">ScrapShera</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-green-700 max-w-2xl mx-auto">
          Simplifying responsible disposal: we connect your waste with rewarding returns.
        </p>
      </section>

      {/* form */}
      <section className="px-4 py-10 bg-white max-w-2xl mx-auto rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Schedule Your Effortless Pickup
        </h2>
        <form
          onSubmit={handleFormSubmit} // Call the new handler
          className="grid grid-cols-1 gap-4"
        >
          {/* Removed Name and Mobile Number inputs */}
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={locationChecked}
              onChange={handleLocationCheckbox}
              required
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-sm">
              I allow ScrapShera to capture my live location (required)
            </span>
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          ></input>
          <textarea
            rows="3"
            placeholder="List of Items (e.g., 5kg Newspaper, 2 Plastic Bottles)"
            value={itemsList}
            onChange={(e) => setItemsList(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
          {latitude && longitude && (
            <div className="text-sm text-green-700">
              Location set: {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </div>
          )}
          {locationError && (
            <div className="text-sm text-red-600">{locationError}</div>
          )}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition-colors duration-300 flex items-center justify-center"
            
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Booking...
              </>
            ) : (
              "Book Pickup"
            )}
          </button>
          {submitError && (
            <div className="text-red-600 text-center mt-2">{submitError}</div>
          )}
        </form>
      </section>

      {/* Scrap Rates Section */}
      <section className="px-4 py-16 bg-green-100">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-800">
          Our Transparent Scrap Rates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {homePageScrapItems.map((item, idx) => {
            const IconContent = getIconComponent(item.icon); // Get the emoji/SVG string
            return (
              <motion.div
                key={idx}
                className="p-4 bg-white rounded-lg shadow hover:scale-105 transition flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                {IconContent && <span className="text-green-600 text-2xl">{IconContent}</span>} {/* Render as span */}
                <div>
                  <h4 className="font-semibold text-lg text-green-700">{item.item}</h4>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link to="/scrap-rates">
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-green-700 transition shadow-md">
              View Full Rate List
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section with Animated Icons */}
      <section className="px-6 py-16 bg-green-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Your Journey to Responsible Recycling
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-12 md:space-y-0 md:space-x-8 max-w-5xl mx-auto">
          <div className="text-center">
            <motion.div
              className="text-6xl text-green-600 mb-4"
              variants={iconVariants}
              animate="animate"
            >
              {getIconComponent('boxOpen')}
            </motion.div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">1. Choose Your Scrap</h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Select from our diverse categories of recyclable materials, including paper, plastics, and metals.
            </p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-6xl text-green-600 mb-4"
              variants={iconVariants}
              animate="animate"
            >
              {getIconComponent('calendarAlt')}
            </motion.div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">2. Schedule a Pickup</h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Easily book a convenient date and time for our team to collect your scrap directly from your doorstep.
            </p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-6xl text-green-600 mb-4"
              variants={iconVariants}
              animate="animate"
            >
              {getIconComponent('wallet')}
            </motion.div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">3. Get Paid Instantly</h3>
            <p className="text-gray-700 max-w-xs mx-auto">
              Receive competitive rates and immediate payment upon successful collection of your scrap items.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Contribution Section */}
      <section className="px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Your Impact: Contributing to a Greener Planet
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-10 md:space-y-0 md:space-x-8 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-6xl text-blue-500 mb-3 mx-auto block">{getIconComponent('tint')}</span>
            <h3 className="text-xl font-semibold text-gray-800">Conserving Water</h3>
            <p className="text-gray-600 text-sm">Every piece recycled saves gallons of precious water.</p>
          </div>
          <div className="text-center">
            <span className="text-6xl text-green-500 mb-3 mx-auto block">{getIconComponent('tree')}</span>
            <h3 className="text-xl font-semibold text-gray-800">Protecting Forests</h3>
            <p className="text-gray-600 text-sm">Your old paper helps us save countless trees.</p>
          </div>
          <div className="text-center">
            <span className="text-6xl text-yellow-500 mb-3 mx-auto block">{getIconComponent('bolt')}</span>
            <h3 className="text-xl font-semibold text-gray-800">Saving Energy</h3>
            <p className="text-gray-600 text-sm">Recycling reduces energy consumption significantly.</p>
          </div>
          <div className="text-center">
            <span className="text-6xl text-gray-700 mb-3 mx-auto block">{getIconComponent('oilCan')}</span>
            <h3 className="text-xl font-semibold text-gray-800">Reducing Oil Usage</h3>
            <p className="text-gray-600 text-sm">Less raw material extraction means less oil consumed.</p>
          </div>
        </div>
        <p className="text-center text-lg text-green-700 mt-12 max-w-3xl mx-auto">
          With ScrapShera, every item you recycle contributes directly to
          preserving natural resources and fostering a more sustainable future.
          Join us in making a tangible difference!
        </p>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-green-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
          Hear from Our Satisfied Customers
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-lg font-semibold text-green-900 mb-2">
                {review.name}
              </p>
              <p className="text-gray-700">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </section>


    </div>
  );
}
