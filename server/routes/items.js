import express from 'express';
import upload from '../middleware/upload.js';
import { addItem } from '../controllers/itemController.js';
import { getAllItems } from '../controllers/itemController.js';


const router = express.Router();

// POST /api/add-item
router.post('/add-item', upload.single('image'), addItem);

router.get('/items', getAllItems);


export default router;



