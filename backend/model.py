from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from collections import Counter

# Load environment variables
load_dotenv()

API_KEY = os.getenv("API_KEY")

def get_trending_videos(region_code="US", max_results=50, category_id=None):
    """
    Fetch trending videos from the YouTube Data API with optional category filtering.

    Args:
        region_code (str): Region code (e.g., "US").
        max_results (int): Maximum number of results.
        category_id (str): (Optional) Category ID to filter videos.

    Returns:
        list: A list of dictionaries containing video details.
    """
    youtube = build("youtube", "v3", developerKey=API_KEY)
    try:
        request = youtube.videos().list(
            part="snippet,statistics",
            chart="mostPopular",
            regionCode=region_code,
            maxResults=max_results
        )
        response = request.execute()

        videos = []
        for item in response.get("items", []):
            # Filter by category if category_id is provided
            if category_id and item["snippet"]["categoryId"] != category_id:
                continue

            videos.append({
                "id": item["id"],
                "title": item["snippet"]["title"],
                "channelName": item["snippet"]["channelTitle"],
                "viewCount": item["statistics"].get("viewCount", "0"),
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
                "categoryId": item["snippet"]["categoryId"]
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

def get_top_channels(region_code="US", max_results=50):
    """
    Identify top-performing channels based on total views from trending videos.

    Args:
        region_code (str): Region code (e.g., "US").
        max_results (int): Maximum number of results.

    Returns:
        list: A list of top channels with their total views.
    """
    videos = get_trending_videos(region_code, max_results)
    channel_views = Counter()

    for video in videos:
        channel_views[video["channelName"]] += int(video["viewCount"])

    return channel_views.most_common()

def search_videos(region_code="US", query=None, max_results=50):
    """
    Search for specific keywords in trending videos.

    Args:
        region_code (str): Region code (e.g., "US").
        query (str): Search keyword.
        max_results (int): Maximum number of results.

    Returns:
        list: A list of dictionaries containing matching video details.
    """
    videos = get_trending_videos(region_code, max_results)

    if query:
        query = query.lower()
        videos = [video for video in videos if query in video["title"].lower() or query in video["channelName"].lower()]

    return videos
