```java
package com.travelwise.Backend.Controller;

import com.travelwise.Backend.Model.User;
import com.travelwise.Backend.Service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${mapbox.api.key}")
    private String mapboxApiKey;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        try {
            User user = userService.login(email, password);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            String message = e.getMessage();
            if ("User not found".equals(message)) {
                return ResponseEntity.status(404).body(message);
            } else if ("Incorrect password".equals(message)) {
                return ResponseEntity.status(401).body(message);
            } else {
                return ResponseEntity.badRequest().body("Login failed");
            }
        }
    }

    // Endpoint to fetch location suggestions from Mapbox Geocoding API
    @GetMapping("/locations")
    public ResponseEntity<List<NominatimResult>> getLocationSuggestions(@RequestParam String query) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl("https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json")
                    .queryParam("access_token", mapboxApiKey)
                    .queryParam("limit", 5)
                    .queryParam("autocomplete", true)
                    .buildAndExpand(query)
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "TravelWise/1.0 (your.email@example.com)"); // Replace with your contact info
            NominatimResult[] results = restTemplate.getForObject(url, NominatimResult[].class);
            if (results == null || results.length == 0) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(Arrays.asList(results));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle Mapbox API errors
        }
    }

    // Endpoint to handle trip details submission
    @PostMapping("/trip")
    public ResponseEntity<String> submitTripDetails(@RequestBody TripDetails tripDetails) {
        try {
            // Placeholder for AI itinerary generation
            System.out.println("Received trip details: " + tripDetails);
            return ResponseEntity.ok("Trip details received successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to process trip details: " + e.getMessage());
        }
    }
}

// Data class for Nominatim results
@Setter
@Getter
class NominatimResult {
    // Getters and setters
    private String display_name;
    private String lat;
    private String lon;

}

// Data class for trip details
@Setter
@Getter
class TripDetails {
    // Getters and setters
    private String location;
    private int travelers;
    private String startDate;
    private String endDate;
    private String preferences;

    @Override
    public String toString() {
        return "TripDetails{location='" + location + "', travelers=" + travelers +
                ", startDate='" + startDate + "', endDate='" + endDate +
                "', preferences='" + preferences + "'}";
    }
}

```


This above is my spring boot controller, and i want you to update my frontend code so that it can work with this backend. Update the trip and location parts.

```tsx
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const Home = () => {
//   const images = [
//     '/images/bg1.jpg',
//     '/images/bg2.jpg',
//     '/images/bg3.jpg',
//     '/images/bg4.jpg',
//     '/images/mountains.jpg',
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPrevImageIndex(currentImageIndex);
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//       setIsAnimating(true);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [currentImageIndex, images.length]);

//   useEffect(() => {
//     images.forEach((img) => {
//       const preloadImg = new window.Image();
//       preloadImg.src = img;
//     });
//   }, [images]);

//   useEffect(() => {
//     if (isAnimating) {
//       const timeout = setTimeout(() => setIsAnimating(false), 700);
//       return () => clearTimeout(timeout);
//     }
//   }, [isAnimating]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <div className="relative w-full flex items-center justify-center overflow-hidden h-[45vh] sm:h-[60vh] lg:h-[80vh] mt-[-3px]">
//         {isAnimating && prevImageIndex !== null && (
//           <motion.div
//             key={images[prevImageIndex] + '-prev'}
//             className="absolute inset-0 w-full h-full bg-cover bg-center"
//             style={{ 
//               backgroundImage: `url(${images[prevImageIndex]})`,
//               filter: 'brightness(0.75)' 
//             }}
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 0 }}
//             transition={{ duration: 0.7, ease: 'easeInOut' }}
//           />
//         )}
//         <motion.div
//           key={images[currentImageIndex] + '-current'}
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{ 
//             backgroundImage: `url(${images[currentImageIndex]})`,
//             filter: 'brightness(0.65)' 
//           }}
//           initial={{ opacity: prevImageIndex === null ? 1 : 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: prevImageIndex === null ? 0 : 0.7, ease: 'easeInOut' }}
//         />
//         <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-3xl mx-auto">
//           <h1 className="text-white font-bold mb-4 leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
//             Discover Your Next Adventure
//           </h1>
//           <p className="text-white mb-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-lg md:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
//             Plan your perfect trip with TravelWise – explore breathtaking destinations and curated packages.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs sm:max-w-md">
//             <input
//               type="text"
//               placeholder="Where would you like to go?"
//               className="px-4 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto flex-1 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
//             />
//             <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-700 transition-colors duration-200">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Featured Section */}
//       <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//               <div className="h-40 sm:h-48 md:h-56 bg-gray-200 w-full" />
//               <div className="p-4 flex flex-col flex-1">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Destination {i}</h3>
//                 <p className="text-gray-600 mt-2 text-sm sm:text-base flex-1">Explore stunning landscapes and vibrant cultures.</p>
//                 <button className="mt-3 text-blue-600 font-semibold hover:underline text-sm sm:text-base w-max self-start">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

const Home: React.FC = () => {
  const images: string[] = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/mountains.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(true);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new window.Image();
      preloadImg.src = img;
    });
  }, [images]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (location.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        const response = await axios.get<NominatimResult[]>('http://localhost:8080/api/locations', {
          params: { query: location },
        });
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [location]);

  const handleSuggestionClick = (suggestion: NominatimResult) => {
    setLocation(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      navigate('/trip-details', { state: { selectedLocation: location } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center overflow-hidden h-[45vh] sm:h-[60vh] lg:h-[80vh] mt-[-3px]">
        {isAnimating && prevImageIndex !== null && (
          <motion.div
            key={images[prevImageIndex] + '-prev'}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[prevImageIndex]})`,
              filter: 'brightness(0.75)',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        )}
        <motion.div
          key={images[currentImageIndex] + '-current'}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            filter: 'brightness(0.65)',
          }}
          initial={{ opacity: prevImageIndex === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prevImageIndex === null ? 0 : 0.7, ease: 'easeInOut' }}
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-white font-bold mb-4 leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
            Discover Your Next Adventure
          </h1>
          <p className="text-white mb-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-lg md:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
            Plan your perfect trip with TravelWise – explore breathtaking destinations and curated packages.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-xs sm:max-w-md relative">
            <div className="relative w-full sm:w-auto flex-1">
              <input
                type="text"
                ref={inputRef}
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                placeholder="Where would you like to go?"
                className="px-4 py-2 rounded-lg text-sm sm:text-base w-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.display_name}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 cursor-pointer"
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-700-700 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="h-40 sm:h-48 md:h-56 bg-gray-200 w-full" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Destination {i}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base flex-1">Explore stunning landscapes and vibrant cultures.</p>
                <button className="mt-3 text-blue-600 font-semibold hover:underline text-sm sm:text-base w-max self-start">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
```