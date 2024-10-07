#Overview

The goal of this project is to build a web application that allows users to generate images from text descriptions using an AI model Stability AI). The app will be simple and intuitive, designed to be accessible to both technical and non-technical users. The project will be built using Next.js for both frontend and backend development and will be hosted on Vercel.

#Features

- Text Input Interface: Users can input descriptive text, such as "a cat sitting on a chair" or "sunset over the ocean."
- AI Image Generation: The app uses AI models to generate an image based on the provided text.
- Image Display: Generated images are displayed directly on the website after the user submits a request.
- Display all the images ever generated in a gallery format.
- Responsive UI: The application will be mobile-responsive and function well on different device screen sizes.
- Have a nice UI and animations when the image is blank or generating.
- When
-Simple and Intuitive User Experience: The interface will be minimalistic, making it easy for any user to input text and get results quickly.
-When hover over image show an icon to download, and an icon button for liking the image.
-We'll use Next.js for the frontend. We'll also use shadcn/ui for the UI components. clerk for authentication. appwrite for the database. and vercel for the hosting.

#Requirements

#Design

#Implementation

#Relevant docs

##How to use stability api and model

import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const payload = {
  prompt: "Lighthouse on a cliff overlooking the ocean",
  output_format: "webp"
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/stable-image/generate/core`,
  axios.toFormData(payload, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: { 
      Authorization: `Bearer sk-MYAPIKEY`, 
      Accept: "image/*" 
    },
  },
);

if(response.status === 200) {
  fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}

#Current file structure

#Current file structure
/text-to-image-generator
├── /node_modules              # Installed Node.js modules (auto-generated)
├── /public                    # Static files (images, fonts, etc.)
│   └── favicon.ico            # Default Next.js favicon
├── /styles                    # Global CSS files (optional if using shadcn)
│   └── globals.css            # Global CSS (can be replaced with shadcn styles)
├── /pages                     # Next.js Pages and API Routes
│   ├── /api
│   │   ├── generate.js        # API route for AI image generation
│   │   └── auth
│   │       └── [...nextauth].js  # NextAuth.js configuration for authentication
│   ├── /auth
│   │   └── signin.js          # Sign-in page for authentication
│   └── index.js               # Main page with text-to-image form
├── /components                # Reusable React components
│   └── LogoutButton.js        # Component to handle user logout
├── /shadcn                    # shadcn component files (after running shadcn init)
│   ├── button.js              # Button component from shadcn
│   └── input.js               # Input component from shadcn
├── .env.local                 # Environment variables (API keys, secrets, etc.)
├── next.config.js             # Next.js configuration file
├── package.json               # NPM dependencies and scripts
├── vercel.json                # Vercel configuration file (optional)
└── README.md                  # Documentation file

