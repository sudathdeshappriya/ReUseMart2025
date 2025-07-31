import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    itemName: String,
    category: String,
    price: Number,
    contact: String,
    location: String,
    condition: String,
    description: String,
    imageUrl: String,
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
