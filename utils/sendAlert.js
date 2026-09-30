// utils/sendAlert.js
const sgMail = require('@sendgrid/mail');

const sendFraudAlert = async (transaction) => {
  try {
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Prepare email content
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDER_EMAIL, // Must be verified sender
      subject: `🚨 FRAUD ALERT: Transaction ${transaction.transactionId}`,
      html: `
        <h1 style="color: #ff0000;">Fraud Alert</h1>
        <p>A potentially fraudulent transaction has been detected:</p>
        <ul>
          <li><strong>Transaction ID:</strong> ${transaction.transactionId}</li>
          <li><strong>Amount:</strong> $${transaction.amount.toFixed(2)}</li>
          <li><strong>Fraud Score:</strong> ${transaction.fraudScore}</li>
          <li><strong>Risk Level:</strong> ${transaction.riskLevel}</li>
          <li><strong>Time:</strong> ${transaction.timestamp}</li>
        </ul>
        <p>Please review this transaction in the admin dashboard.</p>
      `
    };

    // Send email
    await sgMail.send(msg);
    console.log(`✅ Fraud alert sent for transaction ${transaction.transactionId}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending fraud alert:', error);
    return false;
  }
};

module.exports = {
  sendFraudAlert
};