import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.css';

const BarChart = ({ data }) => {
  return (
    <div className="chart-card fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="chart-title">Top Subscriptions</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#30363d" />
            <XAxis type="number" tickFormatter={(value) => `₹${value}`} stroke="#848d97" />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#848d97" />
            <Tooltip 
              cursor={{ fill: '#1f2937' }} 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#e6edf3' }} 
            />
            <Bar dataKey="spend" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
