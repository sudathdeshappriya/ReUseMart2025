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

router.get('/fv-items', getAllItems);




router.delete("/delete-item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



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



