import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const DATA_FILE = './data.json';

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
    process.exit(1); // Exit
