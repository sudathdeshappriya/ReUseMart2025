import Item from '../models/item.js';
import fs from 'fs';

export const addItem = async (req, res) => {
    try {
        const { itemName, category, price, contact, location, condition, description } = req.body;
        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

        const newItem = new Item({
            itemName,
            category,
            price,
            contact,
            location,
            condition,
            description,
            imageUrl
        });

        await newItem.save();
        res.status(201).json({ success: true, item: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Failed to retrieve items" });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
