from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

API_KEY = os.getenv("API_KEY")

def get_trending_videos(region_code="US", max_results=50):
    """
    Fetch trending videos from the YouTube Data API.

    Args:
        region_code (str): Region code (e.g., "US").
        max_results (int): Maximum number of results.

    Returns:
        list: A list of dictionaries containing video details.
    """
    youtube = build("youtube", "v3", developerKey=API_KEY)
    try:
        request = youtube.videos().list(
            part="snippet,statistics",
            chart="mostPopular",
            regionCode=region_code,
            maxResults=max_results,
        )
        response = request.execute()

        videos = []
        for item in response.get("items", []):
            videos.append({
                "id": item["id"],
                "title": item["snippet"]["title"],
                "channelName": item["snippet"]["channelTitle"],
                "viewCount": item["statistics"].get("viewCount", "0"),
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            })

        return videos
    except Exception as e:
        raise Exception(f"Failed to fetch trending videos: {str(e)}")

def get_category_mapping():
    """
    Fetch video categories from the YouTube Data API.

    Returns:
        dict: A dictionary mapping category IDs to category names.
    """
    youtube = build("youtube", "v3", developerKey=API_KEY)
    try:
        request = youtube.videoCategories().list(
            part="snippet",
            regionCode="US"
        )
        response = request.execute()

        category_mapping = {}
        for item in response["items"]:
            category_id = item["id"]
            category_name = item["snippet"]["title"]
            category_mapping[category_id] = category_name

        return category_mapping
    except Exception as e:
        raise Exception(f"Failed to fetch categories: {str(e)}")
