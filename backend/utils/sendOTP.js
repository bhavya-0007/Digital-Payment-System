// utils/sendOTP.js
const sgMail = require('@sendgrid/mail');

const generateOTP = () => {
  // Generate 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
  try {
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Prepare email
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL, // Must be verified sender
      subject: 'Your SecurePay OTP Code',
      text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
      html: `<h1>Your OTP Code</h1>
             <p>Use this code to verify your login:</p>
             <h2 style="color: #4CAF50;">${otp}</h2>
             <p>This code will expire in 10 minutes.</p>`
    };
    
    // Send email
    await sgMail.send(msg);
    console.log(`✅ OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendOTP
};