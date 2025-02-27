import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CoffeeOption = ({ type, title, price, description, image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuyClick = async () => {
    try {
      // Show loading state
      setIsLoading(true);
      setError(null);
      
      console.log('Starting checkout process for', type);
      console.log('API URL:', process.env.REACT_APP_API_URL);
      
      // Get Stripe.js instance
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }
      
      // Call backend to create checkout session
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/checkout/create-checkout-session`, {
        coffeeType: type
      });
      
      console.log('Checkout session created:', response.data);
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      
      // If redirectToCheckout fails, display error
      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
        setError(result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card flex flex-col h-full">
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <img 
          src={image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <span className="text-lg font-semibold">${(price / 100).toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {error && (
          <p className="text-red-500 text-sm mb-2">Error: {error}</p>
        )}
      </div>
      
      <div className="p-4 pt-0">
        <button 
          onClick={handleBuyClick}
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? 'İşleniyor...' : 'Ismarla'}
        </button>
      </div>
    </div>
  );
};

export default CoffeeOption; 