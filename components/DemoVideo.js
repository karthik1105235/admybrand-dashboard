"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes
  const [showStats, setShowStats] = useState(false);

  const stats = [
    { label: "Real-time Data", value: "99.9%", icon: "⚡" },
    { label: "Response Time", value: "<100ms", icon: "🚀" },
    { label: "Uptime", value: "99.99%", icon: "🛡️" },
    { label: "Users", value: "10K+", icon: "👥" }
  ];

  const demoSteps = [
    { time: 0, title: "Dashboard Overview", description: "Welcome to ADmyBRAND Analytics" },
    { time: 15, title: "Time Period Filtering", description: "Switch between 1W, 1M, 3M, 6M views" },
    { time: 30, title: "Interactive Charts", description: "Hover and explore data visualizations" },
    { time: 45, title: "Real-time Updates", description: "Watch data update in real-time" },
    { time: 60, title: "Custom Metrics", description: "Create and track custom KPIs" },
    { time: 75, title: "Export & Share", description: "Export reports and share insights" },
    { time: 90, title: "Mobile Responsive", description: "Perfect experience on all devices" },
    { time: 105, title: "Advanced Analytics", description: "AI-powered insights and predictions" }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStep = demoSteps.find(step => currentTime >= step.time) || demoSteps[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Product Demo</h2>
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Play className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
            {/* Demo Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                  rotate: isPlaying ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity }
                }}
                className="text-6xl"
              >
                📊
              </motion.div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </motion.button>

                <div className="flex-1">
                  <div className="w-full bg-gray-600 rounded-full h-1">
                    <motion.div
                      className="bg-indigo-500 h-1 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setCurrentTime(0);
                    setIsPlaying(false);
                  }}
                  className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Current Step Info */}
          <motion.div
            key={currentStep.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4 bg-gray-700/30 border border-gray-600/30 rounded-xl p-4"
          >
            <h3 className="text-white font-semibold mb-1">{currentStep.title}</h3>
            <p className="text-gray-300 text-sm">{currentStep.description}</p>
          </motion.div>
        </div>

        {/* Live Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Live Statistics</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className="text-indigo-400 text-sm hover:text-indigo-300"
            >
              {showStats ? "Hide" : "Show"} Details
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4"
              >
                <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Page Load Time:</span>
                    <span className="text-green-400">0.8s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Data Refresh Rate:</span>
                    <span className="text-blue-400">5s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Chart Rendering:</span>
                    <span className="text-purple-400">60fps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Memory Usage:</span>
                    <span className="text-yellow-400">45MB</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo Steps Timeline */}
          <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Demo Timeline</h4>
            <div className="space-y-2">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.time}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-2 text-xs ${
                    currentTime >= step.time ? "text-white" : "text-gray-500"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    currentTime >= step.time ? "bg-indigo-500" : "bg-gray-600"
                  }`} />
                  <span className="font-mono">{formatTime(step.time)}</span>
                  <span className="truncate">{step.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoVideo; 