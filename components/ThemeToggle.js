"use client";

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-700 rounded-full animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full cursor-pointer border-2 border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      {/* Background gradient based on theme */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Toggle handle */}
      <motion.div
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
        animate={{
          x: theme === 'dark' ? 2 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 35
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0.9,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
        >
          {theme === 'dark' ? (
            <Moon className="w-3 h-3 text-gray-800" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-600" />
          )}
        </motion.div>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <motion.div
          animate={{
            opacity: theme === 'dark' ? 0.4 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <Sun className="w-3 h-3 text-white" />
        </motion.div>
        <motion.div
          animate={{
            opacity: theme === 'light' ? 0.4 : 0,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <Moon className="w-3 h-3 text-white" />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(99, 102, 241, 0.1)' 
            : '0 0 20px rgba(251, 191, 36, 0.5), inset 0 0 20px rgba(251, 191, 36, 0.1)'
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default ThemeToggle; 