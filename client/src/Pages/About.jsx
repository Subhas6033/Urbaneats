import { Users, Leaf, Utensils } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center px-6 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          About <span className="text-green-600">Urban Eats</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          At <span className="font-semibold">Urban Eats</span>, we believe food
          is more than just fuel — it’s culture, community, and connection. Born
          in the heart of the city, our mission is simple: bring fresh,
          flavorful, and accessible meals to people on the go.
        </p>
      </div>

      {/* Mission + Values */}
      <div className="max-w-6xl grid md:grid-cols-3 gap-8 mt-16">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Fresh Ingredients</h3>
          <p className="text-gray-600">
            We prioritize seasonal, responsibly sourced produce to make sure
            every dish is vibrant and nourishing.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 text-center">
          <Utensils className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Flavor First</h3>
          <p className="text-gray-600">
            Every bite is crafted to deliver bold, memorable flavors inspired by
            modern urban cuisine.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 text-center">
          <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Community Focused</h3>
          <p className="text-gray-600">
            More than food, Urban Eats is about connection — bringing people
            together around the table.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-4xl text-center mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          We know city life moves fast. That’s why we make dining simple,
          convenient, and satisfying — with eco-friendly packaging, customizable
          meals, and a welcoming atmosphere that fits seamlessly into your day.
        </p>
        <p className="text-2xl font-semibold text-green-600">
          Good food powers a good day.
        </p>
      </div>
    </div>
  );
};

export default About;
