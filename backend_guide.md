# TravelWise MongoDB Packages Guide (Spring Boot)

Here is the guide to implement the MongoDB backend in your Spring Boot application, including the DTOs/Entities and the highly optimized prompt for the Gemini AI.

## 1. Create the `Package` Document Entity

When you insert packages into MongoDB, you should use a schema similar to this. Notice that `itineraryData` matches the data structure that the frontend `ItineraryPage.tsx` expects to render perfectly!

```java
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "packages")
public class TourPackage {
    @Id
    private String id;
    private String name;
    private String description;
    private String image;
    private String price;
    private String duration;
    private List<String> destinations;
    private List<String> includes;
    private double rating;
    private int reviews;
    private int people;
    
    private ItineraryData itineraryData;

    // --- NESTED CLASSES FOR A SINGLE MODEL DEFINITION ---

    public static class ItineraryData {
        private List<Place> places;
        private List<Hotel> hotels;
        private List<String> transportation;
        private List<String> costs;
        private List<DailyItinerary> itinerary;
        private String budget;
        private String duration;
        // Getters and Setters...
    }

    public static class Place {
        private String name;
        private String details;
        private String time;
        private String pricing;
        private String bestTime;
        private String location;
        private Coords coordinates;
        // Getters and Setters...
    }

    public static class Hotel {
        private String name;
        private String address;
        private String price;
        private double rating;
        private List<String> amenities;
        private String description;
        private String location;
        private Coords coordinates;
        // Getters and Setters...
    }

    public static class DailyItinerary {
        private int day;
        private List<String> activities;
        // Getters and Setters...
    }

    public static class Coords {
        private double lat;
        private double lng;
        // Getters and Setters...
    }

    // Getters and Setters for TourPackage...
}
```

## 2. Implement the Repository and Controller

Create a Spring Data MongoDB repository and a simple REST controller.

**PackageRepository.java**
```java
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PackageRepository extends MongoRepository<TourPackage, String> {
}
```

**PackageController.java**
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping
    public List<TourPackage> getAllPackages() {
        return packageRepository.findAll();
    }
}
```

## 3. The Optimal Prompt for Itinerary Generation

If you want to use the Gemini AI to generate the `itineraryData` dynamically and store it, use this highly optimized prompt. It explicitly forces JSON output, ensuring you won't get parsing errors when mapping to your Java objects.

**System Prompt / Instruction Set for the AI:**

```text
You are a master travel planner. Generate a highly detailed, realistic, and optimized travel itinerary based on the following parameters. 

Destination: {destination}
Duration: {duration}
Number of Travelers: {travelers}
Budget Category: {budget}

IMPORTANT INSTRUCTION: You MUST return the output ONLY as a valid JSON object matching the exact schema provided below. Do not include any markdown formatting (like ```json), no intro text, and no outro text. Return only the raw JSON.

{
  "places": [
    {
      "name": "Exact name of the attraction",
      "details": "A short, engaging description",
      "time": "Time of day to visit (e.g., Morning, Afternoon)",
      "pricing": "Estimated cost",
      "bestTime": "Best season or time to visit",
      "location": "A Google Maps search URL (e.g. https://maps.google.com/?q=Attraction+Name)",
      "coordinates": { "lat": 12.34, "lng": 56.78 }
    }
  ],
  "hotels": [
    {
      "name": "Name of recommended hotel",
      "address": "Full address or neighborhood",
      "price": "Cost per night",
      "rating": 4.8,
      "amenities": ["WiFi", "Pool", "Breakfast"],
      "description": "Short description of why it fits the budget and traveler count"
    }
  ],
  "transportation": ["List of recommended transportation modes (e.g., Train, Bus, Rental Car)"],
  "costs": ["Breakdown of estimated costs (e.g., 'Flights: $500', 'Food: $300')"],
  "itinerary": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ],
  "budget": "The overall total estimated budget as a string",
  "duration": "The total duration as a string"
}
```

When you generate this JSON using Gemini in your Spring Boot service layer, map the response into your `ItineraryData` class, attach it to your `TourPackage` entity, and save it to MongoDB!
