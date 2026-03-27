import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './Charts.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const PieChart = ({ data }) => {
  return (
    <div className="chart-card fade-in">
      <h3 className="chart-title">Spending by Category</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              stroke="#161b22"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#e6edf3' }} 
              itemStyle={{ color: '#e6edf3' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#848d97' }}/>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
