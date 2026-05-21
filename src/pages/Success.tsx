import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for choosing CaRS. Your booking has been successfully confirmed.
            </p>
            
            {bookingData && (
              <div className="text-left bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-gray-300 text-sm"><strong className="text-red-500">Car:</strong> {bookingData.car.name}</p>
                <p className="text-gray-300 text-sm mt-1"><strong className="text-red-500">Name:</strong> {bookingData.formData.fullName}</p>
                <p className="text-gray-300 text-sm mt-1"><strong className="text-red-500">Email:</strong> {bookingData.formData.email}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition"
              >
                Back to Home
              </Link>
              <Link
                to="/services"
                className="px-6 py-2.5 border-2 border-red-600 text-white rounded-full font-semibold hover:bg-red-600 transition"
              >
                Browse More Cars
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Success;