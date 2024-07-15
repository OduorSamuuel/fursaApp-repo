import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Sidebar from '@/Layouts/Admin/Sidebar';
import TopBar from '@/Layouts/Admin/TopBar';

function Dashboard({ revenueData, trafficData, totalClients, accountBalance,auth }) {
  const [revenueChartOptions, setRevenueChartOptions] = useState({});
  const [revenueChartSeries, setRevenueChartSeries] = useState([]);
  const [trafficChartOptions, setTrafficChartOptions] = useState({});
  const [trafficChartSeries, setTrafficChartSeries] = useState([]);

  // Parse accountBalance to a number
  const parsedAccountBalance = parseFloat(accountBalance);

  useEffect(() => {
    // Revenue Chart (Bar Chart)
    setRevenueChartOptions({
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: Object.keys(revenueData),
      },
      yaxis: {
        title: {
          text: '$ (Revenue)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val
          }
        }
      }
    });
    setRevenueChartSeries([{
      name: 'Revenue',
      data: Object.values(revenueData)
    }]);

    // Traffic Chart
    const months = trafficData.map(item => item.month);
    const counts = trafficData.map(item => item.count);

    setTrafficChartOptions({
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Service Requests by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: months,
      }
    });
    setTrafficChartSeries([{
      name: "Service Requests",
      data: counts
    }]);
  }, [revenueData, trafficData]);

  return (
    <>
      <TopBar auth={auth}>
        <Sidebar>
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
                    {totalClients}
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
                    $ {parsedAccountBalance.toFixed(2)}
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
                  Revenue by Service
                </h4>
                <ReactApexChart options={revenueChartOptions} series={revenueChartSeries} type="bar" height={350} />
              </div>

              {/* Traffic Chart */}
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200">
                <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Service Requests Over Time
                </h4>
                <ReactApexChart options={trafficChartOptions} series={trafficChartSeries} type="line" height={350} />
              </div>
            </div>
          </div>
        </Sidebar>
      </TopBar>
    </>
  );
}

export default Dashboard;