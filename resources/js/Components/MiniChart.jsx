import React from 'react';
import ReactApexChart from 'react-apexcharts';

function MiniChart({
    totalServiceProviders,
    previousDayProviders,
    percentageChange,
    totalUsers,
    previousDayUsers,
    userPercentageChange,
    totalAmount,
    previousDayAmount,
    amountpercentageChange
}) {
    const serviceProvidersChartData = {
        series: [
            {
                name: 'Service Providers',
                data: [totalServiceProviders, previousDayProviders, percentageChange],
            },
        ],
        categories: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
    };

    const revenueChartData = {
        series: [
            {
                name: 'Revenue',
                data: [totalAmount, previousDayAmount, amountpercentageChange],
            },
        ],
        categories: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
    };

    const usersChartData = {
        series: [
            {
                name: 'Users',
                data: [totalUsers, previousDayUsers, userPercentageChange],
            },
        ],
        categories: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
    };

    const chartOptions = {
        chart: {
            type: 'area',
            height: 100,
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.2,
                opacityTo: 0.75,
                stops: [0, 90, 100],
            },
        },
        colors: ['#3454d1'],
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: serviceProvidersChartData.categories,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    if (val % 1 === 0) {
                        return val + ' Providers';
                    }
                    return val.toFixed(2) + ' Providers';n
                },
            },
            style: {
                fontSize: '12px',
                colors: '#A0ACBB',
                fontFamily: 'Inter',
            },
        },
    };

    const revenueChartOptions = {
        chart: {
            type: 'area',
            height: 100,
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth', // Ensure smooth curve
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.2,
                opacityTo: 0.75,
                stops: [0, 90, 100],
            },
        },
        colors: ['#ff5722'],
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: revenueChartData.categories,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return 'ksh ' + val.toFixed(2); // Format tooltip value
                },
            },
            style: {
                fontSize: '12px',
                colors: '#A0ACBB',
                fontFamily: 'Inter',
            },
        },
    };
    
    
    const usersChartOptions = {
        chart: {
            type: 'area',
            height: 100,
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.2,
                opacityTo: 0.75,
                stops: [0, 90, 100],
            },
        },
        colors: ['#00bcd4'],
        grid: {
            show: false,
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: usersChartData.categories,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    if (val % 1 === 0) {
                        return val + ' Users';
                    }
                    return val.toFixed(2) + ' Users';
                },
            },
            style: {
                fontSize: '12px',
                colors: '#A0ACBB',
                fontFamily: 'Inter',
            },
        },
    };

    return (
        <>
            {/* Service Providers Chart */}
            <div className="col-lg-4">
                <div className="card mb-4 stretch stretch-full">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="avatar-text">
                                <i className="feather feather-file-text" />
                            </div>
                            <div>
                                <div className="fw-semibold text-dark">Service providers</div>
                                <div className="fs-12 text-muted">{totalServiceProviders} providers</div>
                            </div>
                        </div>
                        <div className="fs-4 fw-bold text-dark">
                            {previousDayProviders}/{totalServiceProviders}
                        </div>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-between gap-4">
                        <div className="minichart-placeholder">
                            <ReactApexChart
                                options={chartOptions}
                                series={serviceProvidersChartData.series}
                                type="area"
                                height={100}
                            />
                        </div>
                        <div className="fs-12 text-muted text-nowrap">
                            <span className="fw-semibold text-success">{percentageChange}% more</span>
                            <br />
                            <span>than yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="col-lg-4">
                <div className="card mb-4 stretch stretch-full">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="avatar-text">
                                <i className="feather feather-airplay" />
                            </div>
                            <div>
                                <div className="fw-semibold text-dark">Revenue generated</div>
                                <div className="fs-12 text-muted">ksh {totalAmount}</div>
                            </div>
                        </div>
                        <div className="fs-4 fw-bold text-dark">
                            ksh {previousDayAmount}/{totalAmount}
                        </div>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-between gap-4">
                        <div className="minichart-placeholder">
                            <ReactApexChart
                                options={revenueChartOptions}
                                series={revenueChartData.series}
                                type="area"
                                height={100}
                            />
                        </div>
                        <div className="fs-12 text-muted text-nowrap">
                            <span className="fw-semibold text-danger">{amountpercentageChange}% more</span>
                            <br />
                            <span>from last week</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Chart */}
            <div className="col-lg-4">
                <div className="card mb-4 stretch stretch-full">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="d-flex gap-3 align-items-center">
                            <div className="avatar-text">
                                <i className="feather feather-users" />
                            </div>
                            <div>
                                <div className="fw-semibold text-dark">Registered Users</div>
                                <div className="fs-12 text-muted">{totalUsers} users</div>
                            </div>
                        </div>
                        <div className="fs-4 fw-bold text-dark">
                            {previousDayUsers}/{totalUsers}
                        </div>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-between gap-4">
                        <div className="minichart-placeholder">
                            <ReactApexChart
                                options={usersChartOptions}
                                series={usersChartData.series}
                                type="area"
                                height={100}
                            />
                        </div>
                        <div className="fs-12 text-muted text-nowrap">
                            <span className="fw-semibold text-info">{userPercentageChange}% more</span>
                            <br />
                            <span>than yesterday</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MiniChart;
