import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const DATA_FILE = './data.json';

const scrapeTrendingRepos = async () => {
  try {
    const { data } = await axios.get('https://github.com/trending/unknown?since=daily');
    const $ = cheerio.load(data);

    const trendingRepos = document.querySelectorAll('article h2 a');

repoLinks.forEach(anchor => {
  // Assuming each anchor tag is a repository link
  const orgNameElement = anchor.querySelector('.text-normal');
  let orgName = orgNameElement ? orgNameElement.textContent.trim() : 'No org name';
  
  // Remove the trailing slash from the organization name
  orgName = orgName.replace('/', '').trim();
  
  // Extracting repository name by removing the organization name from the anchor text
  const fullText = anchor.textContent.replace(orgName, '').trim();
  const repoName = fullText.replace('/', '').trim();

  console.log(`Organization: ${orgName}`);
  console.log(`Repository: ${repoName}`);
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
  };
    process.exit(1)
}
