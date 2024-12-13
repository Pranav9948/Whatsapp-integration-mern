import colors from "colors";
import {
  getTextMessageInput,
  sendMessage,
  getTemplatedMessageInput,getWelcomeMessageTemplate
} from "../Helpers/WhatsappHelper.js";

const getWelcomeMessage = async (req, res) => {
  try {

    console.log('tour',req.body);
    
    const {  recipientName} = req.body; 
    const response = getWelcomeMessageTemplate(
      process.env.RECIPIENT_WAID,
     recipientName     
    )

    const completedResponse = sendMessage(response);  

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");

    
  } catch (error) {
    // Log and handle error
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return res.status(500).send("Failed to send message.");
  }
};

const enquirePackageDetails = async (req, res) => {
  try {
    console.log('tour',req.body);
    
    const {  selectedPackage } = req.body; 

    const Package =  selectedPackage[0];

    const response = getTemplatedMessageInput(
      process.env.RECIPIENT_WAID,
     Package 
    );

    console.log("response message", response);  

    const completedResponse = sendMessage(response); 

    console.log("completedResponse", completedResponse);

    return res.status(200).send("Message sent successfully.");
  } catch (error) {

     console.error(
       "Error sending message:",
       error.response?.data || error.message
     );
     return res.status(500).send("Failed to send message.");
  }
};

export { getWelcomeMessage, enquirePackageDetails };
