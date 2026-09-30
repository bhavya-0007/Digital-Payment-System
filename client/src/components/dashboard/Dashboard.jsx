import React from 'react';
import { Link } from 'react-router-dom';
import TransactionList from './TransactionList';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to SecurePay Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Make a Payment</h3>
            <p className="mt-1 text-sm text-gray-500">
              Process a secure payment with our fraud detection system.
            </p>
            <div className="mt-4">
              <Link
                to="/payment"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                New Payment
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
            <p className="mt-1 text-sm text-gray-500">
              View all your past transactions and payment details.
            </p>
            <div className="mt-4">
              <Link
                to="/transactions"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                View Transactions
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account security and settings.
            </p>
            <div className="mt-4">
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      <TransactionList limit={5} />
    </div>
  );
};

export default Dashboard;