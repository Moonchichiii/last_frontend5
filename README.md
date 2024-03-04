# last_frontend5
  
## Table of Contents

1. [Project Goals](#project-goals)
2. [User Stories](#user-stories)
3. [Planning Mockup & Prebuild](#planning-mockup-prebuild)
4. [Technologies Used](#technologies-used)
5. [Dependencies](#dependencies)
6. [Frontend Structure and Components](#frontend-structure-and-components)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Credits & Tutorials](#credits-&-tutorials)
  

## Install vite

`npm init vite@latest . `

## updating the node js

`npm install lodash@latest --save `

## install

`npm install compression express axios react-router-dom bootstrap@latest `

lodash@latest: A utility library for working with arrays, numbers, objects, and strings.  

compression: A middleware for compressing HTTP responses.  

express: A web application framework for Node.js.

axios: A promise-based HTTP client for the browser and Node.js. 

react-router-dom: A declarative routing library for React.

bootstrap@latest: The latest version of the Bootstrap CSS framework.
  

## Result :

`npm install lodash@latest --save

added 273 packages, and audited 274 packages in 26s
98 packages are looking for funding
run `npm fund` for details
found 0 vulnerabilities
gitpod /workspace/last_frontend5 (main) $ npm install compression express axios react-router-dom bootstrap@latest

added 77 packages, and audited 351 packages in 3s
103 packages are looking for funding
run `npm fund` for details
found 0 vulnerabilities `

## In server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});

## in package.json :
`

"engines": {
"node": "20.x"
},
"scripts": {
"dev": "vite",
"heroku-postbuild": "npm run build",
"start": "node server.js",
"build": "vite build",
"lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview"
},`

## Procfile:
web: node server.js


For local testing and development
npm run dev

To run the build and ready it for        ??? change ??? 
npm run build

## Planning Mockup & Prebuild

Mockups using https://webflow.com

<img  src=""  alt="mockup"  width="320">
Prebuild using https://codepen.io

<img  src=""  alt="registration"  width="320">
Color palette using https://coolors.co/

<img  src=""  alt="color palette"  width="320">

[Back to top](#table-of-contents)

----------
## Frontend Structure and Components
Frontend Structure

The frontend architecture is designed for efficiency and simplicity:

axiosconfig.jsx: Configures Axios for HTTP requests, ensuring a centralized setup for API calls.

UseAuth Hook & CurrentUserContext: Manages authentication flow, handling login/logout actions and session management via cookies.

FetchPosts Hook: Fetches posts from the backend, providing data for the Card component.

UsePostsActions Hook: Handles actions like liking, unliking, and deleting posts, working in tandem with FetchPosts to update UI state.

Card Component: Displays posts. It uses FetchPosts for data and responds to interactions with help from UsePostsActions.

This structure ensures a clean separation of concerns, where each part has a clear purpose, contributing to a maintainable and scalable codebase.

### Folder Structure
## Testing

## Technologies Used

## Credits & Tutorials
- Moments Walktrough Project
- Components library https://react-bootstrap.github.io/
https://www.npmjs.com/package/react-infinite-scroll-component
- https://medium.com/@amavictor/storing-tokens-in-cookies-with-react-93a5a818c3a8 - good article about js-cookie!
# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh