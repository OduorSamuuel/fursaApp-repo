import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import ReactApexChart from 'react-apexcharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faClipboardList, faDollarSign, faDownload } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Reports = () => {
  const { user, users, serviceProviders, serviceRequests, revenues } = usePage().props;
  const [logoBase64, setLogoBase64] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch('/Images/logo-color.png')
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result);
        reader.readAsDataURL(blob);
      });
  }, []);

  const downloadPDF = (data, title) => {
    const doc = new jsPDF();
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 40, 40);
    }
    doc.setFontSize(18);
    doc.text(title, 60, 30);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 60, 40);

    const sensitiveFields = [
      'password', 'uuid', 'email', 'phone_number', 'created_at', 'updated_at',
      'google_id', 'verified_at', 'email_verified_at', 'last_seen_at',
      'verification_token', 'is_admin', 'otp', 'image', 'service_image',
      'latitude', 'longitude', 'user', 'otp_expires_at', 'token_expiration_time',
      'service_provider'
    ];

    const filteredData = data.map(item => {
      const filteredItem = {};
      for (const key in item) {
        if (!sensitiveFields.includes(key.toLowerCase())) {
          filteredItem[key] = item[key];
        }
      }
      return filteredItem;
    });

    const headers = Object.keys(filteredData[0]).map(key => ({ title: key, dataKey: key }));
    doc.autoTable({
      head: [headers.map(header => header.title)],
      body: filteredData.map(item => Object.values(item)),
      startY: 50,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`${title}.pdf`);
  };

  // Get the latest revenue
  const latestRevenue = revenues.length > 0 
    ? revenues[revenues.length - 1].total_revenue 
    : 0;

  const statsCards = [
    { title: 'Users', icon: faUser, count: users.length, color: 'bg-blue-800', data: users },
    { title: 'Service Providers', icon: faBriefcase, count: serviceProviders.length, color: 'bg-green-800', data: serviceProviders },
    { title: 'Service Requests', icon: faClipboardList, count: serviceRequests.length, color: 'bg-yellow-700', data: serviceRequests },
    { title: 'Total Revenue', icon: faDollarSign, count: `$${latestRevenue.toLocaleString()}`, color: 'bg-purple-800', data: revenues },
  ];
  const userChartSeries = [{
    name: 'New Users',
    data: users.map(user => ({
      x: new Date(user.created_at).toLocaleDateString(),
      y: 1,
    })).reduce((acc, cur) => {
      const date = cur.x;
      acc[date] = (acc[date] || 0) + cur.y;
      return acc;
    }, {}),
  }].map(item => ({
    name: item.name,
    data: Object.entries(item.data).map(([key, value]) => [new Date(key).getTime(), value]),
  }));
  const chartOptions = {
    chart: {
        toolbar: { show: false },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: { enabled: true, delay: 150 },
            dynamicAnimation: { enabled: true, speed: 350 },
        },
    },
    xaxis: {
        labels: { style: { colors: '#718096', fontSize: '12px' } },
        type: 'datetime',
    },
    yaxis: {
        labels: { style: { colors: '#718096', fontSize: '12px' } },
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    markers: {
        size: 6,
        strokeWidth: 3,
        strokeColors: ['#fff'],
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            opacityFrom: 0.2,
            opacityTo: 0.75,
            stops: [0, 90, 100],
        },
    },
    tooltip: {
        theme: 'dark',
        x: { format: 'dd MMM yyyy' },
        y: {
            formatter: (val) => {
                return val % 1 === 0 ? `${val} Providers` : val.toFixed(2) + ' Providers';
            },
        },
    },
    grid: {
        borderColor: '#f1f1f1',
        show: false,
    },
};

  const revenueChartSeries = [{
    name: 'Total Revenue',
    data: revenues.map(rev => rev.total_revenue),
  }];

  const chartCategories = revenues.map(rev => new Date(rev.created_at).toLocaleDateString());

  return (
    <SidebarLayout user={user}>
      <main className="nxl-container">
        <div className="nxl-content">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Reports Dashboard</h1>

            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                  {statsCards.map((item) => (
                    <motion.div
                      key={item.title}
                      whileHover={{ scale: 1.03 }}
                      className={`${item.color} overflow-hidden shadow-lg rounded-lg`}
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <FontAwesomeIcon icon={item.icon} className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-white truncate">{item.title}</dt>
                              <dd>
                                <div className="text-lg font-medium text-white">{item.count}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <button
                          onClick={() => downloadPDF(item.data, `${item.title} Report`)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                        >
                          Download report
                          <FontAwesomeIcon icon={faDownload} className="ml-1 h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                    <div className="p-6">
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">New Users Over Time</h2>
                      <ReactApexChart options={chartOptions} series={userChartSeries} type="area" height={350} />
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                    <div className="p-6">
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Revenue Over Time</h2>
                      <ReactApexChart 
                        options={{ 
                          ...chartOptions, 
                          xaxis: { categories: chartCategories } 
                        }} 
                        series={revenueChartSeries} 
                        type="area" 
                        height={350} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Additional details can go here */}
              </motion.div>
            )}
          </main>
        </div>
      </main>
    </SidebarLayout>
  );
};

export default Reports;
