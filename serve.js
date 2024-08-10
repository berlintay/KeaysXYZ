const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS

let cachedRepoDetails = [];

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

        cachedRepoDetails = repoDetails;
    } catch (error) {
        console.error('Error scraping GitHub trending data:', error);
    }
};

cron.schedule('0 */7 * * *', () => {
    console.log('Fetching new data from GitHub Trending...');
    scrapeGitHubTrending();
});

scrapeGitHubTrending();

app.get('/api/github-trending', (req, res) => {
    res.json(cachedRepoDetails);
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
