const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const cron = require('node-cron');

const DATA_FILE = './trending_repos.json';

const scrapeTrendingRepos = async () => {
  try {
    const { data } = await axios.get('https://github.com/trending');
    const $ = cheerio.load(data);

    const trendingRepos = [];

    const repoArticles = $('article.Box-row');

    repoArticles.each((index, article) => {
      const anchor = $(article).find('h2 a');

      // Extract organization name
      const orgNameElement = anchor.find('.text-normal');
      let orgName = orgNameElement.text().trim() || 'No org name';
      orgName = orgName.replace('/', '').trim();

      // Extract repository name
      const fullText = anchor.text().replace(orgName, '').trim();
      const repoName = fullText.replace('/', '').trim();

      // Extract description (assuming it's in a <p> tag)
      const descriptionElement = $(article).find('p');
      const description = descriptionElement.text().trim() || 'No description';

      // Add the repo details to the array
      trendingRepos.push({
        organization: orgName,
        repository: repoName,
        description: description,
      });
    });

    return trendingRepos;
  } catch (error) {
    console.error('Error scraping trending repositories:', error);
    return [];
  }
};

const saveTrendingReposToFile = async () => {
  try {
    const repos = await scrapeTrendingRepos();

    // Write the scraped data to a JSON file
    fs.writeFileSync(DATA_FILE, JSON.stringify(repos, null, 2), 'utf-8');
    console.log('Trending repositories saved successfully.');
  } catch (error) {
    console.error('Error saving trending repositories:', error);
  }
};

// Schedule the task to run every 5 hours
cron.schedule('0 */5 * * *', () => {
  console.log('Fetching and saving trending repositories...');
  saveTrendingReposToFile();
});

// Run the function once when the script starts
saveTrendingReposToFile();
