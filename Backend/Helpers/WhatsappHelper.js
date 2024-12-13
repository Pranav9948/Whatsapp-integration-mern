import axios from "axios";

async function sendMessage(data) {
  try {
    const config = {
      method: "post",
      url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from API:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was sent but no response received
      console.error("No response received:", error.request);
    } else {
      // An error occurred while setting up the request
      console.error("Error setting up request:", error.message);
    }

    // Re-throw the error to let the caller handle it
    throw new Error(
      `Failed to send message: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  });
}


function getTemplatedMessageInput(recipient, tourPackage) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "tour_package_enquiry",
      language: {
        code: "en",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: tourPackage.images, 
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text", 
              text: tourPackage.name,
            },
            {
              type: "text", 
              text: tourPackage.description,
            },
            {
              type: "text", 
              text: tourPackage.place,
            },
            {
              type: "text", 
              text: tourPackage.cost,
            },
          ], 
        },
      ],
    },
  });
}



function getWelcomeMessageTemplate(recipient,recipientName) {
  console.log("recipientName",recipientName);
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: "welcome_message_" ,
      language: {
        code: "en",
      },
      components: [

        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://i.ytimg.com/vi/XqIKXb4FYuo/maxresdefault.jpg", 
              },
            },
          ],
        },
        
        {
          type: "body",
          parameters: [
            {
              type: "text", 
              text: recipientName,
            },
           
          ],
        },
      ],
    },
  });
}


export { sendMessage, getTextMessageInput, getTemplatedMessageInput ,getWelcomeMessageTemplate};
