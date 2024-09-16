import axios from 'axios';
import cheerio from 'cheerio';

async function fetchTrendingRepos() {
  try {
    const response = await axios.get('https://github.com/trending', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });

    const $ = cheerio.load(response.data);
    const repos = [];

    $('article.Box-row').each((index, element) => {
      const $element = $(element);
      const repo = {
        name: $element.find('h1 a').text().trim(),
        description: $element.find('p').text().trim(),
        url: 'https://github.com' + $element.find('h1 a').attr('href'),
        stars: $element.find('a[href*="/stargazers"]').text().trim(),
        language: $element.find('[itemprop="programmingLanguage"]').text().trim()
      };
      repos.push(repo);
    });

    return repos;
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
    throw error;
  }
}

export { fetchTrendingRepos };