# Political Transparency

## Introduction
This README file provides instructions on how to install and run the Knesset app. We will cover 2 optional ways to inatall the client.

# Installation By Docker - Recommended

## Prerequisites
Make sure you have Docker installed on your system. <br>
You can download it from the official Docker website: https://www.docker.com/get-started

## Installation
1. If you haven't already, clone or download the political-transparency source code from [here](https://github.com/Political-Transparency/client.git).

2. Build the Docker Image; 
open a terminal or command prompt, navigate to client directory containing the Dockerfile, and run the following command to build the Docker image: <br>

**`
docker build -t political-transparency .
`**

3. You can replace political-transparency with a suitable name for your Docker image.

4. Run The Docker Container:<br>
After building the Docker image, you can run the app in a Docker container. Use the following command to start the container:

**`docker run -d -p 3000:3000 political-transparency`**

This command runs the container in detached mode (-d), maps port 3000 from the container to port 3000 on your host machine, and uses the image you built earlier (political-transparency).

5. Access The App:<br>
Once the container is running, you can access your React app by opening a web browser and navigating to http://localhost:3000.

# Installation By NPM

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v16.13.1 or above)<br>
npm (Node Package Manager, typically comes with Node.js installation)

## Installation
Clone the repository or download the source code ZIP file.
Open a terminal or command prompt and navigate to the project's root directory.
Dependencies
Install the necessary dependencies by running the following command:
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
