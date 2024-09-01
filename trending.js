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
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchTrendingRepos() {
    try {
        const responsePromise = fetch('/backend/api/trending');
        const timeoutPromise = timeout(5000); // 5 seconds timeout
        const response = await Promise.race([responsePromise, timeoutPromise]);

        if (!response || !response.ok) {
            throw new Error(`Request failed or timed out.`);
        }

        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
    }
}
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying... attempts left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        } else {
            throw error;
        }
    }
}

export async function fetchTrendingRepos() {
    try {
        const response = await fetchWithRetry('/backend/api/trending');
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        throw error;
    }
}
