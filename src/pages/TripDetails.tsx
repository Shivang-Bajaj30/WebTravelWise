import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Calendar, Users, Wand2, Plus, Minus, Sparkles } from "lucide-react";
import { generateItinerary } from "@/lib/api";

const TRAVEL_TAGS = [
  "Adventure",
  "Relaxation",
  "Culture",
  "Local Food",
  "Shopping",
  "Nature",
  "Luxury",
  "Budget-Friendly",
  "History",
  "Nightlife",
];

const TripDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const selectedLocation = locationState.state?.selectedLocation || "";

  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [customPref, setCustomPref] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const dateInfo = () => {
    if (!startDate || !endDate) return null;
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const sUtc = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
      const eUtc = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
      const diffDays = Math.round((eUtc - sUtc) / (1000 * 60 * 60 * 24)); // number of nights
      const nights = Math.max(0, diffDays);
      const days = nights + 1;
      return { days, nights };
    } catch (err) {
      return null;
    }
  };

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      setError("Please select a destination first.");
      return;
    }

    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const allPrefs = [...preferences];
      if (customPref.trim()) allPrefs.push(customPref.trim());

      const result = await generateItinerary({
        destination: selectedLocation,
        travelers,
        startDate,
        endDate,
        preferences: allPrefs.join(", "),
      });

      console.log("AI Itinerary:", result);
      setSuccess(true);

      setTimeout(() => {
        navigate("/itinerary", { state: { data: result } });

      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-[88vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-3xl w-full shadow-2xl bg-white/90 border border-white/40 backdrop-blur-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold text-gray-900">
            ✈️ Plan Your Dream Trip
          </CardTitle>
          <p className="text-gray-600">
            Destination:{" "}
            <span className="font-semibold text-orange-600">
              {selectedLocation || "Not selected"}
            </span>
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Travelers */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-orange-600" /> Travelers
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold">{travelers}</span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTravelers(travelers + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-orange-600" /> Trip Dates
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <Input
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              {/* Days / Nights summary */}
              {dateInfo() && (
                <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
                  <span className="font-medium">{dateInfo()!.days} {dateInfo()!.days === 1 ? 'day' : 'days'}</span>
                  <span className="text-gray-400">·</span>
                  <span className="font-medium">{dateInfo()!.nights} {dateInfo()!.nights === 1 ? 'night' : 'nights'}</span>
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="md:col-span-2 space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Wand2 className="w-5 h-5 text-orange-600" /> Travel Preferences
              </Label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant={preferences.includes(tag) ? "default" : "outline"}
                    className={`rounded-full ${
                      preferences.includes(tag)
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => togglePreference(tag)}
                  >
                    <Sparkles className="w-4 h-4 mr-1" /> {tag}
                  </Button>
                ))}
              </div>

              <Textarea
                value={customPref}
                onChange={(e) => setCustomPref(e.target.value)}
                placeholder="Add any other preferences..."
                rows={2}
              />
            </div>

            {error && (
              <p className="text-red-600 text-center md:col-span-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-center md:col-span-2">
                ✅ Itinerary generated successfully!
              </p>
            )}

            <div className="text-center md:col-span-2 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:scale-[1.03] transition-transform text-white px-10 py-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  "Generate AI Itinerary"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripDetailsPage;
