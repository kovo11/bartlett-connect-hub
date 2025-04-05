
import { format } from "date-fns";
import emailjs from 'emailjs-com';

// Format event type for display
const formatEventType = (eventType: string): string => {
  switch(eventType) {
    case "meetgreet":
      return "Meet & Greet";
    case "dinner":
      return "VIP Dinner";
    case "workshop":
      return "Workshop";
    case "qa":
      return "Q&A Session";
    default:
      return eventType;
  }
};

// Email template for registration confirmation
const generateEmailTemplate = (
  name: string, 
  location: string, 
  eventType: string
): string => {
  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);
  const currentYear = new Date().getFullYear();
  const formattedDate = format(new Date(), "MMMM d, yyyy");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background-color: #1a1a1a;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 20px;
        }
        .content {
          padding: 30px;
        }
        .footer {
          background-color: #1a1a1a;
          color: #aaa;
          padding: 15px;
          text-align: center;
          font-size: 12px;
        }
        .highlight {
          color: #d4af37;
          font-weight: bold;
        }
        .button {
          display: inline-block;
          background-color: #d4af37;
          color: #1a1a1a;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 20px;
        }
        .event-image {
          width: 100%;
          height: auto;
          margin: 20px 0;
        }
        .details {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #d4af37;
          margin: 20px 0;
        }
        .payment-options {
          margin-top: 30px;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 5px;
        }
        .payment-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #1a1a1a;
          border-bottom: 2px solid #d4af37;
          padding-bottom: 8px;
        }
        .payment-methods {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 15px;
        }
        .payment-method {
          text-align: center;
          width: 45%;
          margin-bottom: 15px;
          padding: 15px 10px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .payment-icon {
          font-size: 24px;
          margin-bottom: 10px;
          color: #d4af37;
        }
        .payment-label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .payment-info {
          font-size: 14px;
          color: #666;
        }
        .bank-details {
          margin-top: 20px;
          padding: 15px;
          background-color: #f0f0f0;
          border-radius: 5px;
          font-size: 14px;
        }
        .bank-details p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Registering!</h1>
        </div>
        
        <div class="content">
          <p>Hello <span class="highlight">${name}</span>,</p>
          
          <p>Thank you for registering your interest in our upcoming <span class="highlight">${eventTypeName}</span> event. We're thrilled to have you join us!</p>
          
          <div class="details">
            <p><strong>Event Type:</strong> ${eventTypeName}</p>
            <p><strong>Preferred Location:</strong> ${formattedLocation}</p>
            <p><strong>Date Registered:</strong> ${formattedDate}</p>
            <p><strong>Booking Reference:</strong> SB-${Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          
          <img class="event-image" src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Event Image">
          
          <p>We'll be in touch soon with more information about upcoming events that match your preferences. In the meantime, if you have any questions, please don't hesitate to contact us.</p>
          
          <div class="payment-options">
            <div class="payment-title">Payment Options</div>
            <p>To secure your spot, please complete payment using one of the following methods:</p>
            
            <div class="payment-methods">
              <div class="payment-method">
                <div class="payment-icon">💳</div>
                <div class="payment-label">Credit/Debit Card</div>
                <div class="payment-info">Pay securely via our online portal</div>
                <a href="https://stevenbartlett.info/payment" class="button" style="margin-top: 10px; font-size: 12px; padding: 8px 15px;">Pay Now</a>
              </div>
              
              <div class="payment-method">
                <div class="payment-icon">🏦</div>
                <div class="payment-label">Bank Transfer</div>
                <div class="payment-info">Use the bank details below</div>
              </div>
              
              <div class="payment-method">
                <div class="payment-icon">📱</div>
                <div class="payment-label">Mobile Payment</div>
                <div class="payment-info">Apple Pay, Google Pay, PayPal</div>
                <a href="https://stevenbartlett.info/mobile-payment" class="button" style="margin-top: 10px; font-size: 12px; padding: 8px 15px;">Pay Mobile</a>
              </div>
              
              <div class="payment-method">
                <div class="payment-icon">₿</div>
                <div class="payment-label">Cryptocurrency</div>
                <div class="payment-info">BTC, ETH, and more</div>
                <a href="https://stevenbartlett.info/crypto-payment" class="button" style="margin-top: 10px; font-size: 12px; padding: 8px 15px;">Crypto Details</a>
              </div>
            </div>
            
            <div class="bank-details">
              <p><strong>Bank Transfer Details:</strong></p>
              <p>Account Name: Steven Bartlett Events Ltd</p>
              <p>Account Number: XXXX-XXXX-1234</p>
              <p>Sort Code: XX-XX-XX</p>
              <p>Reference: SB-${Math.floor(100000 + Math.random() * 900000)}</p>
              <p>Bank: Example Bank PLC</p>
              <p><em>Please include your reference number in all transfers</em></p>
            </div>
          </div>
          
          <p style="margin-top: 30px;">Best regards,<br>
          The Steven Bartlett Team</p>
          
          <a href="https://stevenbartlett.info" class="button">Visit Our Website</a>
        </div>
        
        <div class="footer">
          <p>© ${currentYear} Steven Bartlett. All rights reserved.</p>
          <p>You're receiving this email because you registered for one of our events.</p>
          <p>For support, contact <a href="mailto:support@stevenbartlett.info" style="color: #d4af37;">support@stevenbartlett.info</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Initialize EmailJS with public key
export const initEmailJS = (): void => {
  emailjs.init("_BtyukWyct1h9S7Hc");
  console.log("EmailJS initialized with public key");
};

// Send confirmation email using EmailJS
export const sendConfirmationEmail = async (
  email: string,
  name: string,
  location: string,
  eventType: string
): Promise<void> => {
  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);
  
  try {
    // Create template parameters for EmailJS
    const templateParams = {
      to_email: email,
      to_name: name,
      from_name: "Steven Bartlett Team",
      location: formattedLocation,
      event_type: eventTypeName,
      message: `Thank you for registering for our ${eventTypeName} event!`,
      reply_to: "support@stevenbartlett.info",
      html_content: generateEmailTemplate(name, formattedLocation, eventType)
    };

    console.log("Sending email with EmailJS:", templateParams);
    
    // Send the email using EmailJS
    const response = await emailjs.send(
      "service_juoltas", // Updated service ID
      "template_default", // You'll need to create a template in EmailJS dashboard and replace this
      templateParams,
      "_BtyukWyct1h9S7Hc" // Public key
    );

    console.log("Email sent successfully:", response);
    
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // Re-throw to let calling code handle the error
  }
};
