const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const rateLimit = require('express-rate-limit');

const app = express();

// Cache variables
let cachedTrendingRepos = null;
let lastFetchTime = null;

// Define cache duration in milliseconds (10 minutes)
const cacheDuration = 10 * 60 * 1000;

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);

app.get('/api/trending', async (req, res) => {
    const now = Date.now();

    try {
        // Check if cached data is valid
        if (cachedTrendingRepos && lastFetchTime && now - lastFetchTime < cacheDuration) {
            return res.json(cachedTrendingRepos);
        }

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
        console.error('Error fetching trending repositories:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: 'Failed to fetch trending repositories', details: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
});

// Implement cache invalidation
function invalidateCache() {
    cachedTrendingRepos = null;
    lastFetchTime = null;
}

// Invalidate cache every hour
setInterval(invalidateCache, 60 * 60 * 1000);

module.exports = app;