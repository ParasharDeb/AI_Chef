import express from 'express'
import { connectDB, adminModel, dishModel } from "../../database/dist/index.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app=express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Middleware to verify JWT token
const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Admin signup endpoint
app.post("/admin/signup", async (req, res) => {
    try {
        await connectDB();
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ name: username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new admin
        const newAdmin = new adminModel({
            name: username,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin login endpoint
app.post("/admin", async (req, res) => {
    try {
        await connectDB();
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const admin = await adminModel.findOne({ name: username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, username: admin.name }, JWT_SECRET);
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new item endpoint
app.post("/newitem", verifyToken, async (req, res) => {
    try {
        console.log("reached")
        await connectDB();
        const { name, price, image, description ,category} = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({ error: 'Name, price, and image are required' });
        }
        console.log("reached 2")
        const newDish = new dishModel({
            name,
            price,
            image,
            category,
            description: description || ''
        });
        console.log("raeched 3")
        await newDish.save();
        res.status(201).json({ message: 'Item added successfully', dish: newDish });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update item endpoint
app.put("/change-item", verifyToken, async (req, res) => {
    try {
        await connectDB();
        const { id, name, price, image } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Item ID is required' });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (image) updateData.image = image;

        const updatedDish = await dishModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedDish) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item updated successfully', dish: updatedDish });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all items endpoint
app.get("/items", async (req, res) => {
    try {
        await connectDB();
        const items = await dishModel.find();
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Post image endpoint (placeholder for multer + cloudinary)
app.post("/post-image", verifyToken, async (req, res) => {
    try {
        // TODO: Implement multer + cloudinary integration
        // For now, returning a placeholder response
        res.json({ message: 'Image upload endpoint - needs multer and cloudinary setup' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Calculate cart total endpoint
app.post("/cart", (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Items array is required' });
        }

        const total = items.reduce((sum: number, item: any) => {
            return sum + (item.price * item.quantity || 0);
        }, 0);

        res.json({ total, items, message: 'Cart calculated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Payment endpoint (Google Pay)
app.post("/payment", async (req, res) => {
    try {
        const { amount, token } = req.body;

        if (!amount || !token) {
            return res.status(400).json({ error: 'Amount and payment token required' });
        }

        // TODO: Integrate with Google Pay API
        // For now, returning a placeholder response
        res.json({ message: 'Payment processed successfully', amount, transactionId: 'TXN' + Date.now() });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
})