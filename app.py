import logging
logging.basicConfig(level=logging.DEBUG)

# app.py
from flask import Flask, request, jsonify
import random
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Simulated fraud detection model
def predict_fraud(transaction_data):
    """
    Simple fraud detection logic:
    - Transactions > $10,000 have 70% chance of fraud
    - International transactions have 40% chance of fraud
    - New accounts (<30 days) have 30% chance of fraud
    - Otherwise 5% chance of fraud
    """
    amount = transaction_data.get('amount', 0)
    is_international = transaction_data.get('is_international', False)
    account_age_days = transaction_data.get('account_age_days', 0)
    user_history = transaction_data.get('previous_transactions', 0)
    
    fraud_probability = 0.05  # Base probability
    
    if amount > 10000:
        fraud_probability += 0.7
    if is_international:
        fraud_probability += 0.4
    if account_age_days < 30:
        fraud_probability += 0.3
    if user_history < 5:
        fraud_probability += 0.2
        
    # Cap at 0.95 max probability
    fraud_probability = min(fraud_probability, 0.95)
    
    # Determine if fraudulent based on probability
    is_fraud = random.random() < fraud_probability
    
    return {
        'is_fraud': is_fraud,
        'fraud_probability': fraud_probability,
        'fraud_score': int(fraud_probability * 100),
        'risk_level': 'High' if fraud_probability > 0.7 else 'Medium' if fraud_probability > 0.3 else 'Low'
    }

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'status': 'online',
        'service': 'Fraud Detection API',
        'version': '1.0.0'
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        transaction_data = request.json
        if not transaction_data:
            return jsonify({'error': 'No transaction data provided'}), 400
            
        result = predict_fraud(transaction_data)
        
        # Add transaction details to response
        response = {
            'transaction_id': transaction_data.get('transaction_id', 'unknown'),
            'prediction': result,
            'timestamp': transaction_data.get('timestamp', None)
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app on port 5001...")
    try:
        port = int(os.environ.get('PORT', 5001))
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        print(f"Error starting Flask app: {e}")