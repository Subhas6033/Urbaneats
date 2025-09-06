import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MenuCard } from '../../Components/index';
import MenuItems from './MenuItems';
import {
  SlideUp,
  FadeInUp,
  ScaleIn,
  FadeInDown,
} from '../../Utility/Animation';

const ITEMS_PER_PAGE = 6;

const categories = [
  'All',
  'Starters',
  'Main Course',
  'Desserts',
  'Drinks',
  'Pizza',
  'Burger',
  'Biryani',
];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items by category and search
  const filteredItems = MenuItems.filter((item) => {
    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Urban Eats | Menu </title>
        <meta
          name="description"
          content="Discover the full menu of Urban Eats - freshly cooked meals, desserts, and beverages."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <FadeInDown>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Our Menu
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore our delicious meals and discover your favorite dishes.
            </p>
          </div>
        </FadeInDown>

        {/* Search Input */}
        <SlideUp>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="px-4 py-2 w-full max-w-md border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </SlideUp>

        {/* Categories Filter */}
        <FadeInUp>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((item, i) => (
              <FadeInUp key={item.id} delay={i * 0.1}>
                <MenuCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              </FadeInUp>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No dishes found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ScaleIn>
            <div className="flex justify-center items-center mt-8 gap-3 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === idx + 1
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </ScaleIn>
        )}
      </div>
    </>
  );
};

export default MenuPage;
