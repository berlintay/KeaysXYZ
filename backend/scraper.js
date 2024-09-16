/* eslint-disable no-undef */
const axios = require('axios');
const cheerio = require('cheerio');

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

module.exports = scrapeTrendingRepos;