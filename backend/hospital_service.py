import requests
import math

GEOAPIFY_API_KEY = "190849ad208d4c3c9b32762a7ca5c11a"


# Haversine Formula (accurate distance)
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance_km = R * c

    return distance_km * 1000  # return meters


def get_nearby_hospitals(lat, lng):
    url = "https://api.geoapify.com/v2/places"

    params = {
        "categories": "healthcare.hospital",
        "filter": f"circle:{lng},{lat},5000",
        "limit": 10,
        "apiKey": GEOAPIFY_API_KEY
    }

    try:
        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            return {
                "message": "Unable to fetch hospitals right now.",
                "hospitals": []
            }

        data = response.json()
        hospitals = []

        for place in data.get("features", []):
            props = place.get("properties", {})

            hospital_lat = props.get("lat")
            hospital_lng = props.get("lon")

            if not hospital_lat or not hospital_lng:
                continue

            # Calculate real distance
            distance_m = calculate_distance(
                lat, lng, hospital_lat, hospital_lng
            )

            # Smart formatting
            if distance_m < 50:
                distance_display = "Very Close"
            elif distance_m < 1000:
                distance_display = f"{int(distance_m)} m"
            else:
                distance_display = f"{round(distance_m / 1000, 2)} km"

            hospitals.append({
                "name": props.get("name", "Nearby Hospital"),
                "address": props.get("formatted", "Address not available"),
                "distance": distance_display,
                "distance_value": distance_m,  # for sorting
                "lat": hospital_lat,
                "lng": hospital_lng,
                "status": "Available"
            })

        # Sort by real distance
        hospitals = sorted(hospitals, key=lambda x: x["distance_value"])

        # remove internal field
        for h in hospitals:
            del h["distance_value"]

        if not hospitals:
            return {
                "message": "No hospitals found nearby.",
                "hospitals": []
            }

        return {
            "message": "Nearby hospitals fetched successfully",
            "hospitals": hospitals
        }

    except Exception as e:
        return {
            "message": "Hospital service temporarily unavailable.",
            "error": str(e),
            "hospitals": []
        }


def get_nearby_ambulance(lat, lng):
    return {
        "ambulance_services": [
            {
                "service_name": "Emergency Ambulance Service",
                "phone": "108",
                "availability": "Available"
            }
        ],
        "emergency_numbers": {
            "ambulance": "108",
            "national_emergency": "112"
        }
    }