<<<<<<< HEAD
const fs = require('fs');
=======
import fetch from 'node-fetch';
import fs from 'fs';// Ensure you have node-fetch installed: npm install node-fetch

const DATA_FILE = './data.json';
>>>>>>> 047d59330cdb228b8c386a12c18cc667aad97b95

async function fetchAndAppendData() {
    const fetch = (await import('node-fetch')).default;

    try {
        const response = await fetch('http://localhost:3000/api/trending');
        const newData = await response.json();

        // Read the existing data file
        let existingData = [];
        if (fs.existsSync('./data.json')) {
            const rawData = fs.readFileSync('./data.json');
            existingData = JSON.parse(rawData);
        }

        // Append the new data
        existingData.push(...newData);

        // Write the updated data back to the file
        fs.writeFileSync('./data.json', JSON.stringify(existingData, null, 2));

        console.log('Data fetched and appended successfully.');
    } catch (error) {
        console.error('Error fetching or appending data:', error);
        process.exit(1); // Exit with an error code
    }
}

fetchAndAppendData();
