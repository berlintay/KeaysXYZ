const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const app = express();

let cachedRepoDetails = []; // Store the scraped data here

// Function to scrape GitHub trending repositories
const scrapeGitHubTrending = async () => {
    try {
        const { data } = await axios.get('https://github.com/trending');
        const $ = cheerio.load(data);
        const repoDetails = [];

        $('article.Box-row').each((index, element) => {
            const anchor = $(element).find('h2 a');
            const orgNameElement = anchor.find('.text-normal');
            let orgName = orgNameElement.text().trim().replace('/', '').trim();
            const repoName = anchor.text().replace(orgName, '').trim().replace('/', '').trim();
            const descriptionElement = $(element).find('p');
            const description = descriptionElement.text().trim();

            repoDetails.push({
                organization: orgName,
                repository: repoName,
                description: description
            });
        });

        cachedRepoDetails = repoDetails; // Update the cache with new data
    } catch (error) {
        console.error('Error scraping GitHub trending data:', error);
    }
};

// Schedule the scraping to run every 7 hours
cron.schedule('0 */7 * * *', () => {
    console.log('Fetching new data from GitHub Trending...');
    scrapeGitHubTrending();
});

// Initial fetch to have data ready when the server starts
scrapeGitHubTrending();

// Endpoint to serve the cached GitHub trending repositories feed
app.get('/api/github-trending', (req, res) => {
    res.json(cachedRepoDetails);
});

// Serve static files (like your main website)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
