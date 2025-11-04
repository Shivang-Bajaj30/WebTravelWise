import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Hotel,
  Bus,
  Calendar,
  ArrowLeft,
  DollarSign,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface ItineraryData {
  places?: {
    name: string;
    details: string;
    time?: string;
    pricing?: string;
    bestTime?: string;
    image?: string;
  }[];
  hotels?: {
    name: string;
    address?: string;
    price?: string | number;
    rating?: string | number;
    amenities?: string[];
    description?: string;
    image?: string;
  }[];
  transportation?: string[];
  costs?: string[];
  itinerary?: {
    day: number;
    activities: string[];
  }[];
  budget?: string;
  duration?: string;
}

const ItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Location state:", location.state);
  let data: ItineraryData | undefined =
    location.state?.data?.data ||
    location.state?.data ||
    location.state?.result?.data?.data;

  console.log("Received itinerary data:", data);

  if (!data) {
    data = {
      places: [
        {
          name: "Santorini, Greece",
          details: "Whitewashed villages, blue domes, and breathtaking sunsets.",
          time: "Morning",
          pricing: "$20",
          bestTime: "April - October",
          image: "/images/bg1.jpg",
        },
      ],
      hotels: [
        {
          name: "Blue Palace Hotel",
          address: "Santorini, Greece",
          price: "$120/night",
          rating: "4.7",
          amenities: ["Pool", "WiFi", "Breakfast"],
          description: "Luxury stay with caldera views.",
          image: "/images/bg2.jpg",
        },
      ],
      transportation: ["Bus", "Taxi", "Scooter"],
      costs: ["Flight: $300", "Hotel: $120/night", "Food: $40/day"],
      itinerary: [
        {
          day: 1,
          activities: [
            "Arrive in Santorini",
            "Check in to hotel",
            "Evening walk in Oia",
          ],
        },
        {
          day: 2,
          activities: ["Visit Red Beach", "Explore Fira", "Sunset cruise"],
        },
      ],
      budget: "$1000",
      duration: "3 days",
    };
  }

  const { places = [], hotels = [], transportation = [], costs = [], itinerary = [], budget, duration } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-red-50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            ✈️ Your Personalized Itinerary
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore your dream trip with curated recommendations tailored just for you.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white shadow-md px-6 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </motion.div>

        {/* Overview Info */}
        {(budget || duration) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 flex flex-col sm:flex-row justify-center gap-8 text-gray-800 text-lg"
          >
            {duration && (
              <p className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Duration:</span> {duration}
              </p>
            )}
            {budget && (
              <p className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="font-medium">Budget:</span> {budget}
              </p>
            )}
          </motion.div>
        )}

        {/* Section Template */}
        {[
          {
            icon: <MapPin className="w-6 h-6" />,
            title: "Must-Visit Places",
            data: places,
            empty: "No place recommendations available.",
            render: (p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.details}</p>
                <div className="text-sm text-gray-500 mt-1 flex flex-col">
                  <span>🕒 {p.time || "Flexible"} | 💰 {p.pricing || "Free"}</span>
                  <span>🌤️ Best time: {p.bestTime || "All year"}</span>
                </div>
              </motion.div>
            ),
          },
          {
            icon: <Hotel className="w-6 h-6" />,
            title: "Recommended Hotels",
            data: hotels,
            empty: "No hotel data available.",
            render: (h: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
              >
                {h.image && (
                  <img
                    src={h.image}
                    alt={h.name}
                    className="w-full h-44 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg text-gray-900">{h.name}</h3>
                <p className="text-sm text-gray-600">{h.description}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {h.address}</p>
                <p className="text-sm text-gray-500">
                  💵 {h.price || "N/A"} | ⭐ {h.rating || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  🛎️ {h.amenities?.join(", ") || "N/A"}
                </p>
              </motion.div>
            ),
          },
        ].map((section, index) => (
          <Card
            key={index}
            className="shadow-md border border-orange-100 bg-gradient-to-b from-white to-orange-50/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
                {section.icon} {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.data.length > 0
                ? section.data.map(section.render)
                : <p className="text-gray-600">{section.empty}</p>}
            </CardContent>
          </Card>
        ))}

        {/* Transportation */}
        <Card className="shadow-md border border-orange-100 bg-gradient-to-b from-white to-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Bus className="w-6 h-6" /> Transportation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transportation.length ? (
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {transportation.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No transportation data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="shadow-md border border-orange-100 bg-gradient-to-b from-white to-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <DollarSign className="w-6 h-6" /> Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {costs.length ? (
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {costs.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No cost information available.</p>
            )}
          </CardContent>
        </Card>

        {/* Daily Itinerary */}
        <Card className="shadow-md border border-orange-100 bg-gradient-to-b from-white to-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-2xl">
              <Calendar className="w-6 h-6" /> Daily Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {itinerary.length ? (
              itinerary.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Day {day.day}
                  </h3>
                  <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {day.activities?.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No daily itinerary available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItineraryPage;
