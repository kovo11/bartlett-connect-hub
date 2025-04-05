import { format } from "date-fns";
import emailjs from "emailjs-com";

// Format event type for display
const formatEventType = (eventType: string): string => {
  switch (eventType) {
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
  eventType: string,
  formattedDate: string
): string => {
  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);
  const currentYear = new Date().getFullYear();
  
  // Return HTML with placeholders for dynamic content
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
    .payment-section {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-top: 30px;
    }
    .bold-warning {
      font-weight: bold;
      color: #c00;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Registering!</h1>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">{{to_name}}</span>,</p>
      <p>Thank you for registering your interest in our upcoming <span class="highlight">{{event_type}}</span> event. We're thrilled to have you join us!</p>

      <div class="details">
        <p><strong>Event Type:</strong> {{event_type}}</p>
        <p><strong>Preferred Location:</strong> {{location}}</p>
        <p><strong>Date Registered:</strong> {{formatted_date}}</p>
        <p><strong>Booking Reference:</strong> SB-{{booking_ref}}</p>
        <p><strong>Price:</strong> <span class="highlight">{{eventPrice}}</span> per person</p>
      </div>

      <div class="payment-section">
        <p class="bold-warning">⚠️ Your booking is not yet confirmed – payment is pending.</p>
        <p>Please choose your preferred payment method from the options below:</p>
        <ul>
          <li>💳 <strong>Credit/Debit Card</strong></li>
          <li>🏦 <strong>Bank Transfer</strong></li>
          <li>💰 <strong>Cryptocurrency (USDT, LTC, BTC)</strong></li>
        </ul>
        <p>To proceed, simply <strong>reply to this email</strong> with your preferred payment method and let us know if you have any requests or questions.</p>
      </div>

      <img class="event-image" src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Event Image" />

      <p>We'll be in touch soon with more information about upcoming events that match your preferences. In the meantime, if you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>The Steven Bartlett Team</
  `;
};

// Initialize EmailJS with your public key
export const initEmailJS = (): void => {
  emailjs.init("_BtyukWyct1h9S7Hc"); // Replace with your public key
  console.log("EmailJS initialized with public key");
};

// Send confirmation email to the client using EmailJS
export const sendConfirmationEmail = async (
  email: string,
  name: string,
  location: string,
  eventType: string
): Promise<void> => {
  if (!email) {
    console.error("Recipient email address is empty. Cannot send confirmation email.");
    throw new Error("Recipient email address is required.");
  }

  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);
  const currentYear = new Date().getFullYear();
  const formattedDate = format(new Date(), "MMMM d, yyyy");
  const bookingRef = Math.floor(100000 + Math.random() * 900000); // Booking reference

  // Prepare template params with dynamic values
  const templateParams = {
    to_email: email,             // Client email address
    to_name: name,               // Recipient's name
    from_name: "Steven Bartlett Team", // Sender name
    location: formattedLocation, // Event location
    event_type: eventTypeName,   // Event type
    formatted_date: formattedDate, // Date of registration
    booking_ref: bookingRef,     // Booking reference
    reply_to: "support@stevenbartlett.info", // Reply-to email
    current_year: currentYear,   // Current year
    html_content: generateEmailTemplate(name, formattedLocation, eventType, formattedDate) // HTML content
  };

  try {
    const response = await emailjs.send(
      "service_lx7m2wb", // Replace with your service ID
      "template_zs9kpwf", // Confirmation email template ID
      templateParams,
      "_BtyukWyct1h9S7Hc" // Replace with your public key
    );
    console.log("Confirmation email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    throw error;
  }
};

// Send booking details to support using EmailJS
export const sendSupportEmail = async (
  name: string,
  clientEmail: string,
  bookingDetails: string,
  eventType: string,
  location: string
): Promise<void> => {
  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);

  try {
    const templateParams = {
      to_email: "support@stevenbartlett.info", // Support email address
      to_name: "Support Team",
      from_name: name,
      location: formattedLocation,
      event_type: eventTypeName,
      message: bookingDetails,
      reply_to: clientEmail,
      html_content: `<p>New booking registration for a ${eventTypeName} event.</p>
                     <p>${bookingDetails}</p>`
    };

    const response = await emailjs.send(
      "service_lx7m2wb", // Replace with your service ID
      "template_knkhvfb", // Support email template ID
      templateParams,
      "_BtyukWyct1h9S7Hc" // Replace with your public key
    );
    console.log("Support email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send support email:", error);
    throw error;
  }
};

// Unified function to send both confirmation email and support email
export const sendBookingEmails = async (
  email: string,
  name: string,
  location: string,
  eventType: string,
  bookingDetails: string
): Promise<void> => {
  // Send Confirmation Email
  await sendConfirmationEmail(email, name, location, eventType);

  // Send Support Email
  await sendSupportEmail(name, email, bookingDetails, eventType, location);
};
