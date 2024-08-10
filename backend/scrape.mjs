import fs from 'fs'; // Import fs from ES module
import fetch from 'node-fetch'; // Import fetch from node-fetch

const DATA_FILE = './data.json';

async function fetchAndAppendData() {
    try {
        const response = await fetch('http://localhost:3000/api/trending');
        const newData = await response.json();

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
        process.exit(1); // Exit with an error code
    }
}

const startScraping = async () => {
    console.log('Waiting for 1 minute before starting the scraping process...');
    await new Promise(resolve => setTimeout(resolve, 1 * 60 * 1000)); // 1 minute in milliseconds
    console.log('Starting the scraping process now...');
    
    // Call your scraping function here
    fetchAndAppendData();
};

startScraping();