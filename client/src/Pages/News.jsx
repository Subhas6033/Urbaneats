/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Tag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp, FadeInScale } from '../Utility/Animation';
import { Helmet } from 'react-helmet-async';
import { sampleNews } from '../Data/index';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setNews(sampleNews);
  }, []);

  return (
    <>
      <Helmet>
        <title>Urban Eats | News </title>
        <meta
          name="description"
          content="Stay updated with the latest news from Urban Eats. Discover new menu launches, special promotions, and exciting updates about our journey."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            variants={FadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-emerald-600 mb-4 flex items-center justify-center gap-2">
              <Newspaper className="w-8 h-8 text-emerald-500" />
              Latest News
            </h1>
            <p className="text-gray-600 text-lg">
              Stay updated with our announcements, offers, and exciting updates.
            </p>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, i) => (
              <motion.div
                key={article.id}
                variants={FadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {article.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    View More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No news fallback */}
          {news.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No news available right now.
            </p>
          )}
        </div>

        {/* Modal for Full Article */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                variants={FadeInScale}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full relative"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedArticle.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {selectedArticle.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {selectedArticle.fullText}
                  </p>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NewsPage;
