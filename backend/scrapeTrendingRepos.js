const axios = require('axios');
const cheerio = require('cheerio');

const scrapeTrendingRepos = async () => {
    try {
        const { data } = await axios.get('https://github.com/trending');
        const $ = cheerio.load(data);

        const trendingRepos = [];

        $('.Box-row').each((index, element) => {
            const repoName = $(element).find('h1.h3 a').text().trim().replace(/\n/g, ''); // Extract and clean up repo name
            const description = $(element).find('p.col-9').text().trim();
            const stars = $(element).find('.Link--muted .octicon-star').parent().text().trim(); // Extract star count
            const language = $(element).find('[itemprop=programmingLanguage]').text().trim();

            trendingRepos.push({ repoName, description, stars, language });
        });

        return trendingRepos;
    } catch (error) {
        console.error('Error scraping trending repositories:', error);
    }
};

module.exports = scrapeTrendingRepos;
