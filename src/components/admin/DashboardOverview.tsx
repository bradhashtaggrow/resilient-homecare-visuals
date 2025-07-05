
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Activity, 
  TrendingUp, 
  Eye,
  FileText,
  Image,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Page Views',
      value: '45,293',
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Active Services',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Media Files',
      value: '156',
      change: '+24',
      trend: 'up',
      icon: Image,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { action: 'Updated Hero Section content', time: '2 minutes ago', type: 'content' },
    { action: 'Added new service: Cardiology', time: '1 hour ago', type: 'service' },
    { action: 'Uploaded 5 new images', time: '3 hours ago', type: 'media' },
    { action: 'User profile updated', time: '1 day ago', type: 'user' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
        <p className="text-blue-100 text-lg">
          Here's what's happening with your healthcare platform today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Edit Content</p>
                <p className="text-sm text-gray-600">Update website text</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <Activity className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Add Service</p>
                <p className="text-sm text-gray-600">Create new service</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <Image className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Upload Media</p>
                <p className="text-sm text-gray-600">Add images/videos</p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                <Eye className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Preview Site</p>
                <p className="text-sm text-gray-600">View live changes</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'content' ? 'bg-blue-500' :
                    activity.type === 'service' ? 'bg-green-500' :
                    activity.type === 'media' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-purple-600" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="font-semibold text-gray-900">Website Status</p>
              <p className="text-sm text-green-600">Online & Healthy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Performance</p>
              <p className="text-sm text-blue-600">Excellent (98%)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900">Active Users</p>
              <p className="text-sm text-purple-600">247 Online Now</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
