# Image Uploader

A modern web application for uploading and managing images, built with Nuxt 2, Vuetify, and Express.js.

## Live Demo

[Image Uploader](https://upload-file-topaz.vercel.app/) 👈

## Introduction

Image Uploader is a full-stack web application that allows users to upload, store, and manage their images. The frontend is built with Nuxt 2 (Vue.js framework), and Vuetify for a smooth user experience, while the backend uses Express.js for robust API handling. The application uses MongoDB for data storage and Cloudinary for image hosting.

## Features

- User authentication (login/register)
- Image upload with size and type validation
- Image listing
- Secure file storage using Cloudinary
- Responsive design
- Real-time feedback with snackbar notifications

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) 16.20.2 (LTS) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/toannn00/upload-file
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
yarn install
```

## Environment Variables

### Backend

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/file-upload
JWT_SECRET=your_jwt_secret
PORT=3001
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

To get your Cloudinary credentials:

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/users/register/free)
2. Navigate to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### Frontend

Create a `.env` file in the frontend directory with:

```env
API_URL=http://localhost:3001
```

## Running the Application for Development

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
yarn dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

### Homepage

New users can register or existing users can log in using their email and password through the login form.

<img src="https://i.imgur.com/IXN2Elf.png" width="600" />

### Upload an image

Users can upload images by selecting a file from their device and clicking the "Upload Image" button. The application will validate the file size and type before uploading it to the server.

<img src="https://i.imgur.com/e2MfltU.png" width="600" />

Select an image to upload.

<img src="https://i.imgur.com/pdByIs2.png" width="600" />

Uploaded successfully, the image will be displayed in the list of images.

<img src="https://i.imgur.com/G3EeplL.png" width="600" />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
