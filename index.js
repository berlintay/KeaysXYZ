async function fetchTrendingRepos() {
    try {
        const response = await fetch('/api/trending');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
    }
}

function displayTrendingRepos(repos) {
    const container = document.getElementById('trending-repos');
    container.innerHTML = repos.map(repo => `
        <div class="mb-2">
            <a href="${repo.url}" class="text-indigo-400 hover:text-indigo-600" target="_blank">${repo.name}</a>
            <p class="text-sm">${repo.description}</p>
            <span class="text-xs">⭐ ${repo.stars} | ${repo.language}</span>
        </div>
    `).join('');
}

async function init() {
    try {
        const repos = await fetchTrendingRepos();
        displayTrendingRepos(repos);
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);

const userInput = document.getElementById('user-input');
const terminalOutput = document.getElementById('terminal-output');

userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const command = userInput.value;
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        userInput.value = '';

        // Handle commands here
        if (command.toLowerCase() === 'refresh') {
            try {
                const repos = await fetchTrendingRepos();
                displayTrendingRepos(repos);
                terminalOutput.innerHTML += '<div>Trending repositories refreshed.</div>';
            } catch (error) {
                terminalOutput.innerHTML += '<div>Failed to refresh trending repositories.</div>';
            }
        } else {
            terminalOutput.innerHTML += '<div>Unknown command.</div>';
        }
    }
});