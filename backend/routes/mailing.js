import express from 'express';
import {sendEmail} from '../controllers/mailingController.js'


const router = express.Router();

router.route('/send').post(sendEmail);

export default router;