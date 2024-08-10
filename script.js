document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const mainInterface = document.getElementById('main-interface');
    const terminal = document.getElementById('terminal');
    const commandInput = document.getElementById('command-input');
    const promptLine = document.getElementById('prompt-line');
    const currentTime = document.getElementById('current-time');

    function updateTime() {
        const now = new Date();
        if (currentTime) {
            currentTime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
        }
    }

    setInterval(updateTime, 1000);
    updateTime();

    setTimeout(() => {
        bootScreen.style.display = 'none';
        mainInterface.style.display = 'block';
        initializeTerminal();
        fetchTrendingRepositories(); // Fetch and display trending repos after boot
    }, 2000);
    function initializeTerminal() {
        setPrompt();
        appendToTerminal("Welcome, friend 📨 ");
        appendToTerminal("Type 'help' for a list of commands!");
        commandInput.focus();
    }

    function setPrompt(path = '~/path') {
        const username = 'guest';
        const hostname = 'keaysxyz';
        promptLine.textContent = `(${username}𓅓${hostname})-$`;
    }

    function appendToTerminal(content, isHtml = false) {
        const line = document.createElement('div');
        if (isHtml) {
            line.innerHTML = content;
        } else {
            line.textContent = content;
        }
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    if (commandInput) {
        commandInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const command = this.value.trim();
                appendToTerminal(`- ${command}`);
                processCommand(command);
                this.value = '';
            }
        });
    } else {
        console.error('Command input element not found!');
    }
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the GitHub trending repositories feed and display it
    fetch('/api/github-trending')
        .then(response => response.json())
        .then(data => {
            const trendingContainer = document.getElementById('trending-repos');
            trendingContainer.innerHTML = ''; // Clear existing content
            data.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');
                repoElement.innerHTML = `
                    <h3>${repo.organization} / ${repo.repository}</h3>
                    <p>${repo.description}</p>
                `;
                trendingContainer.appendChild(repoElement);
            });
        })
        .catch(error => console.error('Error fetching GitHub trending data:', error));

    // Your existing script logic here...
});

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
                terminal.innerHTML = ''; // Clear the entire terminal
                setPrompt(); // Reset the prompt after clearing the terminal
                break;
            default:
                appendToTerminal(`Command ${command}: never heard of her 🤷‍♂️`);
        }
    }

    function createWindow(title, content) {
        const windowId = 'window-' + Date.now();
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.id = windowId;
        windowElement.innerHTML = `
            <div class="window-header">${title}</div>
            <div class="window-content">${content}</div>
        `;
        document.getElementById('window-container').appendChild(windowElement);
        makeWindowDraggable(windowElement);
        showWindow(windowId);
        addToTaskbar(title, windowId);
    }

    function makeWindowDraggable(windowElement) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        windowElement.querySelector('.window-header').onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = e.clientY - pos4;
            pos3 = e.clientX;
            pos4 = e.clientY;
            windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
            windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function showWindow(windowId) {
        document.getElementById(windowId).style.display = 'block';
    }

    function addToTaskbar(title, windowId) {
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.textContent = title;
        taskbarItem.onclick = () => showWindow(windowId);
        document.getElementById('taskbar').appendChild(taskbarItem);
    }
});
