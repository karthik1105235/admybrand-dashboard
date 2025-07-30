"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Menu,
  X,
  Play,
  BookOpen
} from "lucide-react";
import PricingCalculator from "./PricingCalculator";
import BlogSection from "./BlogSection";
import DemoVideo from "./DemoVideo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

// Generate dynamic data based on time period
const generateData = (period) => {
  const now = new Date();
  const data = [];
  
  let days, interval;
  switch (period) {
    case '1w':
      days = 7;
      interval = 1;
      break;
    case '1m':
      days = 30;
      interval = 1;
      break;
    case '3m':
      days = 90;
      interval = 3;
      break;
    case '6m':
      days = 180;
      interval = 7;
      break;
    default:
      days = 30;
      interval = 1;
  }

  for (let i = days; i >= 0; i -= interval) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const baseRevenue = 1000 + Math.random() * 2000;
    const baseVisitors = 500 + Math.random() * 1000;
    const baseConversions = 50 + Math.random() * 200;
    
    data.push({
      date: date.toLocaleDateString('en-US', { 
        month: period === '1w' ? 'short' : 'short', 
        day: 'numeric' 
      }),
      revenue: Math.round(baseRevenue + Math.sin(i * 0.1) * 500),
      visitors: Math.round(baseVisitors + Math.sin(i * 0.15) * 300),
      conversions: Math.round(baseConversions + Math.sin(i * 0.2) * 100),
      ctr: (2 + Math.random() * 3).toFixed(2),
      bounceRate: (30 + Math.random() * 20).toFixed(1),
    });
  }
  
  return data;
};

// Generate pie chart data
const generatePieData = (period) => {
  const baseValues = {
    '1w': [45, 30, 25],
    '1m': [40, 35, 25],
    '3m': [35, 40, 25],
    '6m': [30, 45, 25]
  };
  
  const values = baseValues[period] || baseValues['1m'];
  
  return [
    { name: "Organic", value: values[0] },
    { name: "Paid", value: values[1] },
    { name: "Direct", value: values[2] },
  ];
};

// Generate team performance data
const generateTeamData = (period) => {
  const teams = ["Marketing", "Sales", "Support", "Development"];
  const multipliers = {
    '1w': [1, 0.8, 1.2, 0.9],
    '1m': [1.1, 0.9, 1.1, 1],
    '3m': [1.2, 1, 1, 1.1],
    '6m': [1.3, 1.1, 0.9, 1.2]
  };
  
  const mult = multipliers[period] || multipliers['1m'];
  
  return teams.map((team, index) => ({
    name: team,
    performance: Math.round(2000 + Math.random() * 3000 * mult[index]),
    target: 2500,
  }));
};

const COLORS = ["#6366F1", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];

const StatCard = ({ title, value, change, icon: Icon, trend = "up" }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 group shadow-xl hover:shadow-2xl ${
        theme === 'dark' 
          ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
          : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
      }`}
    >
    <div className="flex items-center justify-between">
             <div className="flex-1">
         <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{title}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">{value}</p>
        <div className="flex items-center">
          {trend === "up" ? (
            <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
          )}
          <span className={`text-sm font-semibold ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {change}
          </span>
        </div>
      </div>
             <motion.div
         whileHover={{ rotate: 360, scale: 1.1 }}
         transition={{ duration: 0.5 }}
         className={`p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border transition-all duration-300 ml-4 ${
           theme === 'dark' 
             ? 'border-white/10 group-hover:border-white/20' 
             : 'border-gray-200 group-hover:border-gray-300'
         }`}
       >
        <Icon className="w-7 h-7 text-indigo-400" />
             </motion.div>
     </div>
   </motion.div>
   );
 };

const TimeFilterButton = ({ period, currentPeriod, onClick, children }) => {
  const { theme } = useTheme();
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(period)}
      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
        currentPeriod === period
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 border border-white/20"
          : `backdrop-blur-xl border hover:border-white/20 ${
              theme === 'dark' 
                ? 'bg-black/20 text-gray-300 hover:text-white border-white/10 hover:bg-black/30' 
                : 'bg-white/60 text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-white/80'
            }`
      }`}
    >
      {children}
    </motion.button>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  const { theme } = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`backdrop-blur-xl border p-4 rounded-xl shadow-lg ${
          theme === 'dark' 
            ? 'bg-gray-900/90 border-white/20' 
            : 'bg-white/95 border-gray-200'
        }`}
      >
        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { theme, mounted } = useTheme();
  const [timePeriod, setTimePeriod] = useState('1m');
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [activeSection, setActiveSection] = useState('analytics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setData(generateData(timePeriod));
    setPieData(generatePieData(timePeriod));
    setTeamData(generateTeamData(timePeriod));
  }, [timePeriod]);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const avgCTR = (data.reduce((sum, item) => sum + parseFloat(item.ctr), 0) / data.length).toFixed(2);

  const sections = [
    { id: 'analytics', name: 'Analytics', icon: Activity },
    { id: 'pricing', name: 'Pricing Calculator', icon: DollarSign },
    { id: 'demo', name: 'Product Demo', icon: Play },
    { id: 'blog', name: 'Resources & Blog', icon: BookOpen }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'pricing':
        return <PricingCalculator />;
      case 'demo':
        return <DemoVideo />;
      case 'blog':
        return <BlogSection />;
      default:
        return (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatCard
                title="Total Revenue"
                value={`$${(totalRevenue / 1000).toFixed(1)}K`}
                change="+12.5%"
                icon={DollarSign}
                trend="up"
              />
              <StatCard
                title="Total Visitors"
                value={totalVisitors.toLocaleString()}
                change="+8.2%"
                icon={Eye}
                trend="up"
              />
              <StatCard
                title="Conversions"
                value={totalConversions.toLocaleString()}
                change="+15.3%"
                icon={Target}
                trend="up"
              />
              <StatCard
                title="Avg. CTR"
                value={`${avgCTR}%`}
                change="-2.1%"
                icon={MousePointer}
                trend="down"
              />
            </motion.div>

            {/* Charts Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                             {/* Revenue Trend */}
               <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Revenue Trend</h2>
                                     <div className={`p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border ${
                     theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                   }`}>
                     <TrendingUp className="w-6 h-6 text-indigo-400" />
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                                         <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                     <XAxis 
                       dataKey="date" 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                     />
                     <YAxis 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                       tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                     />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#6366F1" 
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

                             {/* Visitors & Conversions */}
               <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Visitors & Conversions</h2>
                                     <div className={`p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border ${
                     theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                   }`}>
                     <Users className="w-6 h-6 text-cyan-400" />
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                                     <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                     <XAxis 
                       dataKey="date" 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                     />
                     <YAxis 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                     />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      dot={{ fill: '#06B6D4', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

                             {/* Team Performance */}
               <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Team Performance</h2>
                                     <div className={`p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border ${
                     theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                   }`}>
                     <Zap className="w-6 h-6 text-orange-400" />
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                                     <BarChart data={teamData}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                     <XAxis 
                       dataKey="name" 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                     />
                     <YAxis 
                       stroke={theme === 'dark' ? "#ffffff" : "#374151"}
                       fontSize={12}
                       fontWeight={500}
                     />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="performance" 
                      fill="#F59E0B"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

                             {/* Traffic Sources */}
               <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Traffic Sources</h2>
                                     <div className={`p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border ${
                     theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                   }`}>
                     <Target className="w-6 h-6 text-purple-400" />
                   </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>

            {/* Additional Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                             <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">Bounce Rate Trend</h3>
                                 <ResponsiveContainer width="100%" height={200}>
                   <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                     <XAxis dataKey="date" stroke={theme === 'dark' ? "#ffffff" : "#374151"} fontSize={10} fontWeight={500} />
                     <YAxis stroke={theme === 'dark' ? "#ffffff" : "#374151"} fontSize={10} fontWeight={500} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="bounceRate" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

                             <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">CTR Performance</h3>
                                 <ResponsiveContainer width="100%" height={200}>
                   <BarChart data={data.slice(-7)}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                     <XAxis dataKey="date" stroke={theme === 'dark' ? "#ffffff" : "#374151"} fontSize={10} fontWeight={500} />
                     <YAxis stroke={theme === 'dark' ? "#ffffff" : "#374151"} fontSize={10} fontWeight={500} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="ctr" 
                      fill="#10B981"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

                             <motion.div
                 whileHover={{ scale: 1.02 }}
                 className={`backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl ${
                   theme === 'dark' 
                     ? 'bg-black/20 border-white/10 hover:border-white/20 hover:bg-black/30' 
                     : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white/90'
                 }`}
               >
                 <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">Quick Stats</h3>
                                                    <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Avg. Session Duration</span>
                       <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>4m 32s</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Pages per Session</span>
                       <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3.2</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Conversion Rate</span>
                       <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>2.8%</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>ROI</span>
                       <span className="text-green-400 font-bold neon-glow">+340%</span>
                     </div>
                   </div>
              </motion.div>
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-xl border-b sticky top-0 z-50 shadow-2xl transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-black/20 border-white/10' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                             <motion.div
                 whileHover={{ rotate: 360, scale: 1.1 }}
                 transition={{ duration: 0.5 }}
                 className={`p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl border shadow-lg ${
                   theme === 'dark' ? 'border-white/20' : 'border-gray-200'
                 }`}
               >
                <Activity className="w-7 h-7 text-white" />
              </motion.div>
                             <div>
                 <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                   ADmyBRAND Analytics
                 </h1>
                 <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Real-time insights & performance metrics</p>
               </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                             <div className="flex items-center space-x-3">
                 <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className="flex space-x-2">
                  <TimeFilterButton period="1w" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    1W
                  </TimeFilterButton>
                  <TimeFilterButton period="1m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    1M
                  </TimeFilterButton>
                  <TimeFilterButton period="3m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    3M
                  </TimeFilterButton>
                  <TimeFilterButton period="6m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    6M
                  </TimeFilterButton>
                </div>
              </div>
              
              {/* Theme Toggle */}
                             <div className="flex items-center space-x-3">
                 <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Theme</span>
                 <ThemeToggle />
               </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 backdrop-blur-xl rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-black/20 border-white/10 hover:bg-black/30' 
                  : 'bg-white/60 border-gray-200 hover:bg-white/80'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4"
              >
                <div className="flex flex-wrap gap-2">
                  <TimeFilterButton period="1w" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    1W
                  </TimeFilterButton>
                  <TimeFilterButton period="1m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    1M
                  </TimeFilterButton>
                  <TimeFilterButton period="3m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    3M
                  </TimeFilterButton>
                  <TimeFilterButton period="6m" currentPeriod={timePeriod} onClick={setTimePeriod}>
                    6M
                  </TimeFilterButton>
                </div>
                
                {/* Mobile Theme Toggle */}
                                 <div className={`flex items-center justify-between pt-2 border-t ${
                   theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                 }`}>
                   <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Theme</span>
                   <ThemeToggle />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Section Navigation */}
      <div className={`backdrop-blur-xl border-b shadow-lg transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-black/15 border-white/10' 
          : 'bg-white/60 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/10"
                    : theme === 'dark' 
                      ? "text-gray-400 hover:text-gray-300 hover:bg-black/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

