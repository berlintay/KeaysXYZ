const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Use CORS middleware
app.use(cors());

app.get('/api/trending', async (req, res) => {
    try {
        const { data } = await axios.get('https://github.com/trending');
        const $ = cheerio.load(data);
        const trendingRepos = [];

        $('article.Box-row').each((index, element) => {
            const repo = {
                name: $(element).find('h1 a').text().trim(),
                description: $(element).find('p').text().trim(),
            };
            trendingRepos.push(repo);
        });

        res.json(trendingRepos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trending repositories' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
