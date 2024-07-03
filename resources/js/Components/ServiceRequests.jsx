import React from 'react';
import ReactApexChart from 'react-apexcharts';

function ServiceRequests({ serviceRequests, chartData, statusCounts, totalRequests,serviceProviders,totalServiceProviders,previousDayProviders,percentageChange }) {
  const formattedChartData = {
    series: [
      {
        name: "Pending",
        type: "bar",
        data: Object.keys(chartData).map(date => chartData[date].Pending)
      },
      {
        name: "Accepted",
        type: "bar",
        data: Object.keys(chartData).map(date => chartData[date].Accepted)
      },
      {
        name: "Rejected",
        type: "bar",
        data: Object.keys(chartData).map(date => chartData[date].Rejected)
      },
      {
        name: "Completed",
        type: "bar",
        data: Object.keys(chartData).map(date => chartData[date].Completed)
      }
    ],
    categories: Object.keys(chartData)
  };

  const chartOptions = {
    chart: {
      height: 380,
      width: "100%",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [1, 2, 3],
      curve: "smooth",
      lineCap: "round"
    },
    plotOptions: {
      bar: {
        endingShape: "rounded",
        columnWidth: "30%"
      }
    },
    colors: ["#3454d1", "#a2acc7", "#E1E3EA"],
    series: formattedChartData.series,
    fill: {
      opacity: [0.85, 0.25, 1, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: formattedChartData.categories,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: "10px",
          colors: "#A0ACBB"
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return Math.floor(value);
        },
        offsetX: -5,
        offsetY: 0,
        style: {
          color: "#A0ACBB"
        }
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return Math.floor(value);
        }
      },
      style: {
        fontSize: "12px",
        fontFamily: "Inter"
      }
    },
    legend: {
      show: false,
      labels: {
        fontSize: "12px",
        colors: "#A0ACBB"
      },
      fontSize: "12px",
      fontFamily: "Inter"
    }
  };

  return (
    <div className="col-xxl-8">
      <div className="card stretch stretch-full">
        <div className="card-header">
          <h5 className="card-title">Service Requests</h5>
          {/* Header actions here */}
        </div>
        <div className="card-body custom-card-action p-0">
          <div id="chart">
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={380} />
          </div>
        </div>
        <div className="card-footer">
          <div className="row g-4">
            {Object.keys(statusCounts).map((status, index) => (
              <div key={index} className="col-lg-3">
                <div className="p-3 border border-dashed rounded">
                  <div className="fs-12 text-muted mb-1">{status}</div>
                  <h6 className="fw-bold text-dark">{statusCounts[status]}</h6>
                  <div className="progress mt-2 ht-3">
                    <div
                      className={`progress-bar bg-${status.toLowerCase()}`}
                      role="progressbar"
                      style={{ width: `${statusCounts[status + '_percentage']}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequests;
