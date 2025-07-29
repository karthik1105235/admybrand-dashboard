"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, Zap, CheckCircle, Star } from "lucide-react";

const PricingCalculator = () => {
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [averageOrderValue, setAverageOrderValue] = useState(100);
  const [plan, setPlan] = useState("pro");

  const plans = {
    basic: { price: 29, features: ["Basic Analytics", "Email Support", "5 Reports"] },
    pro: { price: 99, features: ["Advanced Analytics", "Priority Support", "Unlimited Reports", "Custom Dashboards"] },
    enterprise: { price: 299, features: ["Enterprise Analytics", "24/7 Support", "Custom Integrations", "White-label", "API Access"] }
  };

  const monthlyRevenue = (visitors * conversionRate / 100) * averageOrderValue;
  const annualRevenue = monthlyRevenue * 12;
  const roi = ((annualRevenue - plans[plan].price * 12) / (plans[plan].price * 12)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Pricing Calculator</h2>
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Calculator className="w-5 h-5 text-green-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Monthly Visitors: {visitors.toLocaleString()}
            </label>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Conversion Rate: {conversionRate}%
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Average Order Value: ${averageOrderValue}
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Plan Selection
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(plans).map(([key, planData]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlan(key)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    plan === key
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Revenue Projections</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Revenue:</span>
                <span className="text-white font-semibold">${monthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Annual Revenue:</span>
                <span className="text-white font-semibold">${annualRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Plan Cost (Annual):</span>
                <span className="text-white font-semibold">${plans[plan].price * 12}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">ROI:</span>
                <span className={`font-semibold ${roi > 0 ? "text-green-400" : "text-red-400"}`}>
                  {roi > 0 ? "+" : ""}{roi.toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Selected Plan Features</h3>
            <ul className="space-y-2">
              {plans[plan].features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-300"
                >
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCalculator; 