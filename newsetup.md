```markdown
# GitHub Trending Repos Terminal Application on Google Cloud

## Prerequisites
- Google Cloud account
- Google Cloud SDK installed and authenticated
- GitHub account

## Step 1: Create a Google Cloud Compute VM
1. Open the Google Cloud Console.
2. Navigate to the "Compute Engine" section.
3. Click on "Create Instance" to create a new VM.
4. Choose the appropriate operating system, machine type, and other settings for your application.
5. Enable the necessary firewall rules to allow incoming HTTP/HTTPS traffic.
6. Create the VM instance.

## Step 2: Connect to the VM and install dependencies
1. Connect to the VM via SSH.
```bash
gcloud compute ssh --zone=[ZONE] [VM_NAME]
```

2. Update the package manager and install Nginx.
```bash
sudo apt-get update
sudo apt-get install -y nginx
```

3. Install Node.js and npm.
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Install the required dependencies for the application.
```bash
# Install jQuery
npm install jquery

# Install jQuery Terminal
npm install jquery.terminal

# Install D3.js
npm install d3

# Install Marked.js
npm install marked
```

## Step 3: Deploy the application
1. Create the directory structure for the application.
```bash
mkdir -p /var/www/my-app/css /var/www/my-app/js /var/www/my-app/lib
```

2. Copy the application files to the VM.
   - You can use `scp` or `rsync` to transfer the files from your local machine to the VM.
   - Alternatively, you can set up a Git repository and clone it on the VM.

3. Configure Nginx to serve the application.
```bash
sudo vim /etc/nginx/conf.d/my-app.conf
```

Add the following content to the configuration file:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/my-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Reload the Nginx configuration.
```bash
sudo nginx -s reload
```

## Step 4: Authenticate with GitHub and create a repository
1. Install the GitHub CLI.
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt-get update
sudo apt-get install github-cli
```

2. Authenticate with GitHub.
```bash
gh auth login
```

3. Create a new GitHub repository.
```bash
gh repo create my-app
```

4. Push the application files to the new repository.
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

Now, your GitHub Trending Repos Terminal application is deployed on a Google Cloud Compute VM, using Nginx as the server. Users can access the application by visiting the VM's public IP address or the domain you've configured.

Remember to adjust the commands and configurations as needed, based on your specific requirements and the versions of the tools and libraries you're using.
```