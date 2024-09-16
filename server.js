const express = require('express');
const path = require('path');
const cors = require('cors');
const { fetchTrendingRepos } = require('./trending');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));

app.get('/api/trending', async (req, res) => {
  try {
    const repos = await fetchTrendingRepos();
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending repositories' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});