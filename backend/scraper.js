const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const cron = require('node-cron');

const DATA_FILE = './trending_repos.json';

async function scrapeTrendingRepos() {
  try {
    const { data } = await axios.get('https://github.com/trending', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const $ = cheerio.load(data);

    return $('article.Box-row').map((_, article) => {
      const anchor = $(article).find('h2 a');
      const orgNameElement = anchor.find('.text-normal');
      const orgName = orgNameElement.text().trim().replace('/', '').trim() || 'No org name';
      const fullText = anchor.text().replace(orgName, '').trim();
      const repoName = fullText.replace('/', '').trim();
      const description = $(article).find('p').text().trim() || 'No description';

      return {
        organization: orgName,
        repository: repoName,
        description: description,
      };
    }).get();
  } catch (error) {
    console.error('Error scraping trending repositories:', error);
    return [];
  }
}

async function saveTrendingReposToFile() {
  try {
    const repos = await scrapeTrendingRepos();
    await fs.writeFile(DATA_FILE, JSON.stringify(repos, null, 2), 'utf-8');
    console.log('Trending repositories saved successfully.');
  } catch (error) {
    console.error('Error saving trending repositories:', error);
  }
}

// Schedule the task to run every 5 hours
cron.schedule('0 */5 * * *', () => {
  console.log('Fetching and saving trending repositories...');
  saveTrendingReposToFile();
});

// Run the function once when the script starts
saveTrendingReposToFile();

module.exports = { scrapeTrendingRepos, saveTrendingReposToFile };