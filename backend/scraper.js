const axios = require('axios');
const cheerio = require('cheerio');

const scrapeTrendingRepos = async () => {
  try {
    const { data } = await axios.get('https://github.com/trending');
    const $ = cheerio.load(data);

    const trendingRepos = [];

    $('.Box-row').each((index, element) => {
      const orgOrUserName = $(element).find('span.text-normal').text().trim();
      const repoName = $(element).find('h1.h3 a').text().replace(orgOrUserName, '').trim();
      const fullRepoName = `${orgOrUserName}${repoName}`;
      const description = $(element).find('p.col-9').text().trim();

      trendingRepos.push({ name: fullRepoName, description });
    });

    return trendingRepos;
  } catch (error) {
    console.error('Error scraping trending repositories:', error);
  }
};

module.exports = scrapeTrendingRepos;
