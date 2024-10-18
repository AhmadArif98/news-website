# News Website

## Overview

This project is a news website built using React.js. It allows users to search, filter, and access news from various sources, such as NewsAPI, The Guardian News, and the New York Times APIs. The application is mobile-responsive and designed to provide a personalized news feed based on user preferences.

## Prerequisites

- **Node.js**: Ensure Node.js version `20.16.0` is installed on your system.
- **Docker**: Make sure Docker is installed if you plan to run the app using Docker.

## Available Scripts

In the project directory, you can run the following commands:

### `npm install`

Installs the necessary dependencies for the project.

### `npm start`

Runs the application in development mode.  
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

The page automatically reloads if you make any changes. Additionally, you may see linting errors displayed in the console for quick debugging.


## Docker Setup for Linux

Follow these steps to set up Docker on Linux and run the application:

1. **Remove any existing Docker versions**:
  sudo apt-get remove docker docker-engine docker.io containerd runc


2. **Update the package index**:
  sudo apt-get update


3. **Install required packages**:
  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common


4. **Add Docker’s official GPG key**:
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


5. **Set up the stable Docker repository**:
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


6. **Update the package index again**:
  sudo apt-get update


7. **Install Docker Engine**:
  sudo apt-get install docker-ce docker-ce-cli containerd.io


8. **Verify Docker installation**:
  docker --version


9. **Add your user to the Docker group**:
  sudo groupadd docker
  sudo usermod -aG docker $USER


10. **Build the Docker image for the application**:
  docker build -t news-website-docker .


11. **Run the Docker container**:
  docker run -d -p 4000:80 --name docker-react-container news-website-docker

  Open [http://localhost:4000](http://localhost:4000) in your browser to view the application.


12. **Stop the Docker container**:
  docker stop <container_id> 
**Example**:
like this: docker stop b136d3f389f0a8b7784345334b4c7a0eeb5a643ebb2dde8772ec98e26a15a1a9





















