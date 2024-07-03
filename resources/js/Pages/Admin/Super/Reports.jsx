import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import React, { useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const Reports = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} votes`;
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
    },
  ];

  return (
    <SidebarLayout>
            <main className="nxl-container">
    <div className="nxl-content">
     
   
   
    <div>
      <Button variant="primary" onClick={handlePrint}>
        Print Report
      </Button>
      <div ref={componentRef} style={{ padding: '20px', backgroundColor: '#fff' }}>
        <h3>Report</h3>
        <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Color</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Votes</th>
            </tr>
          </thead>
          <tbody>
            {chartOptions.xaxis.categories.map((name, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{chartSeries[0].data[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </main>
    </SidebarLayout>
  );
};

export default Reports;
