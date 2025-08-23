"use client";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const USER_TYPES = [
    'Passenger',
    'Conductor',
    'Fleet',
    'MOT',
    'Time Keeper',
] as const;

type UserType = typeof USER_TYPES[number];

// Example data, replace with real API data as needed
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const userGrowthData: Record<UserType, number[]> = {
    Passenger: [5100, 5200, 5300, 5400, 5500, 5600, 5700],
    Conductor: [120, 140, 160, 180, 200, 220, 240],
    Fleet: [30, 35, 40, 45, 50, 55, 60],
    MOT: [10, 15, 20, 25, 30, 35, 40],
    'Time Keeper': [50, 60, 70, 80, 90, 100, 110],
};

const colors = [
    'rgba(59, 130, 246, 0.7)', // Passenger - blue
    'rgba(34, 197, 94, 0.7)', // Conductor - green
    'rgba(250, 204, 21, 0.7)', // Fleet - yellow
    'rgba(168, 85, 247, 0.7)', // MOT - purple
    'rgba(20, 184, 166, 0.7)', // Time Keeper - teal
];

export function UserGrowthTrendsChart() {
    const data = {
        labels: months,
        datasets: USER_TYPES.map((type, idx) => ({
            label: type,
            data: userGrowthData[type],
            backgroundColor: colors[idx],
            borderRadius: 6,
            maxBarThickness: 32,
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
        },
    };

    return (
        <Bar data={data} options={options} style={{ maxHeight: 240 }} />
    );
}
