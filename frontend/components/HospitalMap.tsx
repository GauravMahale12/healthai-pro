import React from "react";
import {
  MapPin,
  Phone,
  Navigation,
  LocateFixed
} from "lucide-react";

const hospitals = [
  {
    name: "City Care Hospital",
    distance: "1.2 km away",
    status: "Open 24/7"
  },
  {
    name: "Life Plus Hospital",
    distance: "1.8 km away",
    status: "Emergency Available"
  },
  {
    name: "Sunrise Medical Center",
    distance: "2.5 km away",
    status: "Open Now"
  }
];

const HospitalMap = () => {
  return (
    <section className="w-full px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-border rounded-3xl shadow-soft p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary font-semibold mb-1">
                Nearby Hospitals
              </p>

              <h2 className="text-2xl font-bold text-textPrimary">
                Find Hospitals Using Live Location
              </h2>

              <p className="text-sm text-textSecondary mt-1">
                Real-time nearby hospitals, emergency services
                and doctor recommendations
              </p>
            </div>

            <button className="btn-outline flex items-center gap-2">
              <LocateFixed size={18} />
              Use My Current Location
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left Hospital Cards */}
            <div className="space-y-4">

              {hospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="border border-border rounded-2xl p-5 hover:shadow-md transition bg-[#FAFCFF]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-textPrimary">
                        {hospital.name}
                      </h3>

                      <p className="text-sm text-textSecondary mt-1">
                        {hospital.distance}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-success font-medium">
                      {hospital.status}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm hover:bg-white">
                      <Phone size={16} />
                      Call
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm hover:bg-white">
                      <Navigation size={16} />
                      Directions
                    </button>
                  </div>
                </div>
              ))}

              <button className="btn-primary w-full">
                View All Hospitals
              </button>
            </div>

            {/* Right Map Area */}
            <div className="border border-border rounded-3xl overflow-hidden bg-[#F8FAFC] min-h-[500px] relative">

              {/* Fake Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">

                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <MapPin size={34} className="text-primary" />
                  </div>

                  <h3 className="font-bold text-textPrimary text-lg mb-2">
                    Live Hospital Map
                  </h3>

                  <p className="text-textSecondary text-sm max-w-sm">
                    Google Maps / OpenStreetMap integration
                    will display nearby hospitals using
                    your real device location.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HospitalMap;