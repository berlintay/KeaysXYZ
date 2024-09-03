const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Cache variables
let cachedTrendingRepos = null;
let lastFetchTime = null;

// Define cache duration in milliseconds (10 minutes)
const cacheDuration = 10 * 60 * 1000;

app.get('/api/trending', async (req, res) => {
    const now = Date.now();

    // Check if cached data is valid
    if (cachedTrendingRepos && lastFetchTime && now - lastFetchTime < cacheDuration) {
        return res.json(cachedTrendingRepos);
    }

    try {
        const { data } = await axios.get('https://github.com/trending', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const $ = cheerio.load(data);
        const trendingRepos = [];

        $('article.Box-row').each((index, element) => {
            const repo = {
                name: $(element).find('h1 a').text().trim(),
                description: $(element).find('p').text().trim(),
                stars: $(element).find('a[href*="/stargazers"]').text().trim(),
                forks: $(element).find('a[href*="/network/members"]').text().trim(),
                language: $(element).find('[itemprop="programmingLanguage"]').text().trim(),
            };
            trendingRepos.push(repo);
        });

        // Update cache
        cachedTrendingRepos = trendingRepos;
        lastFetchTime = now;

        res.json(trendingRepos);
    } catch (error) {
        console.error('Error fetching trending repositories:', error.message);
        res.status(500).json({ error: 'Failed to fetch trending repositories', details: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
