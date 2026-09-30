import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          'http://localhost:5000/api/payment/history',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          setTransactions(response.data.transactions);
        }
      } catch (err) {
        setError('Failed to fetch transaction history');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'green' };
      case 'rejected':
        return { color: 'red' };
      default:
        return { color: 'orange' };
    }
  };

  const getRiskStyle = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return { color: 'red' };
      case 'medium':
        return { color: 'orange' };
      default:
        return { color: 'green' };
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transaction History</h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Risk Level</th>
              <th>Receiver</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{formatDate(txn.date)}</td>
                <td>${txn.amount}</td>
                <td style={getStatusStyle(txn.status)}>{txn.status}</td>
                <td style={getRiskStyle(txn.riskLevel)}>{txn.riskLevel}</td>
                <td>{txn.receiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
