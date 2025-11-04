const About = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800 font-sans">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-red-700 mb-4">About TravelWise</h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">Your trusted companion for memorable travel experiences</p>
      <div className="w-20 h-1 bg-red-700 mt-8 rounded mx-auto" />
    </div>
    <div className="flex flex-col gap-16">
      <section className="px-4">
        <h2 className="text-2xl text-gray-800 mb-6 pb-3 relative border-b-2 border-red-700 inline-block">Our Mission</h2>
        <p className="text-base leading-8 text-gray-600 mb-5">
          At TravelWise, we believe that travel is more than just visiting new places—it's about creating meaningful experiences that enrich your life. Our mission is to make travel planning simple, personalized, and enjoyable, so you can focus on what matters most: making memories.
        </p>
      </section>
      <section className="px-4">
        <h2 className="text-2xl text-gray-800 mb-6 pb-3 relative border-b-2 border-red-700 inline-block">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Personalized Trip Planning</h3>
            <p className="text-base leading-6 text-gray-700">
              Our AI-powered platform creates customized itineraries based on your preferences, budget, and travel style, ensuring every trip is uniquely yours.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Curated Destinations</h3>
            <p className="text-base leading-6 text-gray-700">
              Discover handpicked destinations with detailed information about accommodations, attractions, local cuisine, and cultural experiences.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Smart Recommendations</h3>
            <p className="text-base leading-6 text-gray-700">
              Get intelligent suggestions for hotels, restaurants, and activities that match your interests and budget constraints.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Trip Management</h3>
            <p className="text-base leading-6 text-gray-700">
              Easily organize and access your travel plans, bookings, and important documents in one convenient location.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4">
        <h2 className="text-2xl text-gray-800 mb-6 pb-3 relative border-b-2 border-red-700 inline-block">Our Values</h2>
        <ul className="my-8 list-none p-0">
          <li className="relative pl-8 border-b border-gray-100 py-4">
            <span className="absolute left-0 top-4 text-red-700 font-bold">✓</span>
            <span className="font-semibold">Authenticity:</span> We promote genuine travel experiences that respect local cultures and traditions.
          </li>
          <li className="relative pl-8 border-b border-gray-100 py-4">
            <span className="absolute left-0 top-4 text-red-700 font-bold">✓</span>
            <span className="font-semibold">Sustainability:</span> We're committed to responsible tourism practices that minimize environmental impact.
          </li>
          <li className="relative pl-8 border-b border-gray-100 py-4">
            <span className="absolute left-0 top-4 text-red-700 font-bold">✓</span>
            <span className="font-semibold">Inclusivity:</span> We believe travel should be accessible to everyone, regardless of background or ability.
          </li>
          <li className="relative pl-8 border-b border-gray-100 py-4">
            <span className="absolute left-0 top-4 text-red-700 font-bold">✓</span>
            <span className="font-semibold">Innovation:</span> We continuously improve our platform to provide the best possible user experience.
          </li>
          <li className="relative pl-8 py-4">
            <span className="absolute left-0 top-4 text-red-700 font-bold">✓</span>
            <span className="font-semibold">Reliability:</span> We deliver accurate information and dependable service you can trust.
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default About; 