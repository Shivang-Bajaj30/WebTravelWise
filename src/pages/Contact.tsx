import { useState } from 'react';

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

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">We'd love to hear from you! Get in touch with our team.</p>
        <div className="w-20 h-1 bg-red-700 mt-8 rounded mx-auto" />
      </div>
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <div className="flex flex-col gap-8 flex-1">
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Customer Support</h3>
            <p className="text-base leading-6 text-gray-700">Need help with your booking or have questions about our services?</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Email:</span> shivang.bajaj30@gmail.com</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Phone:</span> +91 9810739441</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Hours:</span> 24/7 Support</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow border border-gray-100 mb-4">
            <h3 className="text-lg text-red-700 mb-4 pb-3 border-b border-red-200">Business Inquiries</h3>
            <p className="text-base leading-6 text-gray-700">Interested in partnering with us or exploring business opportunities?</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Email:</span> shashwat.verma@gmail.com</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Phone:</span> +91 8800562999</p>
            <p className="text-base leading-6 text-gray-700"><span className="font-semibold">Hours:</span> Monday-Friday, 9am-5pm EST</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-10 shadow border border-gray-100 flex-1 mb-32">
          <h2 className="text-2xl text-gray-800 mb-8 pb-3 border-b-2 border-red-700 inline-block">Send Us a Message</h2>
          {formStatus.submitted && !formStatus.error ? (
            <div className="bg-green-50 border border-green-300 rounded p-5 items-center mb-5 text-center">
              <p className="text-green-800 mb-4">Thank you for your message! We'll get back to you as soon as possible.</p>
              <button onClick={() => setFormStatus({ submitted: false, error: false })} className="bg-red-700 rounded px-6 py-3 text-white font-bold">Send another message</button>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {formStatus.error && (
                <div className="bg-red-50 border border-red-300 rounded p-3 mb-3">
                  <p className="text-red-700">Please fill out all required fields.</p>
                </div>
              )}
              <div className="mb-6">
                <label className="text-black mb-2 block" htmlFor="name">Your Name *</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  required
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                />
              </div>
              <div className="mb-6">
                <label className="text-black mb-2 block" htmlFor="email">Your Email *</label>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                />
              </div>
              <div className="mb-6">
                <label className="text-black mb-2 block" htmlFor="subject">Subject</label>
                <input
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  name="subject"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                />
              </div>
              <div className="mb-6">
                <label className="text-black mb-2 block" htmlFor="message">Your Message *</label>
                <textarea
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message"
                  name="message"
                  id="message"
                  required
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                />
              </div>
              <button type="submit" className="bg-red-700 rounded px-6 py-3 text-white font-bold">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 