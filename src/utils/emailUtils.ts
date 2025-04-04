import { format } from "date-fns";

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
  // Format location and event type for display
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
          </div>
          
          <img class="event-image" src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Event Image">
          
          <p>We'll be in touch soon with more information about upcoming events that match your preferences. In the meantime, if you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          The Steven Bartlett Team</p>
          
          <a href="https://stevenbartlett.info" class="button">Visit Our Website</a>
        </div>
        
        <div class="footer">
          <p>© ${currentYear} Steven Bartlett. All rights reserved.</p>
          <p>You're receiving this email because you registered for one of our events.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send confirmation email using Formspree
export const sendConfirmationEmail = async (
  email: string,
  name: string,
  location: string,
  eventType: string
): Promise<void> => {
  const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const eventTypeName = formatEventType(eventType);
  
  try {
    // Create an object with the form data
    const formData = {
      email,
      name,
      location: formattedLocation,
      eventType: eventTypeName,
      date: format(new Date(), "MMMM d, yyyy"),
      message: `New registration for ${eventTypeName} event in ${formattedLocation}`,
      _subject: `Registration for ${eventTypeName} Event`,
    };

    // Send to Formspree
    const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", { // Replace with your Formspree endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }

  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send confirmation email");
  }
};

// For backward compatibility, keep the initEmailJS function as a no-op
export const initEmailJS = (): void => {
  // This function now does nothing as we're not using EmailJS
  console.log("Email service initialized");
};
