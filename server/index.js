import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import { users,posts } from './data/index.js';

// configurations 

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// file storage 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    }
    , filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});


// routes with files

app.post('/auth/register', upload.single('image'), register);
app.post('/posts',verifyToken , upload.single('image') ,createPost)


//routes
app.use('/auth', authRoutes);
app.use('/users',usersRoutes);  
app.use('/posts',postsRoutes);

// mongoose setup

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        
        //insert data once 
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((err)=> console.log(`${err} did not connect`));
