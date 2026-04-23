import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ submitted: true, error: true });
      return;
    }
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFormStatus({ submitted: true, error: false });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none text-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-teal-600 via-indigo-600 to-purple-700 dark:from-teal-800 dark:via-indigo-900 dark:to-purple-900 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-teal-200 text-lg max-w-xl mx-auto"
          >
            We'd love to hear from you! Get in touch with our team.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 lg:w-2/5"
          >
            {[
              {
                title: 'Customer Support',
                desc: 'Need help with your booking or have questions about our services?',
                email: 'shivang.bajaj30@gmail.com',
                phone: '+91 9810739441',
                hours: '24/7 Support',
                icon: '🎧',
                color: 'indigo',
              },
              {
                title: 'Business Inquiries',
                desc: 'Interested in partnering with us or exploring business opportunities?',
                email: 'shashwat.verma@gmail.com',
                phone: '+91 8800562999',
                hours: 'Monday-Friday, 9am-5pm EST',
                icon: '💼',
                color: 'purple',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800/60 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{card.desc}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-base">📧</span>
                    <span className="font-medium">{card.email}</span>
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-base">📞</span>
                    <span className="font-medium">{card.phone}</span>
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-base">🕐</span>
                    <span className="font-medium">{card.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800/60 rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-700/50 lg:w-3/5"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">✉️</span>
              Send Us a Message
            </h2>

            {formStatus.submitted && !formStatus.error ? (
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                  Thank you for your message! We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormStatus({ submitted: false, error: false })}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl px-6 py-2.5 font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {formStatus.error && (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 text-sm text-red-600 dark:text-red-400">
                    Please fill out all required fields.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="name">Your Name *</label>
                    <input value={formData.name} onChange={handleChange} placeholder="John Doe" name="name" id="name" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">Your Email *</label>
                    <input value={formData.email} onChange={handleChange} placeholder="you@example.com" name="email" id="email" type="email" required className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="subject">Subject</label>
                  <input value={formData.subject} onChange={handleChange} placeholder="What's this about?" name="subject" id="subject" className={inputClass} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="message">Your Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    name="message"
                    id="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl px-6 py-3.5 font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 text-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;