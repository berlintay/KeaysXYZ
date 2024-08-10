const fs = require('fs');
const fetch = require('node-fetch');  // Ensure you have node-fetch installed: npm install node-fetch

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

fetchAndAppendData();

