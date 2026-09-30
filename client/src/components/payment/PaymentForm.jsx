import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    isInternational: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await axios.post(
        'http://localhost:5000/api/payment/process', 
        {
          amount: parseFloat(formData.amount),
          cardDetails: {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            isInternational: formData.isInternational
          },
          userId: JSON.parse(atob(token.split('.')[1])).id // Extract userId from JWT
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        setSuccess(response.data);
        // Clear form
        setFormData({
          amount: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          isInternational: false
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Secure Payment</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Process a new payment</h1>
          
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex flex-col">
                <p className="text-sm text-green-700 font-bold">Payment processed successfully!</p>
                <p className="text-sm text-green-700">Transaction ID: {success.transactionId}</p>
                <p className="text-sm text-green-700">Fraud Score: {success.fraudScore}</p>
                <p className="text-sm text-green-700">Risk Level: {success.riskLevel}</p>
              </div>
            </div>
          )}
          
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount ($)
              </label>
              <div className="mt-1">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <div className="mt-1">
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <div className="mt-1">
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    required
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <div className="mt-1">
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                    value={formData.cvv}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="isInternational"
                name="isInternational"
                type="checkbox"
                checked={formData.isInternational}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isInternational" className="ml-2 block text-sm text-gray-900">
                International transaction
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? 'Processing...' : 'Make Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;