
cat > package.json << 'EOF'
{
  "name": "admybrand-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "recharts": "^2.8.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.0.1",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.3.0"
  }
}
EOF

# Create next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
EOF

# Create tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create app/layout.js
cat > app/layout.js << 'EOF'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ADmyBRAND Insights - AI Analytics Dashboard',
  description: 'Professional analytics dashboard for digital marketing agencies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF

# Create app/page.js
cat > app/page.js << 'EOF'
import Dashboard from '../components/Dashboard'

export default function Home() {
  return <Dashboard />
}
EOF

# Create app/globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #18181b;
}

::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #52525b;
}

/* Custom animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-slideDown {
  animation: slideDown 0.8s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-pulse-custom {
  animation: pulse 2s infinite;
}

/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
EOF

# Create components/Dashboard.js (This is a large file, so we'll create it separately)
cat > components/Dashboard.js << 'EOF'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, BarChart3, Moon, Sun, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data
const mockData = {
  overview: {
    revenue: { value: 2847392, change: 23.1, trend: 'up' },
    users: { value: 147263, change: 12.5, trend: 'up' },
    conversions: { value: 4.32, change: -2.1, trend: 'down' },
    growth: { value: 34.7, change: 8.9, trend: 'up' }
  },
  lineChartData: [
    { month: 'Jan', revenue: 65000, users: 12000 },
    { month: 'Feb', revenue: 72000, users: 15000 },
    { month: 'Mar', revenue: 68000, users: 14000 },
    { month: 'Apr', revenue: 85000, users: 18000 },
    { month: 'May', revenue: 92000, users: 22000 },
    { month: 'Jun', revenue: 95000, users: 25000 },
    { month: 'Jul', revenue: 110000, users: 28000 },
    { month: 'Aug', revenue: 125000, users: 32000 },
  ],
  barChartData: [
    { campaign: 'Social Media', clicks: 4500, conversions: 180 },
    { campaign: 'Google Ads', clicks: 8200, conversions: 340 },
    { campaign: 'Email', clicks: 3200, conversions: 220 },
    { campaign: 'Display', clicks: 2800, conversions: 95 },
    { campaign: 'Video', clicks: 6100, conversions: 285 },
  ],
  pieChartData: [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 20, color: '#f59e0b' },
  ],
  tableData: [
    { id: 1, campaign: 'Summer Sale 2024', status: 'Active', budget: 15000, spent: 12500, conversions: 245, roas: 3.2 },
    { id: 2, campaign: 'Brand Awareness Q3', status: 'Paused', budget: 8000, spent: 7200, conversions: 89, roas: 2.1 },
    { id: 3, campaign: 'Holiday Promotion', status: 'Active', budget: 25000, spent: 18500, conversions: 456, roas: 4.8 },
    { id: 4, campaign: 'Product Launch', status: 'Completed', budget: 12000, spent: 11800, conversions: 189, roas: 2.9 },
    { id: 5, campaign: 'Retargeting Campaign', status: 'Active', budget: 6000, spent: 4500, conversions: 167, roas: 5.2 },
    { id: 6, campaign: 'Influencer Collab', status: 'Active', budget: 20000, spent: 15600, conversions: 334, roas: 3.7 },
  ]
};

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 4;

  // Theme styles
  const theme = {
    bg: isDark ? 'bg-black' : 'bg-gray-50',
    cardBg: isDark ? 'bg-zinc-900/80' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-zinc-400' : 'text-gray-600',
    border: isDark ? 'border-zinc-800' : 'border-gray-200',
    accent: isDark ? 'bg-blue-600' : 'bg-blue-500',
    hover: isDark ? 'hover:bg-zinc-800/60' : 'hover:bg-gray-100'
  };

  // Format number with animation
  const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }, [value]);

    return (
      <span className="font-bold text-3xl transition-all duration-1000 ease-out">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </span>
    );
  };

  // Metric Card Component
  const MetricCard = ({ title, value, change, trend, icon: Icon, prefix = '', suffix = '' }) => (
    <div className={`${theme.cardBg} ${theme.border} backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDark ? 'hover:shadow-blue-500/10 hover:border-zinc-700 shadow-xl shadow-black/20' : 'hover:shadow-gray-300/50'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-zinc-800' : 'bg-blue-100'}`}>
          <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
          trend === 'up' 
            ? (isDark ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50' : 'bg-green-100 text-green-700')
            : (isDark ? 'bg-red-900/40 text-red-400 border border-red-800/50' : 'bg-red-100 text-red-700')
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className={`${theme.textSecondary} text-sm font-medium mb-2 uppercase tracking-wide`}>{title}</h3>
      <div className={theme.text}>
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </div>
    </div>
  );

  // Chart Card Component
  const ChartCard = ({ title, children, className = '' }) => (
    <div className={`${theme.cardBg} ${theme.border} backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl ${isDark ? 'hover:border-zinc-700 shadow-xl shadow-black/20' : 'hover:shadow-lg'} ${className}`}>
      <h3 className={`${theme.text} text-lg font-semibold mb-6 flex items-center space-x-2`}>
        <div className={`w-1 h-6 rounded-full ${isDark ? 'bg-gradient-to-b from-blue-400 to-purple-500' : 'bg-blue-500'}`}></div>
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );

  // Table filtering and sorting
  const filteredData = mockData.tableData.filter(item =>
    item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/80 border-zinc-800/50' : 'bg-white/80 border-gray-200/50'} border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`${theme.text} text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-white via-blue-100 to-purple-200' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                ADmyBRAND Insights
              </h1>
              <p className={`${theme.textSecondary} text-sm mt-1 font-medium`}>AI-Powered Analytics Dashboard</p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-xl ${theme.hover} ${theme.border} border transition-all duration-300 ${isDark ? 'shadow-lg shadow-black/20' : ''}`}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value={mockData.overview.revenue.value}
            change={mockData.overview.revenue.change}
            trend={mockData.overview.revenue.trend}
            icon={DollarSign}
            prefix="$"
          />
          <MetricCard
            title="Active Users"
            value={mockData.overview.users.value}
            change={mockData.overview.users.change}
            trend={mockData.overview.users.trend}
            icon={Users}
          />
          <MetricCard
            title="Conversion Rate"
            value={mockData.overview.conversions.value}
            change={mockData.overview.conversions.change}
            trend={mockData.overview.conversions.trend}
            icon={Target}
            suffix="%"
          />
          <MetricCard
            title="Growth Rate"
            value={mockData.overview.growth.value}
            change={mockData.overview.growth.change}
            trend={mockData.overview.growth.trend}
            icon={BarChart3}
            suffix="%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <ChartCard title="Revenue & Users Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDark ? '#71717a' : '#6b7280'} />
                <YAxis stroke={isDark ? '#71717a' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#18181b' : '#ffffff',
                    border: `1px solid ${isDark ? '#27272a' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bar Chart */}
          <ChartCard title="Campaign Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e5e7eb'} />
                <XAxis dataKey="campaign" stroke={isDark ? '#71717a' : '#6b7280'} />
                <YAxis stroke={isDark ? '#71717a' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#18181b' : '#ffffff',
                    border: `1px solid ${isDark ? '#27272a' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="clicks" fill="#8b5cf6" name="Clicks" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Pie Chart and Table Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <ChartCard title="Traffic Sources">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockData.pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Data Table */}
          <ChartCard title="Campaign Management" className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme.border} ${theme.cardBg} ${theme.text} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${isDark ? 'placeholder-zinc-500 shadow-inner' : ''}`}
                />
              </div>
              <button className={`p-3 rounded-xl ${theme.hover} ${theme.border} border transition-all duration-300 ${isDark ? 'shadow-lg shadow-black/20' : ''}`}>
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme.border}`}>
                    {['Campaign', 'Status', 'Budget', 'Spent', 'Conversions', 'ROAS'].map((header, index) => (
                      <th
                        key={header}
                        className={`text-left py-4 px-4 font-semibold ${theme.textSecondary} cursor-pointer hover:${theme.text} transition-colors duration-300 uppercase tracking-wide text-xs`}
                        onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b ${theme.border} ${theme.hover} transition-all duration-300 ${isDark ? 'hover:bg-zinc-800/40' : ''}`}
                    >
                      <td className={`py-4 px-4 ${theme.text} font-medium`}>{row.campaign}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          row.status === 'Active' 
                            ? (isDark ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50' : 'bg-green-100 text-green-700')
                            : row.status === 'Paused'
                            ? (isDark ? 'bg-amber-900/40 text-amber-400 border border-amber-800/50' : 'bg-yellow-100 text-yellow-700')
                            : (isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-gray-100 text-gray-600')
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className={`py-4 px-4 ${theme.text}`}>${row.budget.toLocaleString()}</td>
                      <td className={`py-4 px-4 ${theme.text}`}>${row.spent.toLocaleString()}</td>
                      <td className={`py-4 px-4 ${theme.text}`}>{row.conversions}</td>
                      <td className={`py-4 px-4 ${theme.text} font-medium`}>{row.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className={`${theme.textSecondary} text-sm`}>
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} campaigns
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-xl ${theme.hover} ${theme.border} border transition-all duration-300 disabled:opacity-50 ${isDark ? 'shadow-lg shadow-black/20' : ''}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className={`px-4 py-2 ${theme.text} font-medium`}>
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-xl ${theme.hover} ${theme.border} border transition-all duration-300 disabled:opacity-50 ${isDark ? 'shadow-lg shadow-black/20' : ''}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
EOF

