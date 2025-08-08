import express from 'express';
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', 
    credentials: true  
}))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('This is GITHUB OAuth 2.0 Backend');
})

app.use('/auth',authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});