import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';

function Dashboard() {
  const revenueChartRef = useRef(null);
  const trafficChartRef = useRef(null);

  useEffect(() => {
    // Revenue Chart
    const revenueChart = new Chart(revenueChartRef.current, {
      type: 'pie',
      data: {
        labels: ['Consulting', 'Maintenance', 'Repairs'],
        datasets: [{
          label: 'Revenue',
          data: [8000, 5000, 3000], // Example revenue data for different services
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        }],
      },
    });

    // Traffic Chart
    const trafficChart = new Chart(trafficChartRef.current, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Organic Traffic',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: 'Paid Traffic',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        }],
      },
    });

    return () => {
      revenueChart.destroy();
      trafficChart.destroy();
    };
  }, []);

  return (
    <>
    <TopBar>
    <SidebarLayout>
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Total Clients Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total clients
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                6389
              </p>
            </div>
          </div>

          {/* Account Balance Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Account balance
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                $ 46,760.89
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Charts
        </h2>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          {/* Revenue Chart */}
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Revenue
            </h4>
            <canvas ref={revenueChartRef}></canvas>
            <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
              {/* Chart legend */}
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                <span>Consulting</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                <span>Maintenance</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                <span>Repairs</span>
              </div>
            </div>
          </div>

          {/* Traffic Chart */}
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Traffic
            </h4>
            <canvas ref={trafficChartRef}></canvas>
            <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
              {/* Chart legend */}
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                <span>Organic</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                <span>Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </SidebarLayout>
      </TopBar>
    </>
  );
}

export default Dashboard;

