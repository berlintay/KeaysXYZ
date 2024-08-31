export async function fetchTrendingRepos(): Promise<RepoType[]> {
    try {
        const response = await fetch('/backend/api/trending');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos: RepoType[] = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
    }
}
