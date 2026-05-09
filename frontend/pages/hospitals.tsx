import { useState } from "react";

export default function HospitalsPage() {
  const [loading, setLoading] = useState(false);
  const [hospitalData, setHospitalData] = useState<any>(null);
  const [manualLocation, setManualLocation] = useState("");

  const [detectedLocation, setDetectedLocation] = useState("");
  const [pendingLat, setPendingLat] = useState<number | null>(null);
  const [pendingLng, setPendingLng] = useState<number | null>(null);

  const fetchNearbyHospitals = async (lat: number, lng: number) => {
    setLoading(true);
    setHospitalData(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/nearby-hospitals?lat=${lat}&lng=${lng}`
      );

      const data = await response.json();
      setHospitalData(data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch nearby hospitals");
    }

    setLoading(false);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const reverseResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const reverseData = await reverseResponse.json();

          const cityName =
            reverseData.address?.city ||
            reverseData.address?.town ||
            reverseData.address?.village ||
            reverseData.address?.state ||
            "Detected Location";

          const stateName =
            reverseData.address?.state || "";

          setDetectedLocation(`${cityName}, ${stateName}`);

          setPendingLat(lat);
          setPendingLng(lng);
        } catch (error) {
          console.error(error);
          alert("Unable to detect location name");
        }

        setLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const confirmDetectedLocation = () => {
    if (pendingLat && pendingLng) {
      fetchNearbyHospitals(pendingLat, pendingLng);
    }
  };

  const searchManualLocation = async () => {
    if (!manualLocation.trim()) {
      alert("Please enter city or PIN code");
      return;
    }

    setLoading(true);
    setHospitalData(null);

    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${manualLocation}`
      );

      const geoData = await geoResponse.json();

      if (!geoData.length) {
        alert("Location not found");
        setLoading(false);
        return;
      }

      const lat = parseFloat(geoData[0].lat);
      const lng = parseFloat(geoData[0].lon);

      await fetchNearbyHospitals(lat, lng);
    } catch (error) {
      console.error(error);
      alert("Unable to find location");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
          Nearby Hospitals
        </h1>

        <p className="text-[#64748B] mb-8">
          Find hospitals using GPS or city / PIN code
        </p>

        {/* GPS Button */}
        <button
          onClick={useCurrentLocation}
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg mb-6"
        >
          {loading
            ? "Detecting Your Location..."
            : "Use My Current Location"}
        </button>

        {/* Confirm Location */}
        {detectedLocation && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">
              Confirm Your Location
            </h2>

            <p className="text-gray-700 mb-4">
              Detected Location:
            </p>

            <p className="text-lg font-bold text-blue-700 mb-6">
              {detectedLocation}
            </p>

            <div className="flex gap-4">
              <button
                onClick={confirmDetectedLocation}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Yes, Continue
              </button>

              <button
                onClick={() => setDetectedLocation("")}
                className="bg-gray-200 px-6 py-3 rounded-xl font-semibold"
              >
                Change Location
              </button>
            </div>
          </div>
        )}

        {/* Manual Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Search by City / PIN Code
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter city or PIN code"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={searchManualLocation}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Results */}
        {hospitalData && (
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-4">
              Nearby Hospitals
            </h2>

            {hospitalData.message && (
              <p className="text-yellow-600 mb-4 font-medium">
                {hospitalData.message}
              </p>
            )}

            {!hospitalData.hospitals ||
            hospitalData.hospitals.length === 0 ? (
              <p className="text-gray-500">
                No hospitals found. Try another location.
              </p>
            ) : (
              <div className="space-y-4">
                {hospitalData.hospitals.map(
                  (hospital: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-xl p-5"
                    >
                      <h3 className="font-semibold text-lg">
                        {hospital.name}
                      </h3>

                      <p className="text-gray-600">
                        {hospital.address}
                      </p>

                      <p className="text-blue-600 font-medium">
                        Distance: {hospital.distance}
                      </p>

                      {/* 🔥 Google Maps */}
                      {hospital.lat && hospital.lng && (
                        <a
                          href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lng}`}
                          target="_blank"
                          className="text-sm text-blue-500 underline"
                        >
                          Open in Maps
                        </a>
                      )}

                      <p className="text-green-600 font-medium mt-2">
                        {hospital.status}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}