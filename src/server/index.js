import fetch from 'node-fetch';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';



dotenv.config();

const app = express();


const API_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'dist', 'index.html'));

});




app.post('/sentiment', async (req, res) => {
    const { url } = req.body;
  

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&url=${url}&lang=en`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch sentiment analysis.' });
    }
  });


app.listen(8000, function () {
    console.log('Server running on http://localhost:8000');
});

export default app;