"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, ExternalLink, Calendar, Clock, User } from "lucide-react";

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", count: 8 },
    { id: "analytics", name: "Analytics", count: 3 },
    { id: "marketing", name: "Marketing", count: 2 },
    { id: "tutorials", name: "Tutorials", count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Analytics Metrics Every Business Should Track",
      excerpt: "Discover the essential metrics that drive business growth and how to implement them effectively.",
      category: "analytics",
      type: "article",
      readTime: "5 min read",
      author: "Sarah Johnson",
      date: "2024-01-15",
      image: "📊",
      featured: true
    },
    {
      id: 2,
      title: "Advanced Data Visualization Techniques",
      excerpt: "Learn how to create compelling charts and graphs that tell your data story effectively.",
      category: "tutorials",
      type: "video",
      readTime: "12 min watch",
      author: "Mike Chen",
      date: "2024-01-12",
      image: "🎨"
    },
    {
      id: 3,
      title: "Marketing ROI: How to Measure Success",
      excerpt: "A comprehensive guide to measuring and optimizing your marketing return on investment.",
      category: "marketing",
      type: "article",
      readTime: "8 min read",
      author: "Emily Davis",
      date: "2024-01-10",
      image: "💰"
    },
    {
      id: 4,
      title: "Real-time Analytics Implementation",
      excerpt: "Step-by-step guide to implementing real-time analytics in your application.",
      category: "tutorials",
      type: "article",
      readTime: "15 min read",
      author: "Alex Rodriguez",
      date: "2024-01-08",
      image: "⚡"
    },
    {
      id: 5,
      title: "Customer Journey Analytics",
      excerpt: "Understanding your customer's path to purchase through advanced analytics.",
      category: "analytics",
      type: "video",
      readTime: "18 min watch",
      author: "Lisa Wang",
      date: "2024-01-05",
      image: "🛤️"
    },
    {
      id: 6,
      title: "Social Media Analytics Deep Dive",
      excerpt: "Advanced techniques for analyzing social media performance and engagement.",
      category: "marketing",
      type: "article",
      readTime: "10 min read",
      author: "David Kim",
      date: "2024-01-03",
      image: "📱"
    }
  ];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Resources & Blog</h2>
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category.name} ({category.count})
          </motion.button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gray-700/30 border border-gray-600/30 rounded-xl p-4 cursor-pointer transition-all ${
                post.featured ? "ring-2 ring-indigo-500/50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{post.image}</span>
                <div className="flex items-center space-x-2">
                  {post.type === "video" && <Play className="w-4 h-4 text-blue-400" />}
                  {post.type === "article" && <BookOpen className="w-4 h-4 text-green-400" />}
                  {post.featured && <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Featured</span>}
                </div>
              </div>

              <h3 className="text-white font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                {post.type === "video" ? "Watch Now" : "Read More"}
                <ExternalLink className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-6"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
          <p className="text-gray-300 mb-4">Get the latest analytics insights and tutorials delivered to your inbox.</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-700/50 border border-gray-600 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-r-lg font-medium transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogSection; 