document.addEventListener("DOMContentLoaded", function() {
    const bootScreen = document.getElementById('boot-screen');
    const mainInterface = document.getElementById('main-interface');
    const bootVideo = document.getElementById('boot-video');

    // Hide boot screen and show main interface after the video ends
    bootVideo.onended = function() {
        bootScreen.style.display = 'none';
        mainInterface.style.display = 'block';
    };

    // Fetch the GitHub trending repositories feed and display it
    fetch('/trending_repos.json')
        .then(response => response.json())
        .then(data => {
            const trendingContainer = document.getElementById('trending-repos');
            trendingContainer.innerHTML = ''; // Clear existing content

            // Limit to top 10 repositories
            const topTenRepos = data.slice(0, 10);

            topTenRepos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');
                repoElement.innerHTML = `
                    <h3>${repo.organization} / ${repo.repository}</h3>
                    <p>${repo.description}</p>
                `;
                trendingContainer.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Error fetching trending data:', error));

    // Terminal command handling logic (assuming you have it in your script.js)
    document.getElementById('command-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const command = event.target.value.trim();
            processCommand(command);
            event.target.value = ''; // Clear the input after processing
        }
    });

    // Function to process terminal commands
    function processCommand(command) {
        switch (command) {
            case 'help':
                appendToTerminal("Commands available: about, services, portfolio, contact, clear");
                break;
            case 'about':
                appendToTerminal("<p>I am a self-taught, freelance, anytime any place Developer. If I don't know it, I will learn & fix it.</p>", true);
                break;
            case 'services':
                appendToTerminal("What can I do for you?");
                appendToTerminal("<ul><li>Pretty much anything you can think of</li><li>To an extent 😂</li><li>UI/UX Design</li><li>E-commerce Solutions</li><li>Need a whole setup for a website/business idea? That too.</li></ul>", true);
                break;
            case 'portfolio':
                appendToTerminal("<p>You can check out my Github: <a href='https://github.com/berlintay' target='_blank'>https://github.com/berlintay</a></p>", true);
                break;
            case 'contact':
                appendToTerminal('Contact me?!😫');
                appendToTerminal("<ul><li>Email: info@keays.xyz</li><li>Cell: (506) 790-5712</li></ul>", true);
                break;
            case 'clear':
                clearTerminal();
                break;
            default:
                appendToTerminal("Unknown command. Type 'help' for a list of available commands.");
                break;
        }
    }

    // Event listener for terminal input
    document.getElementById('command-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const command = event.target.value.trim();
            processCommand(command);
            event.target.value = ''; // Clear the input after processing
        }
    });

// Example functions for terminal management (these need to be defined elsewhere in your script)
function appendToTerminal(content, isHtml = false) {
    const terminal = document.getElementById('terminal');
    const output = document.createElement('div');
    if (isHtml) {
        output.innerHTML = content;
    } else {
        output.textContent = content;
    }
    terminal.appendChild(output);
}

function clearTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = ''; // Clear all terminal content
}
});
