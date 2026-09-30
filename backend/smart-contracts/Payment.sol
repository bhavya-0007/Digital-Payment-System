// smart-contracts/Payment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    address public owner;
    mapping(string => bool) public processedTransactions;
    
    event PaymentProcessed(string transactionId, address sender, address receiver, uint amount, uint timestamp);
    
    constructor() {
        owner = msg.sender;
    }
    
    function processPayment(string memory transactionId, address payable receiver) public payable {
        require(!processedTransactions[transactionId], "Transaction already processed");
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        // Process payment
        receiver.transfer(msg.value);
        
        // Mark transaction as processed
        processedTransactions[transactionId] = true;
        
        // Emit event
        emit PaymentProcessed(transactionId, msg.sender, receiver, msg.value, block.timestamp);
    }
}