"use client";

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-14 h-8 bg-gray-300 rounded-full animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full cursor-pointer border-2 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
      }}
    >
      {/* Toggle handle */}
      <motion.div
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 2 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {theme === 'dark' ? (
            <Moon className="w-3 h-3 text-gray-700" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <motion.div
          animate={{
            opacity: theme === 'dark' ? 0.3 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-3 h-3 text-white" />
        </motion.div>
        <motion.div
          animate={{
            opacity: theme === 'light' ? 0.3 : 0,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-3 h-3 text-white" />
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(99, 102, 241, 0.4)' 
            : '0 0 20px rgba(59, 130, 246, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle; 