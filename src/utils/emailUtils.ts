
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exclusive Events with Steven Bartlett</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #1a1a1a;
      color: #fff;
      padding: 30px 20px;
      text-align: center;
    }
    .gold-text {
      color: #d4af37;
    }
    .content {
      padding: 30px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(to right, #d4af37, #aa8e2b);
      color: #1a1a1a;
      text-decoration: none;
      font-weight: bold;
      padding: 14px 30px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .highlight-box {
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      background-color: #1a1a1a;
      color: #aaa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-links a {
      margin: 0 10px;
      text-decoration: none;
    }
    .image-container {
      text-align: center;
      margin: 20px 0;
    }
    .image-container img {
      max-width: 100%;
      border-radius: 5px;
    }
    .gold-divider {
      height: 3px;
      background: linear-gradient(to right, #d4af37, #aa8e2b);
      border: none;
      margin: 20px 0;
    }
    @media screen and (max-width: 480px) {
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Exclusive <span class="gold-text">Invitation</span></h1>
      <p>Meet Steven Bartlett in ${currentYear}</p>
    </div>
    
    <div class="content">
      <h2>Dear ${name},</h2>
      
      <p>Thank you for registering your interest in our upcoming <strong>${eventTypeName}</strong> event. We're thrilled to have you join us!</p>
      
      <div class="highlight-box">
        <h3 style="color: #d4af37;">Event Details</h3>
        <p><strong>Event Type:</strong> ${eventTypeName}</p>
        <p><strong>Preferred Location:</strong> ${formattedLocation}</p>
        <p><strong>Date Registered:</strong> ${formattedDate}</p>
        <p><strong>Booking Reference:</strong> SB-${Math.floor(100000 + Math.random() * 900000)}</p>
        <p><strong style="color: #d4af37;">Spaces are strictly limited to ensure quality interaction.</strong></p>
      </div>

      <p>For complete details on upcoming events, locations, dates, and to secure your spot:</p>
      
      <div style="text-align: center;">
        <a href="https://www.stevenbartlett.info" class="cta-button">VISIT OUR WEBSITE</a>
      </div>
      
      <hr class="gold-divider">
      
      <p style="text-align: center;">Don't miss this opportunity to meet Steven and connect with like-minded entrepreneurs.</p>
      
      <p>Best regards,<br>The Steven Bartlett Team</p>
    </div>
    
    <div class="footer">
      <p>© ${currentYear} Steven Bartlett Events</p>
      <div class="social-links">
        <a href="https://twitter.com" style="color: #aaa;">Twitter</a>
        <a href="https://instagram.com" style="color: #aaa;">Instagram</a>
        <a href="https://linkedin.com" style="color: #aaa;">LinkedIn</a>
      </div>
      <p>
        <small>For any questions: <a href="mailto:support@stevenbartlett.info" style="color: #aaa;">support@stevenbartlett.info</a></small>
      </p>
      <p>
        <small>If you wish to unsubscribe, <a href="#" style="color: #aaa;">click here</a></small>
      </p>
    </div>
  </div>
</body>
</html>
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
