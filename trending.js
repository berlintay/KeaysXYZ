export async function fetchTrendingRepos() {
    try {
        const response = await fetch('/backend/api/trending');
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
    }
}
