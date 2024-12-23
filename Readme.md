# YouTube Trending Analyzer

## Project Overview
The **YouTube Trending Analyzer** is a web-based application that allows users to analyze trending YouTube videos based on region, category, and other attributes. It fetches trending videos using the YouTube Data API and provides an interactive user interface for analysis. This project consists of a backend implemented in Python (Flask) and a frontend developed using React with Tailwind CSS.

---

## Backend Overview

The backend of the application is built using Flask and handles the following responsibilities:

1. **Endpoints**:
   - `/api/trending`: Fetches trending videos based on the region and other parameters.
   - `/api/categories`: Fetches a mapping of YouTube video categories.

2. **Technologies Used**:
   - `Flask`: Serves the API endpoints.
   - `Google API Client`: Communicates with the YouTube Data API.
   - `dotenv`: Manages sensitive environment variables like API keys.
   - `Flask-CORS`: Enables cross-origin requests for seamless frontend-backend integration.

3. **Core Files**:
   - `app.py`: Contains the Flask app with defined routes and request handling.
   - `model.py`: Implements the functions to interact with the YouTube Data API and process data.

4. **Key Features**:
   - Fetches trending videos based on region (`regionCode`) and maximum results (`maxResults`).
   - Retrieves and processes video category mappings.

---

## Frontend Overview

The frontend is built using React with Vite as the build tool and Tailwind CSS for styling. It provides a user-friendly interface for interacting with the API and visualizing trending videos.

1. **Features**:
   - Input fields for API Key, region, and video preferences (e.g., category, definition).
   - A button to fetch trending videos and display them dynamically.
   - Video cards showing title, channel name, view count, and thumbnails.

2. **Technologies Used**:
   - `React`: Component-based UI development.
   - `Vite`: Fast build tool for React.
   - `Tailwind CSS`: Simplified and responsive styling.
   - `Axios`: API calls to the backend.

3. **Core Components**:
   - `Header`: Displays the title and logo.
   - `APIKeyInput`: Input field for entering and saving the YouTube Data API key.
   - `Settings`: Allows users to select video preferences such as region and category.
   - `TrendingVideos`: Displays a grid of trending videos fetched from the API.
   - `Footer`: Contains additional information or links.

---

## How to Use the Application

Follow these steps to set up and run the project:

### Prerequisites
- Python 3.x
- Node.js and npm/yarn
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone <https://github.com/dhananjay6561/TubeMetrics---Youtube-Trends-Analyserl>
   cd <TubeMetrics---Youtube-Trends-Analyser
>
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate    # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
   The backend will start at `http://127.0.0.1:5000/`.

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start at `http://127.0.0.1:5173/`.

### API Key
For now, you may use the following API Key:
```
AIzaSyBsG-i6LFGWtTw2JWoOLoWPpYvtmQrGPHE
```
Place this key in the `.env` file in the `backend` folder as:
```
API_KEY=AIzaSyBsG-i6LFGWtTw2JWoOLoWPpYvtmQrGPHE
```

### Usage
- Enter the API Key in the frontend or backend as instructed.
- Select the region and preferences.
- Fetch and analyze trending videos!

---

## How to Contribute
We welcome contributions to the project! Here’s how you can contribute:

1. **Fork the Repository**:
   - Click the `Fork` button at the top of the repository.

2. **Create a New Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**:
   - Update the backend or frontend code as needed.

4. **Test Your Changes**:
   - Ensure your changes work seamlessly in both the backend and frontend.

5. **Submit a Pull Request**:
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```
   - Create a pull request from your repository to the main project.

---

## Future Scopes of Improvement
- **Authentication**: Implement OAuth2.0 for secure API usage.
- **Advanced Filtering**: Add more filtering options like duration, likes, and comments.
- **Data Visualization**: Include graphs and charts for a better analytical experience.
- **Multilingual Support**: Allow users to select a language for trending videos.
- **Enhanced UI**: Improve the frontend with more modern design elements.
- **Database Integration**: Store video data for historical analysis.

---

## Outro
This project is a powerful tool for analyzing YouTube's trending content. Whether you’re a developer, analyst, or just curious about YouTube trends, this app serves as a great starting point. Contributions and feedback are always welcome to make this tool even better.

**Happy Coding!** 🚀

