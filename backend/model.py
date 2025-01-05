from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from collections import Counter
import pandas as pd

# Load environment variables
load_dotenv()

API_KEY = os.getenv("API_KEY")

def get_trending_videos(region_code="US", max_results=50, category_id=None, date_range=None):
    """
    Fetch trending videos from the YouTube Data API with optional category and date range filtering.

    Args:
        region_code (str): Region code (e.g., "US").
        max_results (int): Maximum number of results.
        category_id (str): (Optional) Category ID to filter videos.
        date_range (tuple): Optional date range tuple (start_date, end_date) for filtering.

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
            
            # Filter by date range if provided
            if date_range:
                published_at = item["snippet"]["publishedAt"]
                if not is_within_date_range(published_at, date_range):
                    continue

            videos.append({
                "id": item["id"],
                "title": item["snippet"]["title"],
                "channelName": item["snippet"]["channelTitle"],
                "viewCount": item["statistics"].get("viewCount", "0"),
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
                "categoryId": item["snippet"]["categoryId"],
                "publishedAt": item["snippet"]["publishedAt"]
            })

        return videos
    except Exception as e:
        raise Exception(f"Failed to fetch trending videos: {str(e)}")

def is_within_date_range(published_at, date_range):
    """
    Check if the video's published date is within the specified date range.

    Args:
        published_at (str): The published date in ISO 8601 format.
        date_range (tuple): Start and end date in ISO 8601 format (start_date, end_date).

    Returns:
        bool: True if the date is within the range, False otherwise.
    """
    from datetime import datetime
    start_date, end_date = date_range
    published_at = datetime.fromisoformat(published_at[:-1])  # Remove the "Z" at the end for datetime parsing
    return start_date <= published_at <= end_date

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

def preprocess_videos(videos):
    """
    Process and prepare video data for visualizations.

    Args:
        videos (list): List of video dictionaries.

    Returns:
        pd.DataFrame: A DataFrame containing processed video data.
    """
    df = pd.DataFrame(videos)
    
    # Convert viewCount and publishedAt to appropriate types
    df['viewCount'] = pd.to_numeric(df['viewCount'], errors='coerce')
    df['publishedAt'] = pd.to_datetime(df['publishedAt'], errors='coerce')

    # Filter out rows with missing data
    df = df.dropna(subset=['viewCount'])

    return df

def get_category_videos(region_code="US", category_id=None, max_results=50):
    """
    Fetch trending videos filtered by category.

    Args:
        region_code (str): Region code.
        category_id (str): Category ID.
        max_results (int): Maximum number of results.

    Returns:
        pd.DataFrame: A DataFrame of videos filtered by category.
    """
    videos = get_trending_videos(region_code, max_results, category_id)
    return preprocess_videos(videos)
