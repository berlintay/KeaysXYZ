const axios = require('axios');
const cheerio = require('cheerio');
const scrapeTrendingRepos = async () => {
  try {
    const { data } = await axios.get('https://github.com/trending');
    const $ = cheerio.load(data);

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

      // Output the results
      console.log(`Organization: ${orgName}`);
      console.log(`Repository: ${repoName}`);
      console.log(`Description: ${description}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error scraping trending repositories:', error);
  }
};

// Run the function to scrape the data
scrapeTrendingRepos();
