# Marvel Comic Search App

A web application that allows users to search for Marvel comic characters and comics. Built using React, Redux for state management, and the Marvel API for fetching data.

## Demo

Check out the live app here: [Marvel Comic Search](https://marvelcomicsearch.vercel.app/)

## Features

- Search for Marvel comic characters and comics.
- Displays detailed information about characters and comics.
- infinity pagination with react query
- Typescript.
- Global state management using Redux.
- Fetches data from the [Marvel API](https://developer.marvel.com/).
- Styling using **Tailwind CSS** for utility-first, responsive design.  
- UI components styled with [Next UI](https://nextui.org/).

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Access to the [Marvel Developer API](https://developer.marvel.com/), where you can sign up and obtain an API key.

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/marvel-comic-search.git
    cd marvel-comic-search
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add your Marvel API key:

    ```plaintext
    VITE_PRIVATE_API_KEY=your_private_api_key
    VITE_PUBLIC_API_KEY=your_public_api_key
    ```

### Running the App

To start the app in development mode, run:

```bash
npm run dev
