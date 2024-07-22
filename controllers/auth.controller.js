import User from "../models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
console.log("controller.js")

const signup = async (req, res) => {
    try {
        console.log("test")
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "Username already exists" });
        } else {
            const newUser = new User({ email: email, username: username, password: hashedPassword });
            console.log(newUser._id)
            await newUser.save();
            return res.status(201).json({ message: 'User signed up successfully' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "User registration failed!" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user })
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "User login failed!" });
}
};


export { signup, login };