import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkout/session/${sessionId}`);
        setSessionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session data:', err);
        setError('Could not verify your payment. Please contact support if you believe this is an error.');
        setLoading(false);
      }
    };
    
    fetchSessionData();
  }, [sessionId]);
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Verifying your payment...</p>
      </div>
    );
  }
  
  if (error || !sessionId) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error || 'Invalid session. Please return to the homepage.'}</p>
        </div>
        <Link to="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    );
  }
  
  return (
    <div className="text-center py-12">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="text-xl font-bold">Thank You!</p>
        <p>Your payment was successful.</p>
      </div>
      
      {sessionData && (
        <div className="card max-w-md mx-auto mb-8">
          <h3 className="text-xl font-bold mb-4 text-primary">Payment Details</h3>
          <div className="text-left">
            <p className="mb-2">
              <span className="font-semibold">Amount:</span> ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency.toUpperCase()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span> {sessionData.status}
            </p>
            {sessionData.customer_email && (
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {sessionData.customer_email}
              </p>
            )}
          </div>
        </div>
      )}
      
      <Link to="/" className="btn btn-primary">
        Return to Homepage
      </Link>
    </div>
  );
};

export default SuccessPage; 