import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: process.env.REACT_APP_API_URL,
    sessionId: null
  });
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  
  useEffect(() => {
    // Update debug info
    setDebugInfo(prev => ({
      ...prev,
      sessionId
    }));
    
    const fetchSessionData = async () => {
      if (!sessionId) {
        setLoading(false);
        setError('No session ID found in URL. Please return to the homepage.');
        return;
      }
      
      try {
        const apiUrl = process.env.REACT_APP_API_URL || '/api';
        console.log('Fetching session data from:', `${apiUrl}/checkout/session/${sessionId}`);
        
        const response = await axios.get(`${apiUrl}/checkout/session/${sessionId}`);
        console.log('Session data received:', response.data);
        
        setSessionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session data:', err);
        setError(`Could not verify your payment: ${err.message}. Please contact support if you believe this is an error.`);
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
        <p className="mt-2 text-sm text-gray-500">Session ID: {sessionId || 'Not found'}</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
        
        {process.env.NODE_ENV !== 'production' && (
          <div className="bg-gray-100 p-4 mb-6 rounded text-left">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
        
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
        <div className="card max-w-md mx-auto mb-8 p-6 bg-white shadow-md rounded">
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
      
      <Link to="/" className="btn btn-primary bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
        Return to Homepage
      </Link>
    </div>
  );
};

export default SuccessPage; 