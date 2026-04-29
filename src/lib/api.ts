const BASE_URL = "http://127.0.0.1:5000";

export const login = async (identifier: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await response.json();

  if (response.ok && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};


export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};


// export const generateItinerary = async (data: any) => {
//   const res = await fetch(`${BASE_URL}/generate_itinerary`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const generateItinerary = async (data: {
//   destination: string;
//   travelers: number;
//   startDate: string;
//   endDate: string;
//   preferences: string;
// }) => {
//   const res = await fetch(`${BASE_URL}/generate_itinerary`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to generate itinerary (${res.status})`);
//   }

//   return res.json();
// };


export const generateItinerary = async (data: {
  destination: string;
  travelers: number;
  startDate: string;
  endDate: string;
  preferences?: string;
  budget?: string;
}) => {


  const params = new URLSearchParams({
    location: data.destination,
    travelers: String(data.travelers),
    startDate: data.startDate,
    endDate: data.endDate,
    preferences: data.preferences || "",
    budget: data.budget || "",
  });

  const res = await fetch(`${BASE_URL}/api/trips/create?${params.toString()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to generate itinerary (${res.status})`);
  }

  return res.json();
};