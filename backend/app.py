from flask import Flask, request, jsonify
from model import get_trending_videos, get_category_mapping, get_top_channels, search_videos
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# Enable CORS for all routes and allow specific origins
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://tube-metrics-youtube-trends-analyser.vercel.app"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.after_request
def add_cors_headers(response):
    """
    Add CORS headers to the response to handle preflight requests.
    """
    response.headers.add("Access-Control-Allow-Origin", "https://tube-metrics-youtube-trends-analyser.vercel.app")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

@app.route("/")
def home():
    """
    Home route for the API.
    """
    return jsonify({"message": "Welcome to the YouTube Trending API!"})

@app.route("/api/trending", methods=["GET", "OPTIONS"])
def trending():
    """
    API endpoint to fetch trending videos with optional category and date range filtering.

    Query Parameters:
        region (str): Region code (default is "US").
        maxResults (int): Maximum number of results (default is 50).
        categoryId (str): (Optional) Category ID to filter videos.
        startDate (str): (Optional) Start date in ISO 8601 format (e.g., '2025-01-01').
        endDate (str): (Optional) End date in ISO 8601 format (e.g., '2025-01-31').

    Returns:
        JSON: A list of trending videos with their details.
    """
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({"message": "Preflight request successful"}), 200

    region = request.args.get("region", "US")
    max_results = request.args.get("maxResults", 50)
    category_id = request.args.get("categoryId", None)
    start_date = request.args.get("startDate", None)
    end_date = request.args.get("endDate", None)

    try:
        max_results = int(max_results)
        if not (1 <= max_results <= 50):
            return jsonify({"error": "maxResults must be between 1 and 50"}), 400
    except ValueError:
        return jsonify({"error": "maxResults must be an integer"}), 400

    # Convert date strings to datetime objects if provided
    date_range = None
    if start_date and end_date:
        try:
            start_date = datetime.fromisoformat(start_date)
            end_date = datetime.fromisoformat(end_date)
            date_range = (start_date, end_date)
        except ValueError:
            return jsonify({"error": "Invalid date format. Please use ISO 8601 format."}), 400

    try:
        videos = get_trending_videos(region_code=region, max_results=max_results, category_id=category_id, date_range=date_range)
        return jsonify(videos)
    except Exception as e:
        return jsonify({"error": "Failed to fetch trending videos", "details": str(e)}), 500

@app.route("/api/categories", methods=["GET", "OPTIONS"])
def categories():
    """
    API endpoint to fetch video categories.

    Returns:
        JSON: A mapping of category IDs to category names.
    """
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({"message": "Preflight request successful"}), 200

    try:
        categories = get_category_mapping()
        return jsonify(categories)
    except Exception as e:
        return jsonify({"error": "Failed to fetch categories", "details": str(e)}), 500

@app.route("/api/top-channels", methods=["GET", "OPTIONS"])
def top_channels():
    """
    API endpoint to fetch top-performing channels based on total views.

    Query Parameters:
        region (str): Region code (default is "US").
        maxResults (int): Maximum number of results (default is 50).

    Returns:
        JSON: A list of top channels with their total views.
    """
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({"message": "Preflight request successful"}), 200

    region = request.args.get("region", "US")
    max_results = request.args.get("maxResults", 50)

    try:
        max_results = int(max_results)
        if not (1 <= max_results <= 50):
            return jsonify({"error": "maxResults must be between 1 and 50"}), 400
    except ValueError:
        return jsonify({"error": "maxResults must be an integer"}), 400

    try:
        channels = get_top_channels(region_code=region, max_results=max_results)
        return jsonify(channels)
    except Exception as e:
        return jsonify({"error": "Failed to fetch top channels", "details": str(e)}), 500

@app.route("/api/search", methods=["GET", "OPTIONS"])
def search():
    """
    API endpoint to search for specific keywords in trending videos.

    Query Parameters:
        region (str): Region code (default is "US").
        query (str): Search keyword.
        maxResults (int): Maximum number of results (default is 50).

    Returns:
        JSON: A list of dictionaries containing matching video details.
    """
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({"message": "Preflight request successful"}), 200

    region = request.args.get("region", "US")
    query = request.args.get("query", None)
    max_results = request.args.get("maxResults", 50)

    try:
        max_results = int(max_results)
        if not (1 <= max_results <= 50):
            return jsonify({"error": "maxResults must be between 1 and 50"}), 400
    except ValueError:
        return jsonify({"error": "maxResults must be an integer"}), 400

    try:
        results = search_videos(region_code=region, query=query, max_results=max_results)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": "Failed to search videos", "details": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)