# Face Recognition Brain

Face Recognition Brain is a web application that allows you to detect faces in any image using a machine learning model. You can upload an image or paste a URL of an image, and the app will draw a bounding box around each face in the image. You can also register and sign in to keep track of your entries.

## Features

- Face detection using Clarifai API
- User authentication using bcrypt and JWT
- Front-end built with React
- Back-end built with Node.js and Express
- Database built with PostgreSQL

## Installation

To run this project locally, you need to have Node.js and PostgreSQL installed on your machine. You also need to create a free account on [Clarifai] and get an API key.

1. Clone this repository and the [back-end repository] to your local machine.
2. Navigate to the face-recognition-brain folder and run `npm install` to install the dependencies.
3. Navigate to the face-recognition-brain-api folder and run `npm install` to install the dependencies.
4. Create a `.env` file in the face-recognition-brain-api folder and add the following variables:

    ```
    CLARIFAI_API_KEY=your_api_key
    JWT_SECRET=your_secret
    DATABASE_URL=your_database_url
    ```

5. Run `npm start` in both folders to start the front-end and back-end servers.
6. Open [http://localhost:3000] in your browser to see the app.

## Usage

To use the app, you can either register a new account or sign in with an existing account. You can then enter an image URL in the input box and click on the Detect button. The app will display the image and draw a box around each face. It will also update your entry count.

