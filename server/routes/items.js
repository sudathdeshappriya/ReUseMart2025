import express from 'express';
import upload from '../middleware/upload.js';
import { addItem } from '../controllers/itemController.js';
import { getAllItems } from '../controllers/itemController.js';
import { getItemById } from "../controllers/itemController.js";
import Item from '../models/item.js';


const router = express.Router();

// POST /api/add-item
router.post('/add-item', upload.single('image'), addItem);

router.get('/items', getAllItems);





// routes/items.js or wherever you define it
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const items = await Item.find({
      itemName: { $regex: searchQuery, $options: 'i' }
    });

    res.json(items);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", getItemById);

export default router;



