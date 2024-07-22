import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'; // Adjust the path as necessary
import taskRouter from './routes/task.route.js'
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors({
    origin: true,
    credentials: true
}))
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use the routes
app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter)
app.get('/', (req, res) => {
  res.send("Api is working")
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
