
import express from 'express';
import  {getWelcomeMessage,enquirePackageDetails} from '../controllers/whatsappControllers.js'


const router = express.Router();




router.post('/welcome-message',getWelcomeMessage)  
router.post('/enquire-package-details',enquirePackageDetails)



export default router