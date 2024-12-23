from flask import Flask, request, jsonify
from model import get_trending_videos, get_category_mapping
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/")
def home():
    """
    Home route for the API.
    """
    return jsonify({"message": "Welcome to the YouTube Trending API!"})

@app.route("/api/trending", methods=["GET"])
def trending():
    """
    API endpoint to fetch trending videos.

    Query Parameters:
        region (str): Region code (default is "US").
        maxResults (int): Maximum number of results (default is 50).

    Returns:
        JSON: A list of trending videos with their details.
    """
    region = request.args.get("region", "US")
    max_results = request.args.get("maxResults", 50)

    # Validate maxResults parameter
    try:
        max_results = int(max_results)
        if not (1 <= max_results <= 50):
            return jsonify({"error": "maxResults must be between 1 and 50"}), 400
    except ValueError:
        return jsonify({"error": "maxResults must be an integer"}), 400

    try:
        videos = get_trending_videos(region_code=region, max_results=max_results)
        return jsonify(videos)
    except Exception as e:
        return jsonify({"error": "Failed to fetch trending videos", "details": str(e)}), 500

@app.route("/api/categories", methods=["GET"])
def categories():
    """
    API endpoint to fetch video categories.

    Returns:
        JSON: A mapping of category IDs to category names.
    """
    try:
        categories = get_category_mapping()
        return jsonify(categories)
    except Exception as e:
        return jsonify({"error": "Failed to fetch categories", "details": str(e)}), 500

if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True)
