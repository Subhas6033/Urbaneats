import { Users, Utensils, Clipboard, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Amit Sharma',
    feedback:
      'The food was delicious and delivery was super fast! Definitely ordering again.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sen',
    feedback:
      'Loved the packaging and the taste was just like a restaurant dine-in experience.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    feedback:
      'Great discounts and amazing offers. Value for money and super tasty.',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Roy',
    feedback: 'Best burgers in town! The BOGO Friday offer is unbeatable.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
];

const cateringServices = [
  {
    icon: Users,
    title: 'Corporate Events',
    description:
      'Business lunches, meetings, and office parties with hassle-free catering.',
  },
  {
    icon: Utensils,
    title: 'Weddings & Parties',
    description:
      'Full-course meals, appetizers, and desserts for your special events.',
  },
  {
    icon: Clipboard,
    title: 'Private Catering',
    description:
      'Birthday parties, family gatherings, and other private events.',
  },
  {
    icon: CheckCircle,
    title: 'Custom Menus',
    description:
      'Tailor your menu based on event size, preferences, and cuisine type.',
  },
];

const sampleMenu = [
  {
    name: 'Crispy Spring Rolls',
    image: './popular dish/Crispy Spring Rolls.jpg',
  },
  { name: 'BBQ Chicken Pizza', image: './popular dish/BBQ Chicken Pizza.avif' },
  {
    name: 'Paneer Butter Masala',
    image: './popular dish/Paneer Butter Masala.webp',
  },
  { name: 'Gulab Jamun', image: './popular dish/Gulab Jamun.webp' },
];

const steps = [
  'Choose Your Menu',
  'Select Your Package',
  'Confirm & Schedule',
  'Enjoy!',
];

const giftOptions = [
  {
    id: 1,
    name: '₹500 Gift Card',
    price: 500,
    description: 'Perfect for any occasion.',
  },
  {
    id: 2,
    name: '₹1000 Gift Card',
    price: 1000,
    description: 'Give the gift of choice.',
  },
  {
    id: 3,
    name: 'Special Dessert Hamper',
    price: 1200,
    description: 'Curated treats for your loved ones.',
  },
];

const popularDishes = [
  {
    image: './popular dish/Crispy Spring Rolls.jpg',
    name: 'Crispy Spring Rolls',
    price: 180,
    description: 'Golden fried rolls stuffed with fresh veggies.',
  },
  {
    image: './popular dish/BBQ Chicken Pizza.avif',
    name: 'BBQ Chicken Pizza',
    price: 350,
    description: 'Smoky BBQ chicken with melted cheese on a crispy base.',
  },
  {
    image: './popular dish/Paneer Butter Masala.webp',
    name: 'Paneer Butter Masala',
    price: 260,
    description: 'Soft paneer cubes in rich buttery tomato gravy.',
  },
  {
    image: './popular dish/Tandoori Momos.jpg',
    name: 'Tandoori Momos',
    price: 200,
    description: 'Spiced momos roasted to perfection in tandoor.',
  },
  {
    image: './popular dish/Gulab Jamun.webp',
    name: 'Gulab Jamun',
    price: 90,
    description: 'Soft milk dumplings soaked in sweet syrup.',
  },
  {
    image: './popular dish/Mango Lassi.png',
    name: 'Mango Lassi',
    price: 120,
    description: 'Refreshing mango yogurt drink, smooth and creamy.',
  },
];

const sampleNews = [
  {
    id: 1,
    title: 'New Catering Packages Launched!',
    summary:
      'We’ve introduced customizable catering options for all your special events.',
    fullText:
      'We’ve introduced new customizable catering options for weddings, corporate events, and private parties. Customers can now choose from multiple cuisines, live counters, and flexible packages tailored to their budget and preferences. Contact us today to book your event and make it unforgettable!',
    date: '2025-08-28',
    category: 'Catering',
    image: 'https://source.unsplash.com/600x400/?food,catering',
  },
  {
    id: 2,
    title: 'Festive Season Discounts 🎉',
    summary:
      'Enjoy flat 20% off on all gift cards and hampers this festive season.',
    fullText:
      'Celebrate the festive season with exclusive discounts! Enjoy flat 20% off on all gift cards and festive hampers. Gift your loved ones something special while saving big. Offer valid until the end of the month across all outlets and online orders.',
    date: '2025-08-15',
    category: 'Offers',
    image: 'https://source.unsplash.com/600x400/?gift,celebration',
  },
  {
    id: 3,
    title: 'New Store Opening in Kolkata',
    summary:
      'We’re expanding! Visit our new outlet with exclusive launch offers.',
    fullText:
      'We are excited to announce the grand opening of our new store in Kolkata! Customers can enjoy exclusive launch offers, free tastings, and surprise gift vouchers. The store will officially open on July 25th, and we invite you to join us for the celebration!',
    date: '2025-07-20',
    category: 'Announcements',
    image: 'https://source.unsplash.com/600x400/?store,shop',
  },
];

export {
  testimonials,
  cateringServices,
  sampleMenu,
  steps,
  giftOptions,
  popularDishes,
  sampleNews,
};
