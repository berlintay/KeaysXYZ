const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY, // Ensure you have your OpenAI API key set in environment variables
});
const openai = new OpenAIApi(configuration);

// Existing code...

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
            messages: [{ role: 'user', content: prompt }],
        });
        const completion = response.data.choices[0].message.content.trim();
        res.json({ completion });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

// Existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

