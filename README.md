# Secure Digital Payment System for Financial Inclusion

A secure full-stack digital payment platform designed to improve the security and reliability of digital transactions by combining **multi-factor authentication, blockchain technology, and machine-learning-based fraud detection**.

## Overview

The system provides a secure environment for users to perform digital payments while incorporating multiple layers of protection against unauthorized access and fraudulent transactions.

The application combines a React frontend with a Node.js/Express backend, MongoDB for application data, Ethereum smart contracts for tamper-resistant transaction records, and a Random Forest-based fraud detection service built with Flask.

## Key Features

* Secure user authentication using **JWT**
* **OTP-based Multi-Factor Authentication (MFA)**
* Digital payment and transaction management
* **Random Forest** model for transaction fraud detection
* Python-based ML microservice using **Flask**
* Blockchain-based transaction recording using **Ethereum smart contracts**
* MongoDB-based application and transaction data management
* RESTful API architecture
* Separation of payment processing and ML services

## System Architecture

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node.js / Express│
                    │     Backend      │
                    └───────┬─────┬────┘
                            │     │
               ┌────────────┘     └─────────────┐
               ▼                                ▼
       ┌──────────────┐                ┌────────────────┐
       │   MongoDB    │                │ Flask ML API   │
       │ Application  │                │ Random Forest  │
       │    Data      │                │ Fraud Detection │
       └──────────────┘                └────────────────┘
                                               
                            │
                            ▼
                   ┌─────────────────┐
                   │ Ethereum Smart  │
                   │    Contract     │
                   └─────────────────┘
```

## Transaction Workflow

1. The user authenticates through the React application.
2. JWT authentication and OTP-based MFA verify the user's identity.
3. The user initiates a payment through the frontend.
4. The Node.js/Express backend validates the transaction.
5. Transaction features are sent to the Flask-based fraud detection service.
6. The Random Forest model classifies the transaction as legitimate or potentially fraudulent.
7. Valid transactions proceed through the payment workflow.
8. Relevant transaction records are stored using MongoDB and the blockchain layer provides a tamper-resistant transaction record.

## Machine Learning

The fraud detection component uses a **Random Forest classifier** trained for transaction classification.

The model is exposed through a Flask REST API, allowing the Node.js backend to communicate with the ML model independently.

```text
Transaction Data
       ↓
Feature Processing
       ↓
Flask ML API
       ↓
Random Forest Classifier
       ↓
Fraud / Legitimate
       ↓
Backend Decision
```

Using a separate ML service keeps the machine-learning component independent from the main payment backend and allows the model to be updated or replaced without redesigning the entire application.

## Blockchain Integration

Ethereum smart contracts were used to provide a tamper-resistant mechanism for recording transaction information.

The blockchain component acts as an additional integrity and auditability layer, while MongoDB handles conventional application data and database operations.

Smart-contract development and deployment were handled using **Truffle** on the Ethereum test network.

## Security

The application implements multiple security layers:

* JWT-based authentication
* OTP-based Multi-Factor Authentication
* Backend request validation
* Transaction-level fraud detection
* Blockchain-based transaction integrity
* Separation of ML and application services

## Technology Stack

| Component              | Technology          |
| ---------------------- | ------------------- |
| Frontend               | React.js            |
| Backend                | Node.js, Express.js |
| Database               | MongoDB             |
| Authentication         | JWT, OTP-based MFA  |
| ML Model               | Random Forest       |
| ML Service             | Python, Flask       |
| Blockchain             | Ethereum            |
| Smart Contracts        | Solidity            |
| Blockchain Development | Truffle             |
| Communication          | REST APIs           |

## Project Structure

```text
secure-digital-payment-system/
│
├── frontend/              # React frontend
│
├── backend/               # Node.js/Express backend
│
├── ml-service/            # Flask fraud detection service
│   ├── model/
│   ├── app.py
│   └── ...
│
├── blockchain/             # Smart contracts and Truffle configuration
│   ├── contracts/
│   ├── migrations/
│   └── truffle-config.js
│
├── database/               # Database-related configuration
│
└── README.md
```

## Project Objective

The project demonstrates how **AI, blockchain, and secure authentication mechanisms can be combined in a digital payment architecture** to improve transaction security, detect potentially fraudulent activity, and maintain reliable transaction records.

## Future Enhancements

* Real-time fraud monitoring and alerting
* Advanced anomaly-detection models
* Role-based access control
* Transaction risk scoring
* Redis-based caching
* Containerized deployment using Docker
* Cloud deployment and monitoring
* Integration with production-grade payment gateways

## Authors

**Bhavya Sree Achanta**

B.Tech – Computer Science and Engineering
