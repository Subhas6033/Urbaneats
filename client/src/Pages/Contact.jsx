import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../Components'; 

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16 flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Contact <span className="text-green-600">Urban Eats</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Got a question, feedback, or just want to say hello? We’d love to hear
          from you! Reach out using the form below, or connect with us directly.
        </p>
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-green-600 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Visit Us</h3>
              <p className="text-gray-600">123 Main Street, Downtown City</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-green-600 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
              <p className="text-gray-600">support@urbaneats.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-8 h-8 text-green-600 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="2"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
