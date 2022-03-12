import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function ExchangeRatesChart() {

    const [exchangeRates, setExchangeRates] = useState(null);
    const getExchangeRates = async () => {
        const res = await axios.get(`${process.env.REACT_APP_NOT_API_URL}/api/admin/exchangeRates`);

        const data = {
            labels: res.data.data.labels,
            datasets: [
                {
                    label: 'Exchange Rates',
                    data: res.data.data.rates,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        setExchangeRates(data)
    }

    useEffect(() => {
        getExchangeRates()
    }, [])

    return <>
        {exchangeRates && <Bar options={options} data={exchangeRates} />}
    </>
}


export default ExchangeRatesChart;