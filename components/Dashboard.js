"use client";

import { useState, useEffect } from "react";
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
  Zap
} from "lucide-react";

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

const StatCard = ({ title, value, change, icon: Icon, trend = "up" }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-2">{value}</p>
        <div className="flex items-center mt-2">
          {trend === "up" ? (
            <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
    </div>
  </div>
);

const TimeFilterButton = ({ period, currentPeriod, onClick, children }) => (
  <button
    onClick={() => onClick(period)}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      currentPeriod === period
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50"
    }`}
  >
    {children}
  </button>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('1m');
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    setData(generateData(timePeriod));
    setPieData(generatePieData(timePeriod));
    setTeamData(generateTeamData(timePeriod));
  }, [timePeriod]);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const avgCTR = (data.reduce((sum, item) => sum + parseFloat(item.ctr), 0) / data.length).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ADmyBRAND Analytics
                </h1>
                <p className="text-gray-400 text-sm">Real-time insights & performance metrics</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="flex space-x-1">
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Revenue Trend</h2>
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
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
          </div>

          {/* Visitors & Conversions */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Visitors & Conversions</h2>
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#06B6D4" 
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Team Performance */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Team Performance</h2>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="performance" 
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Traffic Sources</h2>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bounce Rate Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="bounceRate" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">CTR Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="ctr" 
                  fill="#10B981"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg. Session Duration</span>
                <span className="text-white font-semibold">4m 32s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pages per Session</span>
                <span className="text-white font-semibold">3.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="text-white font-semibold">2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ROI</span>
                <span className="text-green-400 font-semibold">+340%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

