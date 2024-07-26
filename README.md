# TWIXER APP

<p align="center">

<img alt="" src="https://res.cloudinary.com/ddyqnp7pp/image/upload/v1722031315/logo_wlu3d0.png" align="center" width="400" />
</p>

## Table of Contents
1. [Introduction](#1-introduction)
2. [Requirements](#2-requirements)
3. [Technologies](#3-technologies)
4. [Installation](#4-installation)
5. [Running](#5-running)
6. [Project Structure](#6-project-structure)
7. [API Schema](#7-api-schema)
8. [Testing](#8-testing)
9. [Production Version](#9-production-version)

## 1. Introduction
The Twixer application is designed to emulate basic Twitter functionalities such as displaying, creating, updating, and deleting posts. Built using React, Redux, Material-UI, and React Router, this application ensures a seamless user experience. Key libraries such as Redux Toolkit and Material-UI enhance the functionality and user interface.

## 2. Requirements
- Node.js (v20.11.1 or higher)
- Yarn (v4.0.2 or higher) or npm (10.2.4 or higher)

## 3. Technologies
The application utilizes the following technologies:

- React (18.2.0)
- Redux Toolkit (2.2.6)
- Material-UI (5.11.8)
- React Router (6.25.1)
- TypeScript (4.7.4)

## 4. Installation
To install the application, follow these steps:

### Using npm
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/simple-twitter-like-app.git
    ```

2. Navigate to the application directory:
    ```bash
    cd simple-twitter-like-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

### Using Yarn
1. Clone the repository:
    ```bash
    git clone https://github.com/DarekMazur/evelstar.git
    ```

2. Navigate to the application directory:
    ```bash
    cd you-app-directory
    ```

3. Install dependencies:
    ```bash
    yarn install
    ```

## 5. Running
To run the development version of the application, execute the following command:

### Run backend

#### Using npm
```bash
npm run start-server
```

#### Using Yarn
```bash
yarn start-server
```

Backend will be available at http://localhost:3000.

### Run frontend

#### Using npm
```bash
npm run start
```

#### Using Yarn
```bash
yarn start
```

The application will be available at http://localhost:8081. Before running, please check your .env file.

In the main directory, you can find a .env.example file with all the variables needed to connect the application with your backend.

## 6. Project Structure

```
simple-twitter-like-app/
├── src/
│   ├── assets/           # Application assets
│   ├── components/       # Application components
│   ├── i18n/             # Translations
│   ├── pages/            # Application pages (views)
│   ├── store/            # Redux store
│   ├── styles/           # Global styles
│   ├── mocks/            # Mock Service Worker
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Application entry point
│   ├── main.tsx          # Application main root
│   └── setupTests.ts     # Tests configuration file
├── .eslintrc             # ESLint configuration
├── .gitignore            # Git ignore file
├── package.json          # npm manifest file
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite configuration
└── yarn.lock             # Yarn lock file
```

## 7. API Schema

### Post

- data:
  - postId: Unique identifier (string)
  - body: Text content of the post (string)
  - author: Author of the post (string)
  - createdAt: Creation date (number, milliseconds format)
  - updatedAt: Last update date (number, milliseconds format)
- id: Unique identifier (number)

## 8. Testing

To run unit tests, execute the following command:

### Using npm

```bash
   npm run test
```

### Using Yarn
```bash
   yarn test
```

## 9. Production Version

To build the production version of the application, use the following command:

### Using npm
```bash
npm run build
```

### Using Yarn
```bash
yarn build
```

The resulting files will be available in the dist directory, ready for deployment on a production server. Note that this build process pertains only to the frontend part of the application. Ensure you have also set up and configured the backend server for complete deployment.