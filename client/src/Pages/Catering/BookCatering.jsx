import { Mail, Phone, MapPin } from 'lucide-react';
import { Input, Button } from '../../Components'; // ✅ import your components
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16 flex flex-col items-center">
      {/* Hero */}
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
        <form
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            id="name"
            name="name"
            label="Name"
            placeholder="Your full name"
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />

          {/* Textarea manually styled but matches Input look */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Write your message..."
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm"
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            variant="green"
            size="md"
            round="xl"
            className="w-full shadow-md"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
