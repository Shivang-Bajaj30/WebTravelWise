import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const About = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-800 dark:via-purple-900 dark:to-indigo-900 py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          About TravelWise
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-indigo-200 text-lg max-w-xl mx-auto"
        >
          Your trusted companion for memorable travel experiences
        </motion.p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
      <div className="flex flex-col gap-16">
        {/* Mission */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeInUp} custom={0} className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">🎯</span>
            Our Mission
          </motion.h2>
          <motion.p variants={fadeInUp} custom={1} className="text-base leading-8 text-gray-600 dark:text-gray-400">
            At TravelWise, we believe that travel is more than just visiting new places—it's about creating meaningful experiences that enrich your life. Our mission is to make travel planning simple, personalized, and enjoyable, so you can focus on what matters most: making memories.
          </motion.p>
        </motion.section>

        {/* What We Offer */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeInUp} custom={0} className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-10 h-10 bg-teal-100 dark:bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400">✨</span>
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Personalized Trip Planning', desc: 'Our AI-powered platform creates customized itineraries based on your preferences, budget, and travel style, ensuring every trip is uniquely yours.', icon: '📋', color: 'indigo' },
              { title: 'Curated Destinations', desc: 'Discover handpicked destinations with detailed information about accommodations, attractions, local cuisine, and cultural experiences.', icon: '🗺️', color: 'purple' },
              { title: 'Smart Recommendations', desc: 'Get intelligent suggestions for hotels, restaurants, and activities that match your interests and budget constraints.', icon: '🤖', color: 'teal' },
              { title: 'Trip Management', desc: 'Easily organize and access your travel plans, bookings, and important documents in one convenient location.', icon: '📁', color: 'emerald' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className="bg-white dark:bg-gray-800/60 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeInUp} custom={0} className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">💎</span>
            Our Values
          </motion.h2>
          <div className="space-y-4">
            {[
              { title: 'Authenticity', desc: 'We promote genuine travel experiences that respect local cultures and traditions.' },
              { title: 'Sustainability', desc: "We're committed to responsible tourism practices that minimize environmental impact." },
              { title: 'Inclusivity', desc: 'We believe travel should be accessible to everyone, regardless of background or ability.' },
              { title: 'Innovation', desc: 'We continuously improve our platform to provide the best possible user experience.' },
              { title: 'Reliability', desc: 'We deliver accurate information and dependable service you can trust.' },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                custom={i + 1}
                className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{value.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  </div>
);

export default About;