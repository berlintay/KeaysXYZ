import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const DATA_FILE = './data.json';

const scrapeTrendingRepos = async () => {
  try {
    const { data } = await axios.get('https://github.com/trending');
    const $ = cheerio.load(data);

    const trendingRepos = [];

    $('article h2 a').each((index, element) => {
      const anchor = $(element);
      const orgNameElement = anchor.find('.text-normal');
      let orgName = orgNameElement.text().trim();

      // Remove the trailing slash from the organization name
      orgName = orgName.replace('/', '').trim();

      // Extracting repository name by removing the organization name from the anchor text
      const repoName = anchor.text().replace(orgName, '').replace('/', '').trim();

      // Adding the repository details to the array
      trendingRepos.push({
        organization: orgName || 'No org name',
        repository: repoName || 'No repository name',
      });
    });

    return trendingRepos;
  } catch (error) {
    console.error('Error scraping trending repositories:', error);
    return [];
  }
};

const fetchAndAppendData = async () => {
  try {
    const newData = await scrapeTrendingRepos();

    // Read the existing data file
    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
      const rawData = fs.readFileSync(DATA_FILE);
      existingData = JSON.parse(rawData);
    }

    // Append the new data
    existingData.push(...newData);

    // Write the updated data back to the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    console.log('Data fetched and appended successfully.');
  } catch (error) {
    console.error('Error fetching or appending data:', error);
  } finally {
    process.exit(1);
  }
};

// Execute the function to fetch and append data
fetchAndAppendData();
