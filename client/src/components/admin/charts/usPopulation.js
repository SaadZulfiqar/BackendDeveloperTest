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

function USPopulationChart() {

    const [usPopulation, setUsPopulation] = useState(null);
    const getUsPopulation = async () => {
        const res = await axios.get(`${process.env.REACT_APP_NOT_API_URL}/api/admin/usPopulation`);

        const data = {
            labels: res.data.data.labels,
            datasets: [
                {
                    label: 'US Population by the years',
                    data: res.data.data.population,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        setUsPopulation(data)
    }

    useEffect(() => {
        getUsPopulation()
    }, [])

    return <>
        {usPopulation && <Bar options={options} data={usPopulation} />}
    </>
}


export default USPopulationChart;